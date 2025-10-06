import os
from django.utils import timezone
from django.db import models
from django.utils.text import slugify
from django.conf import settings
from django.utils.translation import gettext_lazy as _

# ---------------------------------------------------------------------
# File Upload Path Utilities
# ---------------------------------------------------------------------
def project_files_upload_path(instance, filename):
    """
    Generate upload path for project files.
    Format: project_orders/<date>_<email_prefix>/<sanitized_email>_<phone>_<original_filename>
    """
    now = timezone.now()
    date_str = now.strftime("%Y_%m_%d_%H%M")

    email_prefix = instance.project.email.split('@')[0]
    sanitized_email = slugify(email_prefix)
    phone_number = slugify(instance.project.phone_number or "")
    folder_name = f"{date_str}_{sanitized_email}"

    original_name = os.path.basename(filename)
    new_filename = f"{sanitized_email}_{phone_number}_{original_name}"

    return os.path.join('project_orders', folder_name, new_filename)


def resume_files_upload_path(instance, filename):
    """
    Generate upload path for resume files.
    Format: resumes/<date>_<email_prefix>/<sanitized_email>_<phone>_resume.pdf
    """
    now = timezone.now()
    date_str = now.strftime("%Y_%m_%d_%H%M")

    email_prefix = instance.email.split('@')[0]
    sanitized_email = slugify(email_prefix)
    phone_number = slugify(instance.phone_number or "")
    folder_name = f"{date_str}_{sanitized_email}"

    original_name = os.path.basename(filename)
    _, ext = os.path.splitext(original_name)
    new_filename = f"{sanitized_email}_{phone_number}_resume{ext.lower()}"

    return os.path.join('resumes', folder_name, new_filename)


# ---------------------------------------------------------------------
# Course & Education Models
# ---------------------------------------------------------------------
class CoursesTopicModel(models.Model):
    """Teaching category that contains lessons."""
    title = models.CharField(max_length=100)
    catchy_title = models.CharField(
        max_length=100, blank=True, null=True, default=""
    )
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(
        upload_to='courses/topics/images/',
        blank=True, null=True
    )
    logo_file = models.FileField(
        upload_to='courses/topics/logos/',
        blank=True, null=True
    )

    is_published = models.BooleanField(default=True)
    priority = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Course Topic"
        verbose_name_plural = "Course Topics"

    def __str__(self):
        return self.title


class CoursesTagModel(models.Model):
    """Tag for categorizing lessons."""
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Course Tag"
        verbose_name_plural = "Course Tags"

    def __str__(self):
        return self.name


class CoursesInstructorModel(models.Model):
    """Instructor/teacher for courses."""
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='instructor_profile'
    )
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(
        upload_to='courses/instructors/',
        blank=True, null=True
    )

    class Meta:
        verbose_name = "Course Instructor"
        verbose_name_plural = "Course Instructors"

    @property
    def name(self):
        """Get instructor's display name."""
        if self.user:
            return getattr(self.user, 'name', None) or \
                   self.user.get_full_name() or \
                   self.user.username
        return "Unknown"

    def __str__(self):
        return f"Instructor: {self.name}"


class CoursesLessonModel(models.Model):
    """Teaching lesson with PDF and video options."""
    topic = models.ForeignKey(
        CoursesTopicModel,
        related_name='lessons',
        on_delete=models.CASCADE
    )
    instructor = models.ForeignKey(
        CoursesInstructorModel,
        related_name='lessons',
        on_delete=models.SET_NULL,
        null=True, blank=True
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    description = models.TextField()
    is_free = models.BooleanField(default=True)
    duration = models.PositiveIntegerField(help_text="Duration in minutes")

    # Content
    pdf_file = models.FileField(
        upload_to='courses/lessons/pdfs/', blank=True, null=True
    )
    video_file = models.FileField(
        upload_to='courses/lessons/videos/', blank=True, null=True
    )
    video_url = models.URLField(blank=True, null=True)
    thumbnail = models.ImageField(
        upload_to='courses/lessons/thumbs/', blank=True, null=True
    )

    tags = models.ManyToManyField(CoursesTagModel, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Course Lesson"
        verbose_name_plural = "Course Lessons"
        unique_together = ('topic', 'slug')

    def __str__(self):
        return self.title

    @property
    def has_video(self):
        """Check if lesson has any video content."""
        return bool(self.video_file) or bool(self.video_url)


# ---------------------------------------------------------------------
# Contact & Project Models
# ---------------------------------------------------------------------
class ContactUsModel(models.Model):
    """Stores 'Contact Us' form messages."""
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Contact Us Message"
        verbose_name_plural = "Contact Us Messages"

    def __str__(self):
        return self.full_name


class ProjectOrderModel(models.Model):
    """Stores project order requests."""
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    project_description = models.TextField()
    budget = models.CharField(max_length=50, blank=True, null=True)
    deadline = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Project Order"
        verbose_name_plural = "Project Orders"

    def __str__(self):
        return self.full_name


class ProjectFile(models.Model):
    """Files attached to a project order."""
    project = models.ForeignKey(
        ProjectOrderModel,
        related_name='files',
        on_delete=models.CASCADE
    )
    file = models.FileField(upload_to=project_files_upload_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        """Save without manual filename changes to avoid duplication."""
        super().save(*args, **kwargs)


class ResumeSubmissionModel(models.Model):
    """Stores resume submissions."""
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    linkedin_profile = models.URLField(blank=True, null=True)
    github_profile = models.URLField(blank=True, null=True)
    resume_file = models.FileField(
        upload_to=resume_files_upload_path,
        blank=True, null=True
    )
    cover_letter = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Resume Submission"
        verbose_name_plural = "Resume Submissions"

    def __str__(self):
        return self.full_name


# ---------------------------------------------------------------------
# Blog Models
# ---------------------------------------------------------------------
class BlogTopicModel(models.Model):
    """Blog category that organizes posts."""
    title = models.CharField(max_length=100)
    catchy_title = models.CharField(
        max_length=100, blank=True, null=True, default=""
    )
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(
        upload_to='blogs/topics/images/', blank=True, null=True
    )
    logo_file = models.FileField(
        upload_to='blogs/topics/logos/', blank=True, null=True
    )

    is_published = models.BooleanField(default=True)
    priority = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Blog Topic"
        verbose_name_plural = "Blog Topics"

    def __str__(self):
        return self.title


class BlogTagModel(models.Model):
    """Tag for blog posts."""
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name = "Blog Tag"
        verbose_name_plural = "Blog Tags"

    def __str__(self):
        return self.name


class BlogWriterModel(models.Model):
    """Stores blog writer profiles."""
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='writer_profile'
    )
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(
        upload_to='courses/writers/', blank=True, null=True
    )

    class Meta:
        verbose_name = "Blog Writer"
        verbose_name_plural = "Blog Writers"

    @property
    def name(self):
        """Get writer's display name."""
        if self.user:
            return getattr(self.user, 'name', None) or \
                   self.user.get_full_name() or \
                   self.user.username
        return "Unknown"

    def __str__(self):
        return f"Writer: {self.name}"


class BlogPostModel(models.Model):
    """Blog post with text, media, and tags."""
    topic = models.ForeignKey(
        BlogTopicModel,
        related_name='blog_topic',
        on_delete=models.CASCADE
    )
    writer = models.ForeignKey(
        BlogWriterModel,
        related_name='blog_writer',
        on_delete=models.SET_NULL,
        null=True, blank=True
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)

    # Content files
    pdf_file = models.FileField(
        upload_to='blogs/pdfs/', blank=True, null=True
    )
    video_file = models.FileField(
        upload_to='blogs/videos/', blank=True, null=True
    )
    video_url = models.URLField(blank=True, null=True)
    thumbnail = models.ImageField(
        upload_to='blogs/thumbs/', blank=True, null=True
    )
    cover_image = models.ImageField(
        upload_to='blogs/covers/', blank=True, null=True
    )

    tags = models.ManyToManyField(BlogTagModel, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Blogs Post"
        verbose_name_plural = "Blogs Posts"
        unique_together = ('topic', 'slug')

    def __str__(self):
        return self.title


# ---------------------------------------------------------------------
# Notification & Roadmap Models
# ---------------------------------------------------------------------
class NotificationSubscription(models.Model):
    """Stores subscription to notification topics."""
    mobile = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    full_name = models.CharField(max_length=100, blank=True, null=True)
    topics = models.ManyToManyField(CoursesTopicModel)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Notification Subscription"
        verbose_name_plural = "Notification Subscriptions"

    def __str__(self):
        return f"{self.mobile} - {', '.join(t.title for t in self.topics.all())}"


class RoadmapItem(models.Model):
    """A step/item in a learning roadmap."""
    class Level(models.TextChoices):
        BEGINNER = 'مبتدی', _('مبتدی')
        INTERMEDIATE = 'متوسط', _('متوسط')
        ADVANCED = 'پیشرفته', _('پیشرفته')

    class Status(models.TextChoices):
        NOT_STARTED = 'شروع‌نشده', _('شروع‌نشده')
        IN_PROGRESS = 'در حال یادگیری', _('در حال یادگیری')
        COMPLETED = 'تکمیل شده', _('تکمیل شده')

    title = models.CharField(_('عنوان'), max_length=200)
    description = models.TextField(_('توضیحات'))
    level = models.CharField(
        _('سطح'), max_length=20,
        choices=Level.choices, default=Level.BEGINNER
    )
    status = models.CharField(
        _('وضعیت'), max_length=20,
        choices=Status.choices, default=Status.NOT_STARTED
    )
    order = models.PositiveIntegerField(_('ترتیب'), default=0)
    created_at = models.DateTimeField(_('تاریخ ایجاد'), auto_now_add=True)
    updated_at = models.DateTimeField(_('تاریخ بروزرسانی'), auto_now=True)

    class Meta:
        verbose_name = _('Roadmap Item')
        verbose_name_plural = _('Roadmap Items')
        ordering = ['order']

    def __str__(self):
        return self.title


class RoadmapResource(models.Model):
    """Resource link for a RoadmapItem."""
    roadmap_item = models.ForeignKey(
        RoadmapItem,
        related_name='resources',
        on_delete=models.CASCADE,
        verbose_name=_('آیتم نقشه راه')
    )
    title = models.CharField(_('عنوان'), max_length=200)
    url = models.URLField(_('لینک'))
    order = models.PositiveIntegerField(_('ترتیب'), default=0)

    class Meta:
        verbose_name = _('Roadmap Item Source')
        verbose_name_plural = _('Roadmap Item Sources')
        ordering = ['order']

    def __str__(self):
        return self.title


# ---------------------------------------------------------------------
# Podcast Models
# ---------------------------------------------------------------------
class PodcastEpisodeModel(models.Model):
    """Podcast episode with audio, transcript, and metadata."""
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    content = models.TextField(blank=True)  # HTML or transcript
    audio_file = models.FileField(
        upload_to="podcasts/episodes/", blank=True, null=True
    )
    audio_url = models.URLField(blank=True, null=True)
    published_at = models.DateTimeField()
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Podcast Episode"
        verbose_name_plural = "Podcast Episodes"
        ordering = ["-published_at"]

    def __str__(self):
        return self.title

    @property
    def audio_src(self):
        """Return either uploaded audio file URL or remote URL."""
        if self.audio_file:
            return self.audio_file.url
        return self.audio_url


# ---------------------------------------------------------------------
# Roadmap Models
# ---------------------------------------------------------------------
class ResourceModel(models.Model):
    """A single learning resource (book, website, video, etc.)."""

    class ResourceType(models.TextChoices):
        BOOK = 'book', _('کتاب')
        WEBSITE = 'website', _('وبسایت')
        VIDEO = 'video', _('ویدیو')
        COURSE = 'course', _('دوره')
        PODCAST = 'podcast', _('پادکست')
        ARTICLE = 'article', _('مقاله')
        COMPANY = 'company', _('شرکت')
        FRIEND = 'friend', _('دوست')

    title = models.CharField(_('عنوان'), max_length=200)
    creator = models.CharField(_('سازنده / نویسنده'), max_length=200)
    type = models.CharField(
        _('نوع'),
        max_length=20,
        choices=ResourceType.choices,
        default=ResourceType.BOOK
    )
    link = models.URLField(_('لینک'))
    order = models.PositiveIntegerField(_('ترتیب'), default=0)
    created_at = models.DateTimeField(_('تاریخ ایجاد'), auto_now_add=True)
    updated_at = models.DateTimeField(_('تاریخ بروزرسانی'), auto_now=True)

    class Meta:
        verbose_name = _('Resource')
        verbose_name_plural = _('Resources')
        ordering = ['order']

    def __str__(self):
        return self.title

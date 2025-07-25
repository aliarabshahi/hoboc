import os
from django.utils import timezone  # Correct import
from django.db import models
from django.utils.text import slugify
from django.conf import settings  # For custom user model
from django.utils.translation import gettext_lazy as _

def project_files_upload_path(instance, filename):
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
    now = timezone.now()
    date_str = now.strftime("%Y_%m_%d_%H%M")
    
    email_prefix = instance.email.split('@')[0]
    sanitized_email = slugify(email_prefix)
    phone_number = slugify(instance.phone_number or "")
    folder_name = f"{date_str}_{sanitized_email}"
    
    original_name = os.path.basename(filename)
    name, ext = os.path.splitext(original_name)
    
    new_filename = f"{sanitized_email}_{phone_number}_resume{ext.lower()}"
    
    return os.path.join('resumes', folder_name, new_filename)


# temp
class PostCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name




class CoursesTopicModel(models.Model):
    """Teaching category that contains lessons"""
    title = models.CharField(max_length=100)
    catchy_title = models.CharField(max_length=100, blank=True, null=True, default="")  
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='courses/topics/images/', blank=True, null=True)
    logo_file = models.FileField(
        upload_to='courses/topics/logos/',
        blank=True,
        null=True
    )
    
    is_published = models.BooleanField(default=True)  # Added with default=True
    priority = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Course Topic"
        verbose_name_plural = "Course Topics"

    def __str__(self):
        return self.title


class CoursesTagModel(models.Model):
    """Tag for categorizing lessons"""
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Course Tag"
        verbose_name_plural = "Course Tags"

    def __str__(self):
        return self.name


class CoursesInstructorModel(models.Model):
    """Instructor/teacher for courses"""
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='instructor_profile'
    )
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(
        upload_to='courses/instructors/',
        blank=True,
        null=True
    )
    # Removed website field as requested
    
    class Meta:
        verbose_name = "Course Instructor"
        verbose_name_plural = "Course Instructors"

    @property
    def name(self):
        if self.user:
            return getattr(self.user, 'name', None) or self.user.get_full_name() or self.user.username
        return "Unknown"

    def __str__(self):
        return f"Instructor: {self.name}"

class CoursesLessonModel(models.Model):
    """Teaching lesson with PDF and video options"""
    topic = models.ForeignKey(
        CoursesTopicModel,
        related_name='lessons',
        on_delete=models.CASCADE
    )
    instructor = models.ForeignKey(
        CoursesInstructorModel,
        related_name='lessons',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    description = models.TextField()
    is_free = models.BooleanField(default=True)
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    # PDF content
    pdf_file = models.FileField(
        upload_to='courses/lessons/pdfs/',
        blank=True,
        null=True
    )
    
    # Video content
    video_file = models.FileField(
        upload_to='courses/lessons/videos/',
        blank=True,
        null=True
    )
    video_url = models.URLField(blank=True, null=True)
    
    thumbnail = models.ImageField(
        upload_to='courses/lessons/thumbs/',
        blank=True,
        null=True
    )
    tags = models.ManyToManyField(
        CoursesTagModel,
        blank=True
    )
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
        return bool(self.video_file) or bool(self.video_url)
    



class ContactUsModel(models.Model):
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
    project = models.ForeignKey(ProjectOrderModel, related_name='files', on_delete=models.CASCADE)
    file = models.FileField(upload_to=project_files_upload_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Remove the manual filename assignment to prevent duplication
        super().save(*args, **kwargs)

class ResumeSubmissionModel(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    linkedin_profile = models.URLField(blank=True, null=True)
    github_profile = models.URLField(blank=True, null=True)
    resume_file = models.FileField(upload_to=resume_files_upload_path, blank=True, null=True)
    cover_letter = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Resume Submission"
        verbose_name_plural = "Resume Submissions"

    def __str__(self):
        return self.full_name
    

# Blog Models
class BlogTopicModel(models.Model):
    title = models.CharField(max_length=100)
    catchy_title = models.CharField(max_length=100, blank=True, null=True, default="")  
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='blogs/topics/images/', blank=True, null=True)
    logo_file = models.FileField(
        upload_to='blogs/topics/logos/',
        blank=True,
        null=True
    )
    
    is_published = models.BooleanField(default=True)  
    priority = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Blog Topic"
        verbose_name_plural = "Blog Topics"


    def __str__(self):
        return self.title

class BlogTagModel(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name = "Blog Tag"
        verbose_name_plural = "Blog Tags"

    def __str__(self):
        return self.name

class BlogWriterModel(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='writer_profile'
    )
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='courses/writers/', blank=True, null=True)

    class Meta:
        verbose_name = "Blog Writer"          
        verbose_name_plural = "Blog Writers"   

    @property
    def name(self):
        if self.user:
            return getattr(self.user, 'name', None) or self.user.get_full_name() or self.user.username
        return "Unknown"

    def __str__(self):
        return f"Writer: {self.name}"



class BlogPostModel(models.Model):
    
    topic = models.ForeignKey(
        BlogTopicModel,
        related_name='blog_topic',
        on_delete=models.CASCADE
    )
    writer = models.ForeignKey(
        BlogWriterModel,
        related_name='blog_writer',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    pdf_file = models.FileField(
        upload_to='blogs/pdfs/',
        blank=True,
        null=True
    )
    
    # Video content
    video_file = models.FileField(
        upload_to='blogs/videos/',
        blank=True,
        null=True
    )
    video_url = models.URLField(blank=True, null=True)
    thumbnail = models.ImageField(
        upload_to='blogs/thumbs/',
        blank=True,
        null=True
    )
    cover_image = models.ImageField(upload_to='blogs/covers/', blank=True, null=True)

    tags = models.ManyToManyField(
        BlogTagModel,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Blogs Post "
        verbose_name_plural = "Blogs Posts"
        unique_together = ('topic', 'slug')

    def __str__(self):
        return self.title

    def __str__(self):
        return self.title
    

class NotificationSubscription(models.Model):
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
        # Removed unique_together

    def __str__(self):
        return f"{self.mobile} - {', '.join(t.title for t in self.topics.all())}"
    
class RoadmapItem(models.Model):
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
        _('سطح'), 
        max_length=20, 
        choices=Level.choices,
        default=Level.BEGINNER
    )
    status = models.CharField(
        _('وضعیت'), 
        max_length=20, 
        choices=Status.choices,
        default=Status.NOT_STARTED
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

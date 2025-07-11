from django.db import models
from django.utils.text import slugify
from django.conf import settings  # For custom user model


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


class ProjectOrderModel(models.Model):  # renamed (removed "Special")
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


class ResumeSubmissionModel(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    linkedin_profile = models.URLField(blank=True, null=True)
    github_profile = models.URLField(blank=True, null=True)
    resume_file = models.FileField(upload_to='resumes/')
    cover_letter = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Resume Submission"
        verbose_name_plural = "Resume Submissions"

    def __str__(self):
        return self.full_name
    

# Blog Models

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



class BlogCategoryModel(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class BlogTagModel(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class BlogPostModel(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    writer = models.ForeignKey(BlogWriterModel, on_delete=models.SET_NULL, null=True, related_name="posts")
    content = models.TextField()  # This will hold HTML content
    cover_image = models.ImageField(upload_to='courses/blog/covers/', blank=True, null=True)
    category = models.ForeignKey(BlogCategoryModel, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(BlogTagModel, blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # def save(self, *args, **kwargs):
    #     if not self.slug:
    #         self.slug = slugify(self.title)
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.title
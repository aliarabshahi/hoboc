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
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='courses/topics/', blank=True, null=True)
    is_published = models.BooleanField(default=True)  # Added with default=True

    class Meta:
        verbose_name = "Course Topic"
        verbose_name_plural = "Course Topics"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class CoursesTagModel(models.Model):
    """Tag for categorizing lessons"""
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Course Tag"
        verbose_name_plural = "Course Tags"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

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

    def __str__(self):
        name = getattr(self.user, 'name', None)
        return f"Instructor: {name or self.user.username}"

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

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def has_video(self):
        return bool(self.video_file) or bool(self.video_url)
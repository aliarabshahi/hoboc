from django.contrib import admin
from .models import (
    PostCategory,
    CoursesTopicModel,
    CoursesTagModel,
    CoursesInstructorModel,
    CoursesLessonModel,
    ContactUsModel,
    ProjectOrderModel,
    ResumeSubmissionModel,

    # Blog models
    BlogWriterModel,
    BlogCategoryModel,
    BlogTagModel,
    BlogPostModel,
)

# ---------- Courses Admin ----------
class PostCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


class CoursesTopicModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'catchy_title', 'slug', 'priority', 'is_published')
    search_fields = ('title',)
    list_filter = ('is_published',)
    prepopulated_fields = {'slug': ('title',)}


class CoursesTagModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


class CoursesInstructorModelAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'bio')
    search_fields = ('user__username', 'user__name')

    def name(self, obj):
        return obj.user.name or obj.user.username

    name.admin_order_field = 'user__name'
    name.short_description = 'Name'


class CoursesLessonModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'topic', 'instructor', 'is_published', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_filter = ('is_published', 'topic')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    readonly_fields = ('created_at', 'updated_at')


# ---------- Blog Admin ----------
class BlogWriterAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'bio')
    search_fields = ('user__username', 'user__name')

    def name(self, obj):
        return obj.name

    name.short_description = 'Name'


class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug')
    search_fields = ('title',)
    prepopulated_fields = {'slug': ('title',)}


class BlogTagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'writer', 'category', 'is_published', 'created_at')
    search_fields = ('title', 'content')
    list_filter = ('is_published', 'category', 'tags')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    readonly_fields = ('created_at', 'updated_at')


# ---------- Contact & Resume Admin ----------
class ContactUsAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone_number', 'created_at')
    search_fields = ('full_name', 'email', 'phone_number')
    readonly_fields = ('created_at',)


class ProjectOrderAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone_number', 'budget', 'deadline', 'created_at')
    search_fields = ('full_name', 'email', 'phone_number')
    readonly_fields = ('created_at',)


class ResumeSubmissionAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone_number', 'linkedin_profile', 'github_profile', 'created_at')
    search_fields = ('full_name', 'email', 'phone_number')
    readonly_fields = ('created_at',)


# ---------- Register All Models ----------
admin.site.register(PostCategory, PostCategoryAdmin)
admin.site.register(CoursesTopicModel, CoursesTopicModelAdmin)
admin.site.register(CoursesTagModel, CoursesTagModelAdmin)
admin.site.register(CoursesInstructorModel, CoursesInstructorModelAdmin)
admin.site.register(CoursesLessonModel, CoursesLessonModelAdmin)

admin.site.register(ContactUsModel, ContactUsAdmin)
admin.site.register(ProjectOrderModel, ProjectOrderAdmin)
admin.site.register(ResumeSubmissionModel, ResumeSubmissionAdmin)

admin.site.register(BlogWriterModel, BlogWriterAdmin)  # ✅ Now properly registered
admin.site.register(BlogCategoryModel, BlogCategoryAdmin)
admin.site.register(BlogTagModel, BlogTagAdmin)
admin.site.register(BlogPostModel, BlogPostAdmin)

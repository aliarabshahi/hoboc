from django.contrib import admin
from .models import (
    CoursesTopicModel, CoursesTagModel, CoursesInstructorModel, CoursesLessonModel,
    ContactUsModel, ProjectOrderModel, ProjectFile, ResourceModel, ResumeSubmissionModel, NotificationSubscription,
    BlogWriterModel, BlogTopicModel, BlogTagModel, BlogPostModel,
    RoadmapItem, RoadmapResource,
    PodcastEpisodeModel,
)

# ---------------------------------------------------------------------
# Inline Admin Classes (for related models)
# ---------------------------------------------------------------------
class ProjectFileInline(admin.TabularInline):
    model = ProjectFile
    extra = 0
    readonly_fields = ('uploaded_at',)
    fields = ('file', 'uploaded_at')
    can_delete = False


class RoadmapResourceInline(admin.TabularInline):
    model = RoadmapResource
    extra = 1


# ---------------------------------------------------------------------
# Courses Admin Configurations
# ---------------------------------------------------------------------
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
    list_display = (
        'title', 'topic', 'instructor', 'is_published', 'created_at', 'updated_at',
    )
    search_fields = ('title', 'description')
    list_filter = ('is_published', 'topic')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    readonly_fields = ('created_at', 'updated_at')


# ---------------------------------------------------------------------
# Blog Admin Configurations
# ---------------------------------------------------------------------
class BlogTopicModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'catchy_title', 'slug', 'priority', 'is_published')
    search_fields = ('title',)
    list_filter = ('is_published',)
    prepopulated_fields = {'slug': ('title',)}


class BlogTagModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


class BlogWriterModelAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'bio')
    search_fields = ('user__username', 'user__name')


class BlogPostModelAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'topic', 'writer', 'is_published', 'created_at', 'updated_at',
    )
    search_fields = ('title', 'description')
    list_filter = ('is_published', 'topic')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    readonly_fields = ('created_at', 'updated_at')


# ---------------------------------------------------------------------
# Forms Admin Configurations
# ---------------------------------------------------------------------
class ContactUsAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone_number', 'created_at')
    search_fields = ('full_name', 'email', 'phone_number')
    readonly_fields = ('created_at',)
    list_per_page = 20


class NotificationSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('mobile', 'email', 'full_name', 'is_active', 'topics_list', 'created_at')
    search_fields = ('mobile', 'email', 'full_name')
    list_filter = ('is_active', 'topics')
    readonly_fields = ('created_at', 'updated_at')
    filter_horizontal = ('topics',)
    list_per_page = 20

    def topics_list(self, obj):
        return ", ".join([topic.title for topic in obj.topics.all()])
    topics_list.short_description = 'Topics'


class ProjectOrderAdmin(admin.ModelAdmin):
    list_display = (
        'full_name', 'email', 'phone_number', 'budget', 'deadline',
        'created_at', 'files_count',
    )
    search_fields = ('full_name', 'email', 'phone_number')
    readonly_fields = ('created_at',)
    list_filter = ('created_at',)
    inlines = [ProjectFileInline]
    list_per_page = 20

    def files_count(self, obj):
        return obj.files.count()
    files_count.short_description = 'Files'


class ResumeSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        'full_name', 'email', 'phone_number', 'linkedin_profile',
        'github_profile', 'created_at',
    )
    search_fields = ('full_name', 'email', 'phone_number')
    readonly_fields = ('created_at',)
    list_per_page = 20


# ---------------------------------------------------------------------
# Roadmap Admin Configurations
# ---------------------------------------------------------------------
class RoadmapItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'level', 'status', 'order')
    list_filter = ('level', 'status')
    search_fields = ('title', 'description')
    inlines = [RoadmapResourceInline]
    ordering = ('order',)


# ---------------------------------------------------------------------
# Podcast Admin Configurations
# ---------------------------------------------------------------------
class PodcastEpisodeAdmin(admin.ModelAdmin):
    list_display = ("title", "is_published", "published_at", "created_at")
    search_fields = ("title", "description", "content")
    list_filter = ("is_published",)
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")

# ---------------------------------------------------------------------
# Resourse Admin Configurations
# ---------------------------------------------------------------------
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'creator', 'type', 'order')
    list_filter = ('type',)
    search_fields = ('title', 'creator')
    ordering = ('order',)


# ---------------------------------------------------------------------
# Model Registration
# ---------------------------------------------------------------------
admin.site.register(CoursesTopicModel, CoursesTopicModelAdmin)
admin.site.register(CoursesTagModel, CoursesTagModelAdmin)
admin.site.register(CoursesInstructorModel, CoursesInstructorModelAdmin)
admin.site.register(CoursesLessonModel, CoursesLessonModelAdmin)

admin.site.register(ContactUsModel, ContactUsAdmin)
admin.site.register(NotificationSubscription, NotificationSubscriptionAdmin)
admin.site.register(ProjectOrderModel, ProjectOrderAdmin)
admin.site.register(ResumeSubmissionModel, ResumeSubmissionAdmin)

admin.site.register(BlogWriterModel, BlogWriterModelAdmin)
admin.site.register(BlogTopicModel, BlogTopicModelAdmin)
admin.site.register(BlogTagModel, BlogTagModelAdmin)
admin.site.register(BlogPostModel, BlogPostModelAdmin)

admin.site.register(RoadmapItem, RoadmapItemAdmin)
admin.site.register(PodcastEpisodeModel, PodcastEpisodeAdmin)
admin.site.register(ResourceModel, ResourceAdmin)




from django.contrib import admin
from .models import (
    PostCategory,
    CoursesTopicModel,
    CoursesTagModel,
    CoursesInstructorModel,
    CoursesLessonModel
)

class PostCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}

class CoursesTopicModelAdmin(admin.ModelAdmin):
    list_display = ('title','catchy_title','slug', 'priority', 'is_published')
    search_fields = ('title',)
    list_filter = ('is_published',)
    prepopulated_fields = {'slug': ('title',)}

class CoursesTagModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}

class CoursesInstructorModelAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'bio')  # <-- Added custom method "name"
    search_fields = ('user__username', 'user__name')

    def name(self, obj):
        return obj.user.name or obj.user.username  # Fallback if name is empty

    name.admin_order_field = 'user__name'  # allow column sorting
    name.short_description = 'Name'        # column header

class CoursesLessonModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'topic', 'instructor', 'is_published', 'created_at','updated_at')
    search_fields = ('title', 'description')
    list_filter = ('is_published', 'topic')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('tags',)
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(PostCategory, PostCategoryAdmin)
admin.site.register(CoursesTopicModel, CoursesTopicModelAdmin)
admin.site.register(CoursesTagModel, CoursesTagModelAdmin)
admin.site.register(CoursesInstructorModel, CoursesInstructorModelAdmin)
admin.site.register(CoursesLessonModel, CoursesLessonModelAdmin)
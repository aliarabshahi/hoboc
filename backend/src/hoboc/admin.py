from django.contrib import admin
from .models import PostCategory

# Register your models here.
class PostCategoryAdmin(admin.ModelAdmin):
    # Display these fields in the list view
    list_display = (
        'name',          # Plan ID
        'slug',       # Price in Rial
    )
    
    # Allow searching by price and capacity
    search_fields = ('name', 'slug')
    
    # Filter by price range or capacity
    list_filter = ('name', 'slug')



admin.site.register(PostCategory, PostCategoryAdmin)

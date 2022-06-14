from django.contrib import admin
from .models import Image
# Register your models here.
class ImageAdmin(admin.ModelAdmin):
    list_display = ('_id', 'image')
    list_display_links = ('_id',)

admin.site.register(Image, ImageAdmin)
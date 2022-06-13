from email.mime import image
from django.db import models

# Create your models here.
class Image(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    image= models.ImageField(null=True, blank=True,default='/placeholder.jpg')
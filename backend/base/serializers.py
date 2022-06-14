from dataclasses import fields
from pyexpat import model
from .models import Image
from rest_framework import serializers

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model=Image
        fields='__all__'
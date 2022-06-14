from django.shortcuts import render
from .models import Image
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ImageSerializer
# Create your views here.

@api_view(['POST'])
def upload(request):
    uploadedimage=request.FILES.get('uploadedimage')
    image = Image.objects.create(image=uploadedimage)
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)

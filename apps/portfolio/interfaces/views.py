from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response

from apps.portfolio.interfaces.serializers import ContactMessageSerializer
from apps.portfolio.application.services import send_contact_email

# Create your views here.

class ContactCreateAPIView(generics.CreateAPIView):
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        send_contact_email(instance)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if not serializer.is_valid():
            print("ERREUR VALIDATION :", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        self.perform_create(serializer)
        return Response({"message": "Succès !"}, status=status.HTTP_201_CREATED)

def home_profile(request):
    """Vue pour la page parent"""
    return render(request, 'profile/index.html')
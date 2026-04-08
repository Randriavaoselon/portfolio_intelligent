from django.urls import path 
from apps.portfolio.interfaces.views import home_profile, ContactCreateAPIView


urlpatterns = [
    path('', home_profile, name='home'),
    path('api/contact/', ContactCreateAPIView.as_view(), name='contact-api'),
]
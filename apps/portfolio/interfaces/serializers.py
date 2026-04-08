from rest_framework import serializers
from apps.portfolio.domain.models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['company_name', 'subject', 'email', 'message', 'created_at']
        read_only_fields = ['created_at']
from django.db import models

class ContactMessage(models.Model):
    company_name = models.CharField(max_length=255, verbose_name="Nom de l'entreprise")
    subject = models.CharField(max_length=255, verbose_name="Sujet")
    email = models.EmailField(verbose_name="Email")
    message = models.TextField(verbose_name="Message")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company_name} - {self.subject}"
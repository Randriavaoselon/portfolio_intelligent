from django.core.mail import send_mail
from django.conf import settings

def send_contact_email(contact_instance):
    """
    Service gérant l'envoi effectif de l'email.
    """
    subject = f"Nouveau contact Portfolio : {contact_instance.subject}"
    body = (
        f"Entreprise : {contact_instance.company_name}\n"
        f"De : {contact_instance.email}\n\n"
        f"Message :\n{contact_instance.message}"
    )
    
    send_mail(
        subject,
        body,
        settings.DEFAULT_FROM_EMAIL,
        [settings.CONTACT_EMAIL],
        fail_silently=False,
    )
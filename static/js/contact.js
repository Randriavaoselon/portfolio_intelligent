document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const responseDiv = document.getElementById('form-response');
    const btnSubmit = document.getElementById('btn-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Désactivation du bouton pendant l'envoi
            btnSubmit.disabled = true;
            btnSubmit.innerText = "Envoi en cours...";

            // Récupération des données
            const formData = {
                company_name: document.getElementById('company_name').value,
                subject: document.getElementById('subject').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Récupération du token CSRF (nécessaire pour Django)
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

            // Envoi à l'API
            fetch('/api/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erreur lors de l\'envoi');
            })
            .then(data => {
                // Succès
                responseDiv.style.color = "#f0c37a";
                responseDiv.innerText = "✓ " + data.message;
                contactForm.reset();
            })
            .catch(error => {
                // Erreur
                responseDiv.style.color = "red";
                responseDiv.innerText = "Oups ! Une erreur est survenue.";
                console.error('Error:', error);
            })
            .finally(() => {
                // Réactivation du bouton
                btnSubmit.disabled = false;
                btnSubmit.innerText = "Envoyer le Message";
            });
        });
    }
});
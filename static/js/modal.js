document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("skillsModal");
    const btn = document.getElementById("openModal");
    const closeBtn = document.querySelector(".close-btn");

    // Vérifier si les éléments existent pour éviter des erreurs JS
    if (btn && modal && closeBtn) {
        
        // Ouvrir la modale
        btn.onclick = function() {
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Empêche le scroll du fond
        }

        // Fermer avec la croix
        closeBtn.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Réactive le scroll
        }

        // Fermer en cliquant à côté (sur le fond noir)
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("skillsModal");
    const closeBtn = document.querySelector(".close-btn");
    // On récupère tous les boutons
    const triggerButtons = document.querySelectorAll(".btn-trigger-modal");

    if (modal && closeBtn) {
        
        // Ouvrir la modale pour chaque bouton trouvé
        triggerButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
            });
        });

        // Fermer avec la croix
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        });

        // Fermer en cliquant sur le fond noir
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }
});
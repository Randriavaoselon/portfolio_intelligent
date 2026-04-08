(function() {
    // On cible l'élément
    const el = document.getElementById("typing-text");
    if (!el) return;

    const fullHTML = el.innerHTML;
    el.innerHTML = ""; // On vide immédiatement pour éviter le "flash" de texte
    el.style.display = "inline-block"; // Assure la visibilité du curseur

    let i = 0;
    let tempHTML = "";

    function type() {
        if (i < fullHTML.length) {
            // Si on rencontre une balise HTML (comme <span>), on l'ajoute d'un coup
            if (fullHTML[i] === "<") {
                let tagEnd = fullHTML.indexOf(">", i);
                tempHTML += fullHTML.slice(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
             
                tempHTML += fullHTML[i];
                i++;
            }
            
            el.innerHTML = tempHTML;
            
          
            setTimeout(type, 70); 
        }
    }

    // Lancement sans attendre le chargement complet des images
    type();
})();
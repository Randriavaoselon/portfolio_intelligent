let lastScrollTop = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop <= 100) {
        // Au tout début de la page, on reste transparent et visible
        header.classList.remove('show-on-down', 'hide-on-up');
    } 
    else if (scrollTop > lastScrollTop) {
        // ON DESCEND : On affiche le header
        header.classList.add('show-on-down');
        header.classList.remove('hide-on-up');
    } 
    else {
        // ON REMONTE : On cache le header
        header.classList.add('hide-on-up');
        header.classList.remove('show-on-down');
    }

    lastScrollTop = scrollTop;
}, { passive: true });
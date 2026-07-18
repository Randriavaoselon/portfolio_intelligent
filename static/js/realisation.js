// ==========================================================================
// Réalisations — slider à deux catégories (Design Frontend / Application Backend)
// ==========================================================================
(function () {
    function initRealisations() {
        console.log('[realisations] init() démarré.');

        const section = document.querySelector('.realisations-section');
        if (!section) {
            console.error('[realisations] STOP — .realisations-section introuvable dans le DOM. Le HTML de la section n’est pas rendu sur cette page (bloc Django écrasé ? mauvaise page ?).');
            return;
        }

        const tabs = section.querySelectorAll('.realisations-tab');
        const indicator = section.querySelector('#realisationsIndicator');
        const panels = section.querySelectorAll('.realisations-panel');
        const navButtons = section.querySelectorAll('.realisations-nav-btn');

        console.log('[realisations] éléments trouvés →', {
            tabs: tabs.length,
            indicator: !!indicator,
            panels: panels.length,
            navButtons: navButtons.length
        });

        if (!tabs.length) console.error('[realisations] STOP — aucun .realisations-tab trouvé.');
        if (!navButtons.length) console.error('[realisations] STOP — aucun .realisations-nav-btn trouvé.');

        const themes = {
            frontend: { accent: '#4c8dff', soft: 'rgba(76, 141, 255, .16)', grad: 'linear-gradient(135deg, #4c8dff, #7db1ff)' },
            backend: { accent: '#8b6bff', soft: 'rgba(139, 107, 255, .16)', grad: 'linear-gradient(135deg, #8b6bff, #b79bff)' }
        };

        function moveIndicator(tab) {
            if (!indicator || !tab) return;
            indicator.style.width = tab.offsetWidth + 'px';
            indicator.style.transform = 'translateX(' + (tab.offsetLeft - 5) + 'px)';
            indicator.style.background = themes[tab.dataset.cat].grad;
        }

        function setActive(cat) {
            console.log('[realisations] setActive →', cat);
            tabs.forEach(function (t) {
                const on = t.dataset.cat === cat;
                t.classList.toggle('is-active', on);
                t.setAttribute('aria-selected', on);
                if (on) moveIndicator(t);
            });
            panels.forEach(function (p) {
                p.classList.toggle('is-active', p.dataset.panel === cat);
            });
            section.style.setProperty('--accent', themes[cat].accent);
            section.style.setProperty('--accent-soft', themes[cat].soft);
            updateNavState(cat);
        }

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                console.log('[realisations] clic onglet →', tab.dataset.cat);
                setActive(tab.dataset.cat);
            });
        });

        requestAnimationFrame(function () {
            const active = section.querySelector('.realisations-tab.is-active');
            if (active) moveIndicator(active);
        });

        function getStep(track) {
            const card = track.querySelector('.realisations-card');
            if (!card) return 0;
            const styles = window.getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap) || 22;
            return card.getBoundingClientRect().width + gap;
        }

        function updateNavState(cat) {
            const track = section.querySelector('[data-track="' + cat + '"]');
            if (!track) return;
            const prevBtn = section.querySelector('.realisations-nav-btn[data-dir="-1"][data-for="' + cat + '"]');
            const nextBtn = section.querySelector('.realisations-nav-btn[data-dir="1"][data-for="' + cat + '"]');
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (prevBtn) prevBtn.disabled = track.scrollLeft <= 4;
            if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll - 4;
        }

        navButtons.forEach(function (btn) {
            btn.setAttribute('type', 'button');
            btn.addEventListener('click', function (e) {
                console.log('[realisations] clic flèche →', btn.dataset.for, btn.dataset.dir);
                e.preventDefault();
                const cat = btn.dataset.for;
                const track = section.querySelector('[data-track="' + cat + '"]');
                if (!track) {
                    console.warn('[realisations] Aucun conteneur [data-track="' + cat + '"] trouvé.');
                    return;
                }
                const step = getStep(track);
                if (!step) {
                    console.warn('[realisations] Impossible de calculer le pas (aucune carte trouvée).');
                    return;
                }
                const dir = parseInt(btn.dataset.dir, 10) || 1;
                track.scrollBy({ left: step * dir, behavior: 'smooth' });
            });
        });

        section.querySelectorAll('.realisations-track').forEach(function (track) {
            const cat = track.dataset.track;
            const counterEl = section.querySelector('[data-counter="' + cat + '"] b');
            const cards = Array.from(track.querySelectorAll('.realisations-card'));

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                            const idx = cards.indexOf(entry.target) + 1;
                            console.log('[realisations] carte visible →', cat, idx);
                            if (counterEl) counterEl.textContent = idx;
                            updateNavState(cat);
                        }
                    });
                }, { root: track, threshold: [0.6] });

                cards.forEach(function (card) { observer.observe(card); });
            } else {
                // Repli pour navigateurs très anciens sans IntersectionObserver.
                track.addEventListener('scroll', function () {
                    const step = getStep(track);
                    if (step && counterEl) {
                        const idx = Math.round(track.scrollLeft / step) + 1;
                        counterEl.textContent = Math.min(Math.max(idx, 1), cards.length);
                    }
                    updateNavState(cat);
                });
            }
        });

        window.addEventListener('load', function () {
            const activeTab = section.querySelector('.realisations-tab.is-active');
            if (activeTab) updateNavState(activeTab.dataset.cat);
        });

        window.addEventListener('resize', function () {
            const active = section.querySelector('.realisations-tab.is-active');
            if (active) {
                moveIndicator(active);
                updateNavState(active.dataset.cat);
            }
        });

        console.log('[realisations] init() terminé, écouteurs attachés.');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRealisations);
    } else {
        initRealisations();
    }
})();
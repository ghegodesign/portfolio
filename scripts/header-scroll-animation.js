// Animazione scroll header: h1 verso sinistra, h2 verso destra
// by Copilot

document.addEventListener('DOMContentLoaded', function () {
  const h1 = document.querySelector('h1.slide-h-highlight');
  const h2 = document.querySelector('h2.slide-t');
  const sticky = document.querySelector('.header-titles-sticky');
  if (!h1 || !h2 || !sticky) return;

  const maxOffset = Math.min(window.innerWidth * 0.6);

  function animateHeaderTitlesByCursor(e) {
    let y = e.clientY;
    // Calcola la posizione Y del cursore rispetto alla pagina
    if (e.pageY !== undefined) {
      y = e.pageY;
    } else {
      y += window.scrollY || window.pageYOffset;
    }
    // Calcola la posizione centrale dei titoli sticky rispetto alla pagina
    const stickyRect = sticky.getBoundingClientRect();
    const stickyCenterY = stickyRect.top + stickyRect.height / 2 + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    // L'animazione parte solo se il cursore è sotto il centro dei titoli
    let progress = 0;
    const quickness = 0.05; // più piccolo = più veloce lo spostamento
    if (y > stickyCenterY) {
      // progress lineare da 0 (centro titoli) a 1 (fondo pagina*quickness)
      progress = (y - stickyCenterY) / ((pageHeight - stickyCenterY) * quickness);
      progress = Math.max(0, Math.min(1, progress));
    }
    // Rimuovo la transizione per rendere lo spostamento perfettamente lineare
    h1.style.transform = `translateX(${-progress * maxOffset}px)`;
    h2.style.transform = `translateX(${progress * maxOffset}px)`;
    h1.style.transition = h2.style.transition = 'none';
    // Nessun cambio di opacità
    sticky.style.opacity = 1;
    sticky.style.transition = 'none';
  }

  window.addEventListener('mousemove', animateHeaderTitlesByCursor);
  window.addEventListener('touchmove', function(e) {
    if (e.touches && e.touches.length > 0) {
      animateHeaderTitlesByCursor({ clientY: e.touches[0].clientY });
    }
  });

  // Aggiorna i titoli anche su scroll e resize
  function updateByScroll() {
    // Simula un evento fittizio con la posizione centrale della viewport
    const y = window.scrollY + window.innerHeight / 2;
    animateHeaderTitlesByCursor({ pageY: y, clientY: y - window.scrollY });
  }
  window.addEventListener('scroll', updateByScroll);
  window.addEventListener('resize', updateByScroll);

  // Imposta posizione iniziale al centro
  h1.style.transform = h2.style.transform = 'translateX(0)';
  sticky.style.opacity = '1';
});

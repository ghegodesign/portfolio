// Animazione scroll header: h1 verso sinistra, h2 verso destra
// by Copilot

document.addEventListener('DOMContentLoaded', function () {
  const h1 = document.querySelector('h1.slide-h-highlight');
  const h2 = document.querySelector('h2.slide-t');
  const sticky = document.querySelector('.header-titles-sticky');
  if (!h1 || !h2 || !sticky) return;

  const maxOffset = Math.min(window.innerWidth * 0.8);

  function animateHeaderTitlesByScroll() {
    // Usa la posizione centrale della viewport rispetto alla pagina
    const y = window.scrollY + window.innerHeight / 2;
    // Calcola la posizione centrale dei titoli sticky rispetto alla pagina
    const stickyRect = sticky.getBoundingClientRect();
    const stickyCenterY = stickyRect.top + stickyRect.height / 2 + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    let progress = 0;
    const quickness = 0.05; // QUANTO SLIDA VELOCE
    if (y > stickyCenterY) {
      progress = (y - stickyCenterY) / ((pageHeight - stickyCenterY) * quickness);
      progress = Math.max(0, Math.min(1, progress));
    }
    h1.style.transform = `translateX(${-progress * maxOffset}px)`;
    h2.style.transform = `translateX(${progress * maxOffset}px)`;
    h1.style.transition = h2.style.transition = 'none';
    sticky.style.opacity = 1;
    sticky.style.transition = 'none';
  }

  window.addEventListener('scroll', animateHeaderTitlesByScroll);
  window.addEventListener('resize', animateHeaderTitlesByScroll);
  animateHeaderTitlesByScroll();

  // Imposta posizione iniziale al centro
  h1.style.transform = h2.style.transform = 'translateX(0)';
  sticky.style.opacity = '1';
});

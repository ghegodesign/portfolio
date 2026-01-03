document.querySelectorAll('.keyword-group').forEach(group => {
  const keyword = group.querySelector('.keyword');
  const extra = group.querySelector('.extra');

  // Stato interno della keyword
  let active = false;

  // Hover gestione
  group.addEventListener('mouseenter', () => {
    if (!active) {
      extra.style.opacity = '1';
      extra.style.pointerEvents = 'auto';
      extra.style.transform = 'translateY(0)';
    }
  });

  group.addEventListener('mouseleave', () => {
    if (!active) {
      extra.style.opacity = '0';
      extra.style.pointerEvents = 'none';
      extra.style.transform = 'translateY(-0.3em)';
    }
  });

  // Click toggle
  keyword.addEventListener('click', (e) => {
    e.stopPropagation(); // evita click sul document
    if (active) {
      // Se è attiva, disattiva subito
      active = false;
      extra.style.opacity = '0';
      extra.style.pointerEvents = 'none';
      extra.style.transform = 'translateY(-0.3em)';
      group.classList.remove('active');
    } else {
      active = true;
      extra.style.opacity = '1';
      extra.style.pointerEvents = 'auto';
      extra.style.transform = 'translateY(0)';
      group.classList.add('active');
    }
  });
});

// Click esterno: chiude tutte le keyword attive
document.addEventListener('click', () => {
  document.querySelectorAll('.keyword-group.active').forEach(group => {
    const extra = group.querySelector('.extra');
    extra.style.opacity = '0';
    extra.style.pointerEvents = 'none';
    extra.style.transform = 'translateY(-0.3em)';
    group.classList.remove('active');
  });
});
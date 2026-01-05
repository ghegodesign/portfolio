const groups = document.querySelectorAll('.keyword-group');

groups.forEach(group => {
  const keyword = group.querySelector('.keyword');
  const hitbox = group.querySelector('.keyword-hitbox');

  const activate = () => {
    if (!group.classList.contains('active')) {
      group.classList.add('active');
    }
  };

  const deactivate = () => {
    if (group.classList.contains('active')) {
      group.classList.remove('active');
      group.classList.add('hover-lock');
    }
  };

  // Click su keyword o hitbox
  [keyword, hitbox].forEach(el => {
    el.addEventListener('click', e => {
      // fermo la propagazione solo verso parent, non verso document
      e.stopImmediatePropagation();

      if (group.classList.contains('active')) {
        deactivate();
      } else {
        activate();
      }
    });
  });

  // Hover-lock reset
  group.addEventListener('mouseleave', () => {
    group.classList.remove('hover-lock');
  });
});

// Click esterno: reset globale
document.addEventListener('click', () => {
  groups.forEach(group => {
    group.classList.remove('active');
    group.classList.remove('hover-lock');
  });
});

const groups = document.querySelectorAll('.keyword-group');

groups.forEach(group => {
  const keyword = group.querySelector('.keyword');

  keyword.addEventListener('click', e => {
    e.stopPropagation();

    // se è attiva → spegni e blocca hover finché non esce
    if (group.classList.contains('active')) {
      group.classList.remove('active');
      group.classList.add('hover-lock');
    } 
    // se non è attiva → attiva
    else {
      group.classList.add('active');
    }
  });

  // quando esci, riabilita hover
  group.addEventListener('mouseleave', () => {
    group.classList.remove('hover-lock');
  });
});

// click esterno → spegne tutto e resetta lock
document.addEventListener('click', () => {
  groups.forEach(group => {
    group.classList.remove('active');
    group.classList.remove('hover-lock');
  });
});

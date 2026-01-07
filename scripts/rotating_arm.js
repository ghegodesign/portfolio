(() => {
  const arm = document.querySelector('.arm');
  const wrapper = document.querySelector('.photo-wrapper');

  if (!arm || !wrapper) return;

  const step = 10; // snap gradi

  // dimensioni originali immagini
  const profileOriginal = { w: 4096, h: 4070, pivotX: 3736, pivotY: 3300 };
  const armOriginal     = { w: 981, h: 3153, pivotX: 430, pivotY: 2720 };

  // CREA PUNTINO ROSSO = gomito profilo
  const pivotGomito = document.createElement('div');
  pivotGomito.style.position = 'absolute';
  pivotGomito.style.width = '10px';
  pivotGomito.style.height = '10px';
  pivotGomito.style.background = 'red';
  pivotGomito.style.borderRadius = '50%';
  pivotGomito.style.pointerEvents = 'none';
  pivotGomito.style.zIndex = 1000;
        pivotGomito.style.visibility = 'hidden';
  wrapper.appendChild(pivotGomito);

  // CREA PUNTINO VERDE = transform-origin braccio
  const pivotOrigin = document.createElement('div');
  pivotOrigin.style.position = 'absolute';
  pivotOrigin.style.width = '10px';
  pivotOrigin.style.height = '10px';
  pivotOrigin.style.background = 'green';
  pivotOrigin.style.borderRadius = '50%';
  pivotOrigin.style.pointerEvents = 'none';
  pivotOrigin.style.zIndex = 1000;
            pivotOrigin.style.visibility = 'hidden';
  wrapper.appendChild(pivotOrigin);

  function updateArmPosition() {
    // scala in base al wrapper del profilo
    const scaleX = wrapper.offsetWidth / profileOriginal.w;
    const scaleY = wrapper.offsetHeight / profileOriginal.h;

    // ridimensiona il braccio
    arm.style.width = `${armOriginal.w * scaleX}px`;
    arm.style.height = `${armOriginal.h * scaleY}px`;
    arm.style.position = 'absolute';

    // calcola posizione braccio in modo che pivot coincida con gomito
    const left = (profileOriginal.pivotX - armOriginal.pivotX) * scaleX;
    const top  = (profileOriginal.pivotY - armOriginal.pivotY) * scaleY;

    arm.style.left = `${left}px`;
    arm.style.top  = `${top}px`;

    // imposta transform-origin in px proporzionali alla dimensione visualizzata
    arm.style.transformOrigin = `${armOriginal.pivotX * scaleX}px ${armOriginal.pivotY * scaleY}px`;

    // aggiorna pallini debug
    pivotGomito.style.left = `${profileOriginal.pivotX * scaleX}px`;
    pivotGomito.style.top  = `${profileOriginal.pivotY * scaleY}px`;

    pivotOrigin.style.left = `${left + armOriginal.pivotX * scaleX}px`;
    pivotOrigin.style.top  = `${top  + armOriginal.pivotY * scaleY}px`;
  }

  function updateRotation(e) {
    const wrapperRect = wrapper.getBoundingClientRect();

    const scaleX = wrapper.offsetWidth / profileOriginal.w;
    const scaleY = wrapper.offsetHeight / profileOriginal.h;

    // dx/dy dal gomito (rosso) al cursore
    const dx = e.clientX - (profileOriginal.pivotX * scaleX + wrapperRect.left);
    const dy = e.clientY - (profileOriginal.pivotY * scaleY + wrapperRect.top);

    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle += 90; // braccio punta verso l'alto
    angle = Math.round(angle / step) * step;

    arm.style.transform = `rotate(${angle}deg)`;
  }

  // eventi
  window.addEventListener('mousemove', updateRotation);
  window.addEventListener('resize', updateArmPosition);

  // inizializza
  updateArmPosition();
})();

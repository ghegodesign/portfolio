document.addEventListener('DOMContentLoaded', () => {
  const image = document.querySelector('.left-column .profile-image');
  if (!image) return;

  const aboutSection = document.getElementById('about');
  const presentationSection = document.getElementById('presentation');
  const cvSection = document.getElementById('cv-section');
  if (!aboutSection || !presentationSection) return;

  /* ====== IMMAGINI ====== */
  const presentationImages = [
    'images/profilo1.png',
    'images/profilo2.png',
    'images/profilo3.png',
    'images/profilo4.png'
  ];

  const presentationImagesB = [
    'images/profilo1B.png',
    'images/profilo2B.png',
    'images/profilo3B.png',
    'images/profilo4B.png'
  ];

  const cvImages = ['images/profilo5.png'];
  const cvImagesB = ['images/profilo5B.png'];

  const defaultImage = presentationImages[0];

  /* ====== PRELOAD ====== */
  function preloadImages(urls) {
    urls.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  preloadImages([
    ...presentationImages,
    ...presentationImagesB,
    ...cvImages,
    ...cvImagesB
  ]);

  /* ====== RAF THROTTLING ====== */
  let rafId = null;
  let lastEvent = null;

  aboutSection.addEventListener('mousemove', (e) => {
    lastEvent = e;
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      rafId = null;
      handleMouseMove(lastEvent);
    });
  });

  aboutSection.addEventListener('mouseleave', () => {
    image.src = defaultImage;
  });

  /* ====== CORE LOGIC ====== */
  function handleMouseMove(e) {
    const aboutRect = aboutSection.getBoundingClientRect();
    const x = e.clientX - aboutRect.left;
    const y = e.clientY - aboutRect.top;

    let imgSrc = defaultImage;

    /* ---- PRESENTATION ---- */
    const presRect = presentationSection.getBoundingClientRect();
    if (e.clientY >= presRect.top && e.clientY <= presRect.bottom) {
      const splitX = aboutRect.width * 0.45; // ← sposta la linea qui
      const isLeft = x < splitX;

      const rowHeight = presRect.height / 4;
      const row = Math.min(
        Math.floor((e.clientY - presRect.top) / rowHeight),
        3
      );

      imgSrc = isLeft
        ? presentationImagesB[row]
        : presentationImages[row];
    }

    /* ---- CV SECTION ---- */
    if (cvSection) {
      const cvRect = cvSection.getBoundingClientRect();
      if (e.clientY >= cvRect.top && e.clientY <= cvRect.bottom) {
        const splitX = aboutRect.width * 0.23;
        const isLeft = x < splitX;

        imgSrc = isLeft ? cvImagesB[0] : cvImages[0];
      }
    }

    /* ---- APPLY SOLO SE CAMBIA ---- */
    if (image.src !== imgSrc) {
      image.src = imgSrc;
    }
  }
});

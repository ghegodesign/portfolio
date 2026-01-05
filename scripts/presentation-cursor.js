document.addEventListener('DOMContentLoaded', () => {
  const image = document.querySelector('.left-column .profile-image');
  if (!image) return;

  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  const presentationSection = document.getElementById('presentation');
  const cvSection = document.getElementById('cv-section');

  /* =====================================================
     CONFIG
     ===================================================== */

  const HORIZONTAL_SPLIT = 0.22; // ← ← ← CAMBIA QUI

  /* =====================================================
     IMMAGINI
     ===================================================== */

  const presentationImages = [
    'images/profilo/profilo1.png',
    'images/profilo/profilo2.png',
    'images/profilo/profilo3.png',
    'images/profilo/profilo4.png'
  ];

  const presentationImagesB = [
    'images/profilo/profilo1B.png',
    'images/profilo/profilo2B.png',
    'images/profilo/profilo3B.png',
    'images/profilo/profilo4B.png'
  ];

  const cvImages = ['images/profilo/profilo5.png'];
  const cvImagesB = ['images/profilo/profilo5B.png'];

  const defaultImage = presentationImages[0];

  /* =====================================================
     PRELOAD (anti-lag al primo hover)
     ===================================================== */

  function preloadImages(list) {
    list.forEach(src => {
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

  /* =====================================================
     RAF THROTTLING (anti micro-lag)
     ===================================================== */

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

  /* =====================================================
     CORE LOGIC
     ===================================================== */

  function handleMouseMove(e) {
    const aboutRect = aboutSection.getBoundingClientRect();
    const x = e.clientX - aboutRect.left;

    let imgSrc = defaultImage;

    /* ---------- PRESENTATION ---------- */
    if (presentationSection) {
      const presRect = presentationSection.getBoundingClientRect();

      if (e.clientY >= presRect.top && e.clientY <= presRect.bottom) {
        const isLeft =
          x < aboutRect.width * HORIZONTAL_SPLIT;

        const rowHeight = presRect.height / 4;
        const row = Math.min(
          Math.floor((e.clientY - presRect.top) / rowHeight),
          3
        );

        imgSrc = isLeft
          ? presentationImagesB[row]
          : presentationImages[row];
      }
    }

    /* ---------- CV SECTION ---------- */
    if (cvSection) {
      const cvRect = cvSection.getBoundingClientRect();

      if (e.clientY >= cvRect.top && e.clientY <= cvRect.bottom) {
        const isLeft =
          x < aboutRect.width * HORIZONTAL_SPLIT;

        imgSrc = isLeft
          ? cvImagesB[0]
          : cvImages[0];
      }
    }

    /* ---------- APPLY SOLO SE CAMBIA ---------- */
    if (image.src !== imgSrc) {
      image.src = imgSrc;
    }
  }
});

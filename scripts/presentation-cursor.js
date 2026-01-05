document.addEventListener('DOMContentLoaded', () => {
  const image = document.querySelector('.left-column .profile-image');
  if (!image) return;

  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  const presentationSection = document.getElementById('presentation');
  const cvSection = document.getElementById('cv-section');

  // =========================
  // CONFIG
  // =========================
  const HORIZONTAL_SPLIT = 0.22;
  // =========================
  // CONFIG
  // =========================

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

      // =========================
      // LOGIC
      // =========================
      aboutSection.addEventListener('mousemove', (e) => {
        const aboutRect = aboutSection.getBoundingClientRect();
        const x = e.clientX - aboutRect.left;

        let imgSrc = defaultImage;

        // ---------- PRESENTATION ----------
        if (presentationSection) {
          const presRect = presentationSection.getBoundingClientRect();

          if (e.clientY >= presRect.top && e.clientY <= presRect.bottom) {
            const col = x < aboutRect.width * HORIZONTAL_SPLIT ? 'B' : 'A';

            const rowHeight = presRect.height / 4;
            const row = Math.min(
              Math.floor((e.clientY - presRect.top) / rowHeight),
              3
            );

            imgSrc =
              col === 'A'
                ? presentationImages[row]
                : presentationImagesB[row];
          }
        }

        // ---------- CV SECTION ----------
        if (cvSection) {
          const cvRect = cvSection.getBoundingClientRect();

          if (e.clientY >= cvRect.top && e.clientY <= cvRect.bottom) {
            const col = x < aboutRect.width * HORIZONTAL_SPLIT ? 'B' : 'A';

            imgSrc =
              col === 'A'
                ? cvImages[0]
                : cvImagesB[0];
          }
        }

        image.src = imgSrc;
      });

      // ---------- RESET ----------
      aboutSection.addEventListener('mouseleave', () => {
        image.src = defaultImage;
      });
    });

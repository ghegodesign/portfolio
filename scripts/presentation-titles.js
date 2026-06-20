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

const presentationSection = document.getElementById('presentation');
const previewTarget = document.querySelector('.tilted-titles') || presentationSection;

const KEYWORD_PULSE_DELAY_MS = 1000;
const KEYWORD_PULSE_DURATION_MS = 800;

let hasRunPulse = false;

const wait = delay => new Promise(resolve => {
  window.setTimeout(resolve, delay);
});

const isPreviewTargetVisible = () => {
  const rect = previewTarget.getBoundingClientRect();

  return (
    rect.top < window.innerHeight * 0.8 &&
    rect.bottom > window.innerHeight * 0.2
  );
};

const runKeywordPulse = async () => {
  if (hasRunPulse) return;
  hasRunPulse = true;

  await wait(KEYWORD_PULSE_DELAY_MS);

  if (!isPreviewTargetVisible()) {
    hasRunPulse = false;
    return;
  }

  groups.forEach(group => group.classList.add('keyword-pulse'));

  await wait(KEYWORD_PULSE_DURATION_MS);

  groups.forEach(group => group.classList.remove('keyword-pulse'));
};

if (previewTarget) {
  if ('IntersectionObserver' in window) {
    const previewObserver = new IntersectionObserver((entries, observer) => {
      if (!entries.some(entry => entry.isIntersecting)) return;

      runKeywordPulse();
      observer.disconnect();
    }, {
      rootMargin: '0px 0px -20% 0px',
      threshold: 0.25
    });

    previewObserver.observe(previewTarget);
  } else {
    const runPreviewOnScroll = () => {
      if (!isPreviewTargetVisible()) return;

      runKeywordPulse();
      window.removeEventListener('scroll', runPreviewOnScroll);
    };

    window.addEventListener('scroll', runPreviewOnScroll);
  }
}

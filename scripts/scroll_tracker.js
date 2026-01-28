(function () {
  const thresholds = [4, 8, 12, 50];
  const fired = new Set();

  function getScrollPercent() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return 0;
    return Math.round((scrollTop / docHeight) * 100);
  }

  function init() {
    window.addEventListener('scroll', () => {
      const percent = getScrollPercent();

      thresholds.forEach(t => {
        if (percent >= t && !fired.has(t)) {
          fired.add(t);
          window.umami.track(`Scroll ${t}%`);
        }
      });
    });
  }

  // wait Umami
  const waitForUmami = setInterval(() => {
    if (window.umami && typeof window.umami.track === 'function') {
      clearInterval(waitForUmami);
      init();
    }
  }, 200);
})();

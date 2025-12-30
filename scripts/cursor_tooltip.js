// crea il tooltip una sola volta
const cursorTooltip = document.createElement('div');
cursorTooltip.className = 'cursor-tooltip';
document.body.appendChild(cursorTooltip);

// stato
let tooltipActive = false;

// segue il mouse
document.addEventListener('mousemove', (e) => {
    if (!tooltipActive) return;

    cursorTooltip.style.left = e.clientX + 12 + 'px';
    cursorTooltip.style.top  = e.clientY + 12 + 'px';
});

// delegazione: funziona anche per elementi creati dopo
document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('.cursor-tooltip-target');
    if (!target) return;

    const text = target.dataset.tooltip;
    if (!text) return;

    cursorTooltip.textContent = text;
    cursorTooltip.style.opacity = '1';
    tooltipActive = true;
});

document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('.cursor-tooltip-target');
    if (!target) return;

    cursorTooltip.style.opacity = '0';
    tooltipActive = false;
});

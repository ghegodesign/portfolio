// crea il cursore personalizzato una sola volta
const cursorTooltip = document.createElement('div');
cursorTooltip.id = 'cursor-tooltip';
document.body.appendChild(cursorTooltip);

// icone dentro il cursore
const iconGo = document.createElement('img');
iconGo.className = 'cursor-icon go';
iconGo.src = 'images/go_to.svg';
iconGo.alt = '';
cursorTooltip.appendChild(iconGo);

const iconShow = document.createElement('img');
iconShow.className = 'cursor-icon show';
iconShow.src = 'images/show.svg';
iconShow.alt = '';
cursorTooltip.appendChild(iconShow);

// nascondi il cursore di default (con eccezioni in CSS per form)
document.body.style.cursor = 'none';

// segue il mouse continuamente
document.addEventListener('mousemove', (e) => {
    cursorTooltip.style.left = e.clientX + 'px';
    cursorTooltip.style.top = e.clientY + 'px';
});

// mostra il cursore quando il mouse è dentro la finestra
document.addEventListener('mouseenter', () => {
    cursorTooltip.style.opacity = '1';
});

// nascondi il cursore quando esce dalla finestra
document.addEventListener('mouseleave', () => {
    cursorTooltip.style.opacity = '0';
});

// helper: determina se un elemento è 'interattivo' (click/anchor/button o ha cursor:pointer)
function isInteractive(el) {
    if (!el) return false;
    // Escludi elementi della navbar
    if (el.closest && el.closest('.navbar-item')) return false;
    const interactiveSelector = 'a, button, [onclick], .keyword-hitbox, .contact-link, .project-card';
    if (el.closest && el.closest(interactiveSelector)) return true;
    const cs = window.getComputedStyle(el);
    if (cs && cs.cursor === 'pointer') return true;
    return false;
}

// quando entri su un elemento interattivo: ingrandisci e mostra icona corretta
document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (isInteractive(target)) {
        cursorTooltip.classList.add('clickable');

        const anchor = target.closest('a');
        if (anchor) {
            // link/ancora -> go_to
            iconGo.classList.add('visible');
            iconShow.classList.remove('visible');
        } else if (target.closest('[onclick]')) {
            // controlla se l'onclick cambia location (link esterno)
            const onclickAttr = target.closest('[onclick]').getAttribute('onclick');
            if (onclickAttr && (onclickAttr.includes('location.href') || onclickAttr.includes('window.location'))) {
                // link esterno -> go_to
                iconGo.classList.add('visible');
                iconShow.classList.remove('visible');
            } else {
                // altri onclick -> show
                iconGo.classList.remove('visible');
                iconShow.classList.add('visible');
            }
        } else if (target.closest('.keyword-hitbox') || (target.dataset && target.dataset.tooltip)) {
            // elementi che mostrano info -> show
            iconGo.classList.remove('visible');
            iconShow.classList.add('visible');
        } else {
            // fallback: mostra go_to
            iconGo.classList.add('visible');
            iconShow.classList.remove('visible');
        }
    }
});

// quando esci: verifica se sotto il cursore c'è ancora un elemento interattivo
document.addEventListener('mouseout', (e) => {
    // usa elementFromPoint per sapere cosa c'è sotto
    const x = e.clientX;
    const y = e.clientY;
    const elUnder = document.elementFromPoint(x, y);
    if (!isInteractive(elUnder)) {
        cursorTooltip.classList.remove('clickable');
        iconGo.classList.remove('visible');
        iconShow.classList.remove('visible');
    }
});

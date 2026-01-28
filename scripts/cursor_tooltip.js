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
    const interactiveSelector = 'a, button, [onclick], .keyword-hitbox, .contact-link, .project-card';
    if (el.closest && el.closest(interactiveSelector)) return true;
    const cs = window.getComputedStyle(el);
    if (cs && cs.cursor === 'pointer') return true;
    return false;
}

// helper: determina se un elemento è navbar o tilted clickable
function isNavbarOrTilted(el) {
    if (!el) return false;
    if (el.closest('.navbar-item')) return true;
    if (el.closest('.tilted-titles')) {
        return (
            el.closest('.keyword') ||
            el.closest('.keyword-hitbox') ||
            el.closest('.contact-link') ||
            el.closest('a') ||
            el.closest('button')
        );
    }
    return false;
}

// quando entri su un elemento interattivo o navbar/tilted: ingrandisci e mostra/nascondi icona
document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (isNavbarOrTilted(target)) {
        cursorTooltip.classList.add('clickable');
        iconGo.classList.remove('visible');
        iconShow.classList.remove('visible');
    } else if (isInteractive(target)) {
        cursorTooltip.classList.add('clickable');
        const anchor = target.closest('a');
        if (anchor) {
            iconGo.classList.add('visible');
            iconShow.classList.remove('visible');
        } else if (target.closest('[onclick]')) {
            const onclickAttr = target.closest('[onclick]').getAttribute('onclick');
            if (onclickAttr && (onclickAttr.includes('location.href') || onclickAttr.includes('window.location'))) {
                iconGo.classList.add('visible');
                iconShow.classList.remove('visible');
            } else {
                iconGo.classList.remove('visible');
                iconShow.classList.add('visible');
            }
        } else if (target.closest('.keyword-hitbox') || (target.dataset && target.dataset.tooltip)) {
            iconGo.classList.remove('visible');
            iconShow.classList.add('visible');
        } else {
            iconGo.classList.add('visible');
            iconShow.classList.remove('visible');
        }
    }
});

// quando esci: verifica se sotto il cursore c'è ancora un elemento interattivo o navbar/tilted
document.addEventListener('mouseout', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const elUnder = document.elementFromPoint(x, y);
    if (!isInteractive(elUnder) && !isNavbarOrTilted(elUnder)) {
        cursorTooltip.classList.remove('clickable');
        iconGo.classList.remove('visible');
        iconShow.classList.remove('visible');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const data = {
        'product design': [
            { title: "vlad", description: "Life assistant" },
            { title: "fluppete", description: "Campervan" }
        ],
        'digital modeling': [
            { title: "parkside", description: "Thermal gun" },
            { title: "buzzer", description: "Walkie talkie" }
        ],
    };

    function createCard(item) {
        const card = document.createElement('div');
        card.classList.add('project-card');

        const img = document.createElement('img');
        img.src = `images/projects/${item.title}.png`;
        img.alt = item.title;
        card.appendChild(img);

        const overlay = document.createElement('div');
        overlay.classList.add('overlay-text');

        const title = document.createElement('h4');
        title.textContent = item.title;
        overlay.appendChild(title);

        const description = document.createElement('p');
        description.textContent = item.description;
        overlay.appendChild(description);

        card.appendChild(overlay);

card.addEventListener('click', function () {
    const section = document.getElementById(item.title);
        if (section) {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const offsetInPixels = window.innerHeight * (-44 / 100);
        window.scrollTo({
                top: sectionTop - offsetInPixels,
                behavior: 'smooth'
        });
    }
});

        return card;
    }

    const container = document.getElementById('card-container');
    for (const category in data) {
        data[category].forEach(item => {
            const card = createCard(item);
            container.appendChild(card);
        });
    }
});

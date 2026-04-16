// модальное окно
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-btn');

function openModal(cardData) {
    // заполняем данные
    document.getElementById('category').textContent = cardData.category;
    document.getElementById('name').textContent = cardData.name;
    document.getElementById('description').textContent = cardData.description;


    // ... ....
    
    modal.classList.add('show');
    overlay.classList.add('show');
    document.body.classList.add('no-scroll');
}

function closeModal() {
    modal.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('no-scroll');
}

// 
document.querySelectorAll('.best-gift-card').forEach(card => {
    card.addEventListener('click', () => {
        // Собираем данные
        const cardData = {
            category: card.querySelector('.font-action-small')?.textContent || 'For work',
            name: card.querySelector('.card-text')?.textContent || 'Gift',
            description: 'Your custom description here'
            // ... 
        };
        openModal(cardData);
    });
});

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
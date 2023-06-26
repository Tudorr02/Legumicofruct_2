document.addEventListener('DOMContentLoaded', function () {
    const cards = document.getElementsByClassName('produs_card');
    
    
    const delayBetweenCards = 250;

    function fadeInCard(card, index) {
        setTimeout(function () {
            card.classList.add('card_smooth');
        }, delayBetweenCards * index);
    }

    
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        fadeInCard(card, i);
    }
});
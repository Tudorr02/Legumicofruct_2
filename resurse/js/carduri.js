/**
 * Funcția este apelată atunci când tot conținutul HTML a fost încărcat complet.
 * Ea adaugă o animație de fade in pentru fiecare card de produs pe pagina.
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Toate cardurile de produs de pe pagina.
     * @type {HTMLCollectionOf<Element>}
     */
    const cards = document.getElementsByClassName('produs_card');
    
    /**
     * Întârzierea (în milisecunde) între începerea animației de fade in pentru fiecare card.
     * @type {number}
     */
    const delayBetweenCards = 250;

    /**
     * Adaugă o animație de fade in unui card după o întârziere specificată.
     * @param {Element} card - Cardul căruia i se va adăuga animația.
     * @param {number} index - Indexul cardului. Utilizat pentru a calcula întârzierea.
     */
    function fadeInCard(card, index) {
        setTimeout(function () {
            card.classList.add('card_smooth');
        }, delayBetweenCards * index);
    }

    // Aplică animația de fade in fiecărui card de pe pagina, unul câte unul.
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        fadeInCard(card, i);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const memoryGame = document.querySelector(".memory-game");
    const spanElement = document.querySelector(".span");
    const cards = generateCards();
    let flippedCards = [];
    let matchedPairs = 0;

    // Shuffle the cards and add them to the game board
    shuffle(cards);
    cards.forEach(card => memoryGame.appendChild(card));

    // Add click event listener to each card
    cards.forEach(card => card.addEventListener("click", flipCard));
    

    function generateCards() {
        const icons = ["🍎", "🍌", "🍒", "🍇", "🍊", "🍓", "🍑", "🥑"];
        const doubledIcons = icons.concat(icons);
        return doubledIcons.map(icon => createCard(icon));
    }

    function createCard(icon) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<span class="span" hidden >${icon}</span>`;
        return card;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function flipCard() {
        const card = this;

        // Prevent flipping already matched or flipped cards
        if (card.classList.contains("matched") || flippedCards.length === 2) {
            return;
        }

        card.classList.add("flipped");
        card.firstElementChild.removeAttribute('hidden');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.innerHTML === card2.innerHTML) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedPairs++;

            if (matchedPairs === cards.length / 2) {
                setTimeout(() => alert("Congratulations! You've won the game!"), 200);
            }
        } else {
            // Flip the cards back if not a match
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }

        flippedCards = [];
    }
});
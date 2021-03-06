const FRONT = 'card_front';
const BACK = 'card_back';
const CARD = 'card'
const ICON = 'icon';

startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {
    let gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    game.moves = 0;
    cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        createCardContent(card, cardElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./images/" + card.icon + '.png';
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = '&lt/&gt';
    }
    element.appendChild(cardElementFace);
}

function flipCard() {

    if(game.setCard(this.id)){
        this.classList.add('flip');
        if (game.secondCard) {
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                   gameIsOver();
                }
            }else{
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
                    

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
    
            } 
        }
    }
}

function gameIsOver() {
    let recordMoves = game.getRecord();
    let gameOverLayer = document.getElementById('gameOver');
    let textEndGame = document.getElementById('textEndGame');

    if (recordMoves > game.moves || recordMoves === false) {
        game.setRecord(game.moves);
        recordMoves = game.moves;
        textEndGame.innerHTML = 'Parabéns, você completou o jogo com '+game.moves+' movimentos. <br> O recorde é: '+game.moves+' movimentos';
    }
    else
        textEndGame.innerHTML = 'Parabéns, você completou o jogo com '+game.moves+' movimentos. <br> O recorde é: '+recordMoves+' movimentos';
    setTimeout(() => {
        gameOverLayer.style.display = 'flex';
    }, 800);
}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById('gameOver');
    gameOverLayer.style.display = 'none';
}
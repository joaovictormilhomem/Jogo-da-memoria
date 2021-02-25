const FRONT = 'card_front';
const BACK = 'card_back';

let techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquerry',
    'mongo',
    'node',
    'react'
    ];

    let cards = [];

startGame();

function startGame() {
    cards = createCardsFromTechs(techs);
    shuffleCards(cards);
    console.log(cards);
}

function shuffleCards(cards) {
    let currentIndex = cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
    }
}

function createCardsFromTechs(techs) {

    let cards = [];

    techs.forEach(tech => {
        cards.push(createPairFromTech(tech));
    });

    return cards.flatMap(card => card);
}
3

function createPairFromTech(tech) {

    let ids = createIdsWithTech(tech);

    return [{
                id: ids[0],
                icon: tech,
                flipped: false
            },
            {
                id: ids[1],
                icon: tech,
                flipped: false
            }]
}

function createIdsWithTech(tech) {
    let ids = [];
    ids[0] = tech + Math.floor(Math.random() * 100);
    do{ 
        ids[1] = tech + Math.floor(Math.random() * 100);
    }while(ids[0] === ids[1]);

    return ids;
}
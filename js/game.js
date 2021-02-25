let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    moves: 0,

    setCard:function (id) {
        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }
        else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch:function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        this.moves += 1;
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();  
    },

    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    techs : [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],

    cards : [],

    createCardsFromTechs:function () {

        this.cards = [];
    
        this.techs.forEach(tech => {
            this.cards.push(this.createPairFromTech(tech));
        });
    
        this.cards = this.cards.flatMap(card => card);
        this.shuffleCards();
        return this.cards;
    },
    
    
    createPairFromTech:function (tech) {
    
        let ids = this.createIdsWithTech(tech);
    
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
    },
    
    createIdsWithTech:function (tech) {
        let ids = [];
        ids[0] = tech + Math.floor(Math.random() * 100);
        do{ 
            ids[1] = tech + Math.floor(Math.random() * 100);
        }while(ids[0] === ids[1]);
    
        return ids;
    },

    
    shuffleCards:function () {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
    }
}
}
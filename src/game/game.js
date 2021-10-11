let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {

            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {

        if (!this.firstCard || !this.secondCard) {
            return false;
        }

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


    checkGameOver: function () {
        return this.cards.filter(card => !card.flipped).length === 0;
    },

    techs: ['01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10'],
    cards: null,

    createCardsFromTechs: function () {

        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromtech(tech));
        });

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    createPairFromtech: function (tech) {
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },

    eggCracking: function() {
        //Play egg cracking when flip cards
        let egg = new Audio('assets/sons/egg-cracking.mp3');
        egg.playbackRate = 2;
        egg.addEventListener('canplaythrough', () => egg.play());
    
    },

    roarMatch: function(){
         //Play roar when match cards
         let roar = new Audio('assets/sons/dino-roar.mp3');
         roar.addEventListener('canplaythrough', () => roar.play());
    },

    flipCard: function(cardId, gameOverCallBack, noMatchCallback){
        this.eggCracking();
        if (this.setCard(cardId)) {
            if (this.secondCard) {
                if (this.checkMatch()) {
                    this.clearCards();
                    this.roarMatch();
                    if (this.checkGameOver()) {
                        //Game Over
                        gameOverCallBack();
                    }
                } else {
                    setTimeout(() => {
                        //No Match
                        this.unflipCards();
                        noMatchCallback();
                    }, 1000);
                };
            }
        }
    }
}

export default game;
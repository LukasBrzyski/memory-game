document.addEventListener('DOMContentLoaded', () => {

    //tablica kart
    const cardArray = [
        {
            name: 'blueStar',
            ['background-image']: 'url(images/blueStar.svg)'
        },
        {
            name: 'blueStar',
            ['background-image']: 'url(images/blueStar.svg)'
        },
        {
            name: 'darkBlueTriangle',
            ['background-image']: 'url(images/darkBlueTriangle.svg)'
        },
        {
            name: 'darkBlueTriangle',
            ['background-image']: 'url(images/darkBlueTriangle.svg)'
        },
        {
            name: 'greenCircle',
            ['background-image']: 'url(images/greenCircle.svg)'
        },
        {
            name: 'greenCircle',
            ['background-image']: 'url(images/greenCircle.svg)'
        },
        {
            name: 'lemonSquare',
            ['background-image']: 'url(images/lemonSquare.svg)'
        },
        {
            name: 'lemonSquare',
            ['background-image']: 'url(images/lemonSquare.svg)'
        },
        {
            name: 'orangeTriangle',
            ['background-image']: 'url(images/orangeTriangle.svg)'
        },
        {
            name: 'orangeTriangle',
            ['background-image']: 'url(images/orangeTriangle.svg)'
        },
        {
            name: 'yellowStar',
            ['background-image']: 'url(images/yellowStar.svg)'
        },
        {
            name: 'yellowStar',
            ['background-image']: 'url(images/yellowStar.svg)'
        },
        {
            name: 'pinkSquare',
            ['background-image']: 'url(images/pinkSquare.svg)'
        },
        {
            name: 'pinkSquare',
            ['background-image']: 'url(images/pinkSquare.svg)'
        },
        {
            name: 'redCircle',
            ['background-image']: 'url(images/redCircle.svg)'
        },
        {
            name: 'redCircle',
            ['background-image']: 'url(images/redCircle.svg)'
        }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const container = document.querySelector('.container');
    const resultDisplay = document.querySelector('#result');
    const info = document.querySelector('.info');
    const info2 = document.querySelector('.info2');
    const aside = document.querySelector('aside');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = 0;   //liczba punktów (odkryte pary)
    let movements = 0;  //liczba ruchów (2 dowolne, jednocześnie odkryte karty to 1 ruch)

    let begin = 0;
    let end = 0;

    //tworzymy planszę
    const createBoard = () => {
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('div');       //tworzymy element
            card.classList.add('card');
            card.style.backgroundImage = 'url(images/blank.png)';
            card.setAttribute('data-id', i);                //dajemy mu atrybuty
            card.addEventListener('click', flipCard);
            container.appendChild(card);         //umiejscowiamy go w divie z klasą .grid
        }
    }

    //tworzymy przyciski
    const createButtons = () => {
        let btn1 = document.createElement('button');
        btn1.textContent = 'Jeszcze raz?';
        btn1.classList.add('btn1');
        btn1.addEventListener('click', refresh);
        aside.appendChild(btn1);
    }

    //odkrywamy kartę
    function flipCard () {
        info.textContent = '';
        let cardId = this.getAttribute('data-id'); //pobieramy atrybut (data-id) danej karty
        cardsChosen.push(cardArray[cardId].name); //wrzucamy do tablicy nazwę klikniętej karty (np. green)
        cardsChosenId.push(cardId); //wrzucamy do innej tablicy data-id klikniętej karty (np. "3")
        //this.setAttribute('src', cardArray[cardId].img); //dajemy atrybut frontowej strony karty
        this.style.backgroundImage = cardArray[cardId]['background-image']; //dajemy atrybut frontowej strony karty
        if (cardsChosen.length === 2) {
            //jeśli odkryte są 2 karty, to za pół minuty wywołuje się funkcja checkForMatch
            setTimeout(checkForMatch, 500);
        }
    }

    //sprawdzamy czy 2 karty są jednakowe
    const checkForMatch = () => {
        let cards = document.querySelectorAll('.card');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].style.backgroundImage = 'none'; //jeśli obie karty są takie same, to zmieniamy atrybut (biała karta)
            cards[optionOneId].classList.add('disabled'); //dajemy odpowiednią klasę, żeby nie dało się klikać

            cards[optionTwoId].style.backgroundImage = 'none';
            cards[optionTwoId].classList.add('disabled');

            // info.textContent = 'You found a match!';
            cardsWon++;
        } else {
            cards[optionOneId].style.backgroundImage = 'url(images/blank.png)'; //jeśli są różne, to też zmieniamy atrybut (karta znów odwrócona)
            cards[optionTwoId].style.backgroundImage = 'url(images/blank.png)';
            // info.textContent = 'Sorry, try again';
        }
        cardsChosen = []; //czyścimy obie tablice
        cardsChosenId = [];
        movements++;
        resultDisplay.textContent = `${movements}`;
        if (cardsWon === cardArray.length/2) {
            // jeśli mamy 6 punktów wygrywamy
            end = Date.now();
            //resultDisplay.textContent = 'Congratulations!';
            info.textContent = 'Gratulacje! Odkryłeś wszystkie pary';
            info2.textContent = `Twój czas to: ${(end - begin)/1000} sekund`;
            createButtons();
        }
    }

    //funkcja odświeża całą stronę
    const refresh = () => location.reload();

    createBoard();
    begin = Date.now();
})
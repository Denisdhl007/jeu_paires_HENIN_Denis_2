// Create a list that holds all of your cards

let cardSymbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bomb", "fa-bicycle", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bomb", "fa-bicycle"]
let visibleCard;
let firstCard;
let secondCard;
let matchCardnumber = 0;
let movescount = 0;
let stars = [document.querySelectorAll('.fa-heart')];
let ratingvalue = 0;
let timercount = new Timer();

// console.log(timercount.getTimeValues().toString());
//console.log(stars);


//shuffle the list of cards using the provided "shuffle" method below
// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// ajouter le HTML de chaque carte à la page
// boucle à travers chaque carte et crée son HTML

function generateGameBoard() {

    let cardItemList = shuffle(cardSymbols);
    //console.log(cardItemList);
    // for each syntx
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

    cardItemList.forEach(function (cardClassName, index) {
        // console.log(id);

        // draw card in HTML like below 
        // <li class="card"><i class="fa fa-diamond"></i></li>
        // var element = document.createElement(tagName[, options]);

        let cardDeck = document.querySelector(".deck");
        let cardItem = document.createElement("li");

        // syntx pour ajouter le nom de la classe
        // element.classList.add("mystyle") ;

        cardItem.setAttribute('id', index);
        cardItem.setAttribute('name', cardClassName);
        cardItem.classList.add("card");

          // configurer event listener pour une carte. Si une carte est cliquée :
        cardItem.setAttribute('onclick', 'startGame(this)');

        let symbolsItem = document.createElement("i");
        symbolsItem.classList.add("fa");
        symbolsItem.classList.add(cardClassName);

        cardItem.appendChild(symbolsItem);
        cardDeck.appendChild(cardItem);
        // console.log(cardDeck);

    });

};

// créer une fonction pour faire correspondre les cartes
function startGame(tempCard) {

    timer();

    tempCard.classList.add('open');
    tempCard.classList.add('show');

    // debugger;
    if (firstCard && secondCard) {
        //si null commence à enlever la classe, ouvrir et montrer la première et la deuxième carte pour pouvoir commencer depuis le début.

        firstCard.classList.remove('open');
        firstCard.classList.remove('show');

        secondCard.classList.remove('open');
        secondCard.classList.remove('show');

        firstCard = null;
        secondCard = null;
    }

    //debugger;
    if (!visibleCard) {

        visibleCard = tempCard;
        movescount++;
        // console.log(movescount);
        
        moveCounter();
    } else {
        // Create object that's will have id and name
        let item = {
            id: tempCard.getAttribute('id'),
            name: tempCard.getAttribute('name')
        };

        if (checkMatchCard(item)) {

            tempCard.classList.add('match');
            tempCard.removeAttribute('onclick');

            visibleCard.classList.add('match');
            visibleCard.removeAttribute('onclick');

            matchCardnumber += 1;
            // console.log(matchCardnumber);

            // check if finshed game and user win 
            gameOver();
        }

        firstCard = tempCard;
        secondCard = visibleCard;
        visibleCard = null;

        // déclenche la fonction clearSelectedCards () pour pouvoir commencer à cliquer sur une nouvelle carte.
        clearSelectedCards();
    }
}

function checkMatchCard(item) {
    let card = {
        id: visibleCard.getAttribute('id'),
        name: visibleCard.getAttribute('name'),
        cardIsOpen: visibleCard.classList.contains('open')
    };

    return (item.name === card.name && item.id !== card.id && card.cardIsOpen);
}

// fonction permettant de supprimer la classe open et show des cartes [première et deuxième carte].
function clearSelectedCards() {
    setTimeout(() => {
        if (firstCard) {
            firstCard.classList.remove('open');
            firstCard.classList.remove('show');
            firstCard = null;
        }

        if (secondCard) {
            secondCard.classList.remove('open');
            secondCard.classList.remove('show');
            secondCard = null;
        }
    }, 1000);
}


//Fonction "Game over" pour vérifier si l'utilisateur a terminé le jeu ou non.

function gameOver() {
    // debugger;/
    if (matchCardnumber == 8) {

        let modal = document.querySelector('.popup');
        let close = document.querySelector('.close');

        document.querySelector("#moves").textContent = movescount;
        document.querySelector("#rating").textContent = ratingvalue;
        document.querySelector('#timer').textContent = timercount.getTimeValues().toString();

        //   debugger;
        modal.style.display = "block";

        close.onclick = function () {
            modal.style.display = "none";
            location.reload()
        }
    }
}

// fonction pour compter les mouvements
function moveCounter() {
    let movesContainer = document.querySelector('.moves');
    movesContainer.textContent = movescount;
    rating();
};


// Function to  play Again
function playAgain() {

    let restartbtn = document.querySelector('.restart');
    restartbtn.onclick = function () {
        location.reload();
    }

}

function rating() {
    // Boucle for sur la liste des essais pour pouvoir vérifier. 
    // si le nombre de mouvement = 20 enlève la première classe d'or

    // si le nombre de mouvement = 25 enlève la seconde classe d'or

    // si le nombre de mouvement = 30 enlève la troisième classe d'or

    //alert(3);
    // console.log(movescount);

    for (star of stars) {
        // console.log(star[1])
        if (movescount === 20) {
            star[2].classList.remove("gold-star");
            ratingvalue = " Super " + 2;
        } else if (movescount === 25) {
            star[1].classList.remove("gold-star");
            ratingvalue = " Bien " + 1;
        } else if (movescount === 30) {
            star[0].classList.remove("gold-star");
            ratingvalue = " C'est bien, essaie encore pour améliorer ta mémoire " + 1;
        } else if (movescount <= 19) {
            ratingvalue = " Excellent " + 3;
        }
    }
}


// function to track time for game

 function timer() {
   
    timercount.start();
    timercount.addEventListener('secondsUpdated', function (e) {

        let basicUsagetimer = document.querySelector('#basicUsage');
        basicUsagetimer.textContent = timercount.getTimeValues().toString();
    });

};

// fonction de déclenchement
generateGameBoard();
playAgain();

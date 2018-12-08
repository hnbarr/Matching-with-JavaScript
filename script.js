'use strict';

const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let firstCard, secondCard;
let stopPlay = false;          

function flipCard() {
// first click
if (stopPlay) return;
if (this === firstCard) return;
this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // second click
    hasFlippedCard = false;
    secondCard = this;

    checkMatch();
  }
}

function checkMatch(){
    if (firstCard.dataset.name === secondCard.dataset.name){
        // if there is a match
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    } else {
        // if there is not a match
        stopPlay = true;        
        setTimeout(() =>{
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        resetBoard();
        }, 1500);
    }
}

function resetBoard() {
    [hasFlippedCard, stopPlay] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffleCards(){
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 18);
        card.style.order = random;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

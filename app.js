/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let  scores, roundScore, activePlayer, gamePlaying, prevDice;
let winningScore = document.querySelector('input');

init();

function init () {
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    let winningScore = document.querySelector('input') ;

    document.querySelector('.dice-0').style.display = 'none'
    document.querySelector('.dice-1').style.display = 'none'

    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById(`name-0`).textContent = 'Player 1';
    document.getElementById(`name-1`).textContent = 'Player 2';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');

}    

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // generate random numbers 
        let dice0 = Math.floor(Math.random()*6) + 1 ;
        let dice1 = Math.floor(Math.random()*6) + 1 ;
        let finalDice = dice0 + dice1
        // console.log(`Previous Score ${prevDice}`)
        // console.log(`Current Score ${dice}`);
        // if (dice ===6 && prevDice === 6) {
        // document.getElementById(`score-${activePlayer}`).textContent = 0;
        // nextPlayer();
        // }
        // prevDice = dice;

        // Display result of dice 
        let diceDom0 = document.querySelector('.dice-0');
        let diceDom1 = document.querySelector('.dice-1');
        diceDom0.style.display = 'block'
        diceDom1.style.display = 'block'
        diceDom0.src = `dice-${dice0}.png`;
        diceDom1.src = `dice-${dice1}.png`;

        // Update the roundScore if the dice value is not 1 & not two six in a row
        if ((dice0 !== 1 && dice1 !== 1) && (dice0 !== 6 && dice1 !== 6)) {
            // Add Dice Values
            
            roundScore += finalDice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            // Switch to the next player 
            nextPlayer();       
        }
    }     
})

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // hold the score of the current player to global score
        scores[activePlayer] += roundScore;

        // Udate the UI 
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        // check if the current player has won the game by reaching 100pts 
        if (scores[activePlayer] >= winningScore.value) {
            gamePlaying = false;
            document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector('.dice-0').style.display = 'none';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            // gamePlaying = false;
        } else {
        // switch to next player 
        nextPlayer();
        }
    }    
})

function nextPlayer() {
    // Switch to the next player 
    activePlayer===0 ? activePlayer=1 : activePlayer=0;
    roundScore=0;
    prevDice=0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice-0').style.display = 'none'
    document.querySelector('.dice-1').style.display = 'none'
}

document.querySelector('.btn-new').addEventListener('click', init);






// function hold() {
//     scores[activePlayer] += roundScore;
//     document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

//     // switch to next player 
//     nextPlayer();
// }
let score = JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      losses: 0,
      ties: 0
    };

let numOfGames = Number(localStorage.getItem('numOfGames')) || 0;

showScore();

const playerMoveIcon = document.querySelector('.player-move');
const computerMoveIcon = document.querySelector('.computer-move');
const gameCounter = document.querySelector('.game-counter');
const rockBtn = document.querySelector('.js-rock-btn');
const paperBtn = document.querySelector('.js-paper-btn');
const scissorsBtn = document.querySelector('.js-scissors-btn');
const confirmMsgWrapper = document.querySelector('.confirm-msg-wrapper');
const resetBtn = document.querySelector('.reset-btn');
const autoPlayBtn = document.querySelector('.autoplay-btn');

let isAutoPlaying = false;

document.addEventListener('keydown', (event) => {
  const keyPress = event.key;
  
  if (keyPress === 'r') {
    playGame('rock');
  } else if (keyPress === 'p') {
    playGame('paper');
  } else if (keyPress === 's') {
    playGame('scissors');
  } else if (keyPress === 'a') {
    autoPlayBtn.click();
  } else if (keyPress === 'Backspace') {
    resetScore();
  }
});

rockBtn.addEventListener('click', () => playGame('rock'));
paperBtn.addEventListener('click', () => playGame('paper'));
scissorsBtn.addEventListener('click', () => playGame('scissors'));
resetBtn.addEventListener('click', () => resetScore());


autoPlayBtn.addEventListener('click', () => {
  isAutoPlaying = !isAutoPlaying;
  autoPlayBtn.innerHTML = isAutoPlaying ? 'Stop Auto Play' : 'Auto Play';

  if (isAutoPlaying) runAutoPlay();
});

function runAutoPlay() {
  if (!isAutoPlaying) return;

  playGame(pickComputerMove());

  playerMoveIcon.addEventListener('animationend',
    () => {
      if (isAutoPlaying) {
        setTimeout(runAutoPlay, 1000);
      }
    }, { once: true }
  );
}

function playGame(playerMove) {
  numOfGames++;

  gameCounter.innerHTML = `Game ${numOfGames}`;
  playerMoveIcon.innerHTML = '&#9994';
  computerMoveIcon.innerHTML = '&#9994';
  document.querySelector('.results').innerHTML = '...';

  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors'){
    if (computerMove === 'rock') {
      result = 'You lose!';
    } else if (computerMove === 'paper') {
      result = 'You win!';
    } else {
      result = 'Tie!'
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win!';
    } else if (computerMove === 'paper') {
      result = 'Tie!';
    } else {
      result = 'You lose!'
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie!';
    } else if (computerMove === 'paper') {
      result = 'You lose!';
    } else {
      result = 'You win!'
    }
  }

  if (result === 'You win!') {
    score.wins++;
  } else if (result === 'You lose!') {
    score.losses++;
  } else {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));
  localStorage.setItem('numOfGames', numOfGames);

  playAnimation();

  playerMoveIcon.addEventListener('animationend',
    () => {
      showResult(playerMove, computerMove, result);
      showScore();

      playerMoveIcon.classList.remove('player-move-anim');
      computerMoveIcon.classList.remove('computer-move-anim');
    }, { once: true }
  );
}

function playAnimation() {
  playerMoveIcon.classList.add('player-move-anim');
  computerMoveIcon.classList.add('computer-move-anim');
}

function pickComputerMove() {
  const rand = Math.random();
  let computerMove = '';

  if (rand >= 0 && rand < 1/3) {
    computerMove = 'rock';
  } else if (rand >= 1/3 && rand < 2/3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}

function resetScore() {
  confirmMsgWrapper.innerHTML = `
    <p class="js-confirm-msg">Are you sure you want to reset the score?</p>
    <button class="control-btn js-yes-reset">Yes</button>
    <button class="control-btn js-no-reset">No</button>
  `;
  
  confirmMsgWrapper.classList.add('confirm-msg-wrapper-margin');
  
  document.querySelector('.js-yes-reset').addEventListener('click', () => {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  
    numOfGames = 0;
  
    localStorage.setItem('score', JSON.stringify(score));
    localStorage.setItem('numOfGames', numOfGames);
  
    showResult('&#9994', '&#9994', '&#160;')
    showScore();
    gameCounter.innerHTML = `Game ${numOfGames}`;
    confirmMsgWrapper.innerHTML = '';
    confirmMsgWrapper.classList.remove('confirm-msg-wrapper-margin');
  });
  
  document.querySelector('.js-no-reset').addEventListener('click', () => {
    confirmMsgWrapper.innerHTML = '';
    confirmMsgWrapper.classList.remove('confirm-msg-wrapper-margin');
  });
}

function showScore() {
  document.querySelector('.wins').innerHTML = score.wins;
  document.querySelector('.losses').innerHTML = score.losses;
  document.querySelector('.ties').innerHTML = score.ties;
}

function showResult(playerMove, computerMove, result) {
  const results = document.querySelector('.results');

  if (computerMove === 'rock') {
    computerMove = '&#9994';
  } else if (computerMove === 'paper') {
    computerMove = '&#9995';
  } else if (computerMove === 'scissors'){
    computerMove = '&#9996';
  }

  if (playerMove === 'rock') {
    playerMove = '&#9994';
  } else if (playerMove === 'paper') {
    playerMove = '&#9995';
  } else if (playerMove === 'scissors'){
    playerMove = '&#9996';
  }

  playerMoveIcon.innerHTML = playerMove;
  computerMoveIcon.innerHTML = computerMove;
  results.innerHTML = result;
}
let word;
let guess = '';
let row = 0;
let col = 0;
let usedLetters = [];
let timeoutIdMsg;
let lastBox;
// let flipTimeoutIds;
const wordElement = document.querySelector('.js-word');

getWord();
generateGrid();

document.addEventListener('keydown', registerKey);

async function registerKey(event) {  
  const keyPress = event.key;
  const keyPressUpperCase = keyPress.toUpperCase();
  
  const gridRow = document.querySelector(`[data-grid-row="${row}"]`);
  const box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  lastBox = document.querySelector(`[data-row="${row}"][data-col="${4}"]`);

  if (keyPress === 'Enter') {
    if (guess.length === 5) {
      const isValid = await checkIfValidWord(guess);
      
      if (!isValid) {
        // cancelFlipAnimation(row);
        runInvalidEvent(gridRow);
        return;
      }
      startFlipAnimation(row);
      processGuess(guess);
    }
  }
  
  if (keyPress === 'Backspace') {
    if (event.repeat) return;
    if (col - 1 >= 0) {
      guess = guess.slice(0, -1);
      document.querySelector(`[data-row="${row}"][data-col="${col-1}"]`).innerHTML = '';
      document.querySelector(`[data-row="${row}"][data-col="${col-1}"]`).classList.remove('pulse');
      col--;
    }
  }
  
  if (!(event.keyCode >= 65 && event.keyCode <= 90)) return;
  if (col >= 5) return; 
  
  guess += keyPressUpperCase;
  box.classList.add('pulse');
  box.innerHTML = keyPressUpperCase;
  col++;
}

async function getWord() {
  word = await getRandomWord();
  console.log(`Word: ${word}`);
}

function processGuess(guessToProcess) {
  updateUsedLetters(guessToProcess);
  
  const isCorrect = runCheck(guessToProcess, word, row, lastBox);
  
  if (isCorrect) {
    lastBox.addEventListener('animationend', () => {
      wordElement.innerHTML = '&#10024; YAY &#10024;';
    });
    runEndgame();
  } else if (row === 5) {
    lastBox.addEventListener('animationend', () => {
      wordElement.innerHTML = word;
    });
    runEndgame();
  }
  
  guess = '';
  row++;
  col = 0;
}

function updateUsedLetters(guessWord) {
  for (let i = 0; i < 5; i++) {
    const letter = toCharArray(guessWord)[i];
    if (!usedLetters.includes(letter)) usedLetters.push(letter);
  }
}

function runInvalidEvent(rowToShake) {
  rowToShake.classList.add('grid-row-shake');
  wordElement.innerHTML = 'Not in word list!';
  wordElement.classList.add('invalid-word-msg');
  clearTimeout(timeoutIdMsg);
  
  timeoutIdMsg = setTimeout(() => {
    wordElement.classList.remove('invalid-word-msg');
    wordElement.innerHTML = ' ';
  }, 3000);
  
  setTimeout(() => {
    rowToShake.classList.remove('grid-row-shake');
  }, 500);
}

function runEndgame() {
  document.removeEventListener('keydown', registerKey);
}

function startFlipAnimation(row) {
  // flipTimeoutIds = [];

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      document
        .querySelector(`[data-row="${row}"][data-col="${i}"]`)
        .classList.add('flip');
    }, 350 * (i));

    // flipTimeoutIds.push(id);
  }
}

// function cancelFlipAnimation() {
//   flipTimeoutIds.forEach(clearTimeout);
//   flipTimeoutIds = [];
// }
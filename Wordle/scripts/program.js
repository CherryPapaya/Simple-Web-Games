let word;
let guess = '';
let row = 0;
let col = 0;
let usedLetters = [];
let timeoutIdMsg;
const wordElement = document.querySelector('.js-word');

generateGrid();
getWord();

document.addEventListener('keydown', registerKey);

async function registerKey(event) {  
  const keyPress = event.key;
  const keyPressUpperCase = keyPress.toUpperCase();
  
  const box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

  if (keyPress === 'Enter') {
    if (guess.length === 5) {
      const isValid = await checkIfValidWord(guess);
      
      if (isValid) {
        processGuess(guess);
      } else {
        runInvalidEvent();
      }
    }
  }
  
  if (keyPress === 'Backspace') {
    if (col - 1 >= 0) {
      guess = guess.slice(0, -1);
      document.querySelector(`[data-row="${row}"][data-col="${col-1}"]`).innerHTML = '';
      col--;
    }
  }
  
  if (!(event.keyCode >= 65 && event.keyCode <= 90)) return;
  if (col >= 5) return; 
  
  guess += keyPressUpperCase;
  box.innerHTML = keyPressUpperCase;
  col++;
}

async function getWord() {
  word = await getRandomWord();
  console.log(`Word: ${word}`);
}

function processGuess(userGuess) {
  for (let i = 0; i < 5; i++) {
    const letter = toCharArray(userGuess)[i];
    if (!usedLetters.includes(letter)) usedLetters.push(letter);
  }
  
  const isCorrect = runCheck(userGuess, word, row);
  
  if (isCorrect) {
    wordElement.innerHTML = 'YAY';
    runEndgame();
  } else if (row === 5) {
    wordElement.innerHTML = word;
    runEndgame();
  }
  
  guess = '';
  row++;
  col = 0;
}

function runInvalidEvent() {
  document.querySelector(`[data-grid-row="${row}"]`).classList.add('grid-row-shake');
  wordElement.innerHTML = 'Invalid word!';
  wordElement.classList.add('invalid-word-msg');
  clearTimeout(timeoutIdMsg);
  
  timeoutIdMsg = setTimeout(() => {
    wordElement.classList.remove('invalid-word-msg');
    wordElement.innerHTML = ' ';
  }, 3000);
  
  setTimeout(() => {
    document.querySelector(`[data-grid-row="${row}"]`).classList.remove('grid-row-shake');
  }, 500);
}

function runEndgame() {
  document.removeEventListener('keydown', registerKey);
}
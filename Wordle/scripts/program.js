let word;
let guess = '';
let row = 0;
let col = 0;
let usedLetters = new Map();
let guesses; 
let timeoutIdMsg;
let lastBox;
let backspaceAllowed = true;
let keyPressAllowed = true;
const keys = document.querySelectorAll('.js-key');
const wordElement = document.querySelector('.js-word');

getWord();
generateGrid();
guesses = JSON.parse(localStorage.getItem('guesses', JSON.stringify(guesses))) || [];
setBoxValue();

document.addEventListener('keyup', (event) => {
  if (event.key === 'Backspace') backspaceAllowed = true;
})

document.addEventListener('pointerup', () => {
  backspaceAllowed = true;
})

keys.forEach(key => {
  key.addEventListener('click', handleVirtualKey);
});

document.addEventListener('keydown', handlePhysicalKey);

function handlePhysicalKey(event) {
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  const keyPress = event.key.toUpperCase();
  const keyButton = document.querySelector(`[data-key="${keyPress}"]`);
  if (keyButton) keyButton.click();
}

function handleVirtualKey(event) {
  registerKey(event.currentTarget.dataset.key);
}

async function registerKey(keyPress) {
  if (keyPressAllowed) {
    const gridRow = document.querySelector(`[data-grid-row="${row}"]`);
    const box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  
    if (keyPress === 'ENTER') {
      if (guess.length === 5) {
        keyPressAllowed = false;
        lastBox = document.querySelector(`[data-row="${row}"][data-col="4"]`);
        
        const isValid = await checkIfValidWord(guess);
        
        if (!isValid) {
          runInvalidEvent(gridRow, true);
          return;
        }
        
        guesses.push(guess);
        localStorage.setItem('guesses', JSON.stringify(guesses));
        console.log(localStorage.getItem('guesses'));
        
        startAnimation('flip', row);
        processGuess(guess, true);
        // console.log(usedLetters);
        lastBox.addEventListener('animationend', () => {
          keyPressAllowed = true;
        });
      } else {
        runInvalidEvent(gridRow, false);
      }
    }
    
    if (keyPress === 'BACKSPACE') {
      if (backspaceAllowed) {
        if (col - 1 >= 0) {
          guess = guess.slice(0, -1);
          document.querySelector(`[data-row="${row}"][data-col="${col-1}"]`).innerHTML = '';
          document.querySelector(`[data-row="${row}"][data-col="${col-1}"]`).classList.remove('pulse');
          col--;
          backspaceAllowed = false;
        }
      }
    }
    
    if (keyPress.length > 1 || !(/^[A-Z]/.test(keyPress))) return;
    if (col >= 5) return; 
    
    guess += keyPress;
    box.classList.add('pulse');
    box.innerHTML = keyPress;
    col++;
  }
}

function setBoxValue() {
  guesses.forEach(guess => {
    for (let i = 0; i < 5; i++) {
      box = document.querySelector(`[data-row="${row}"][data-col="${i}"]`);
      box.innerHTML = guess.charAt(i);
    }
    processGuess(guess, false);
  });
}

async function getWord() {
  word = localStorage.getItem('word', word) || await getRandomWord();
  localStorage.setItem('word', word);
  console.log(`Word: ${word}`);
}

function processGuess(guessToProcess, playCheckAnim) {
  lastBox = document.querySelector(`[data-row="${row}"][data-col="${4}"]`);
  
  const isCorrect = runCheck(guessToProcess, word, row, lastBox, playCheckAnim);
  
  if (isCorrect) {
    lastBox.addEventListener('animationend', () => {
      wordElement.innerHTML = '&#10024; YAY &#10024;';
      startAnimation('bounce', row - 1);
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

function runInvalidEvent(rowToShake, hasEnoughLetters) {
  rowToShake.classList.add('grid-row-shake');
  clearTimeout(timeoutIdMsg);
  
  if (hasEnoughLetters)  {
    wordElement.innerHTML = 'NOT IN WORD LIST';
  } else {
    wordElement.innerHTML = 'NOT ENOUGH LETTERS';
  }
  
  timeoutIdMsg = setTimeout(() => {
    wordElement.innerHTML = ' ';
  }, 3000);
  
  setTimeout(() => {
    rowToShake.classList.remove('grid-row-shake');
  }, 500);
}

function runEndgame() {
  keys.forEach(key => {
    key.removeEventListener('click', handleVirtualKey);
  });
  document.removeEventListener('keydown', handlePhysicalKey);
  
  localStorage.clear();
}

function startAnimation(type, row) {
  let delay = 350;
  
  if (type === 'bounce') delay = 100;

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      document
        .querySelector(`[data-row="${row}"][data-col="${i}"]`)
        .classList.add(type);
    }, delay * (i));

  }
}
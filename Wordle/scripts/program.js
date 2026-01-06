let word;
let guess = '';
let row = 0;
let col = 0;
let usedLetters = []; // should be Map (correctness, char);
let timeoutIdMsg;
let lastBox;
let actionAllowed = true;
const keys = document.querySelectorAll('.js-key');
const wordElement = document.querySelector('.js-word');
// let flipTimeoutIds;

getWord();
generateGrid();

document.addEventListener('keyup', (event) => {
  if (event.key === 'Backspace') actionAllowed = true;
})

document.addEventListener('pointerup', () => {
  actionAllowed = true;
})

document.addEventListener('keydown', (event) => {
  const keyPress = event.key.toUpperCase();
  document.querySelector(`[data-key="${keyPress}"]`).click();
});

keys.forEach(key => {
  const keyValue = key.dataset.key;
  
  // key.addEventListener('click', handleKeyClick);
  key.addEventListener('click', () => {
    registerKey(keyValue);
  })
});

// function handleKeyClick(key) {
//   registerKey(keyValue);
//   const keyValue = key.innerHTML;
// }

async function registerKey(keyPress) {
  const gridRow = document.querySelector(`[data-grid-row="${row}"]`);
  const box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

  if (keyPress === 'ENTER') {
    if (guess.length === 5) {
      const isValid = await checkIfValidWord(guess);
      
      if (!isValid) {
        runInvalidEvent(gridRow, true);
        return;
      }
      
      startFlipAnimation(row);
      processGuess(guess);
    } else {
      runInvalidEvent(gridRow, false);
    }
  }
  
  if (keyPress === 'BACKSPACE') {
    if (actionAllowed) {
      if (col - 1 >= 0) {
        guess = guess.slice(0, -1);
        document.querySelector(`[data-row="${row}"][data-col="${col-1}"]`).innerHTML = '';
        document.querySelector(`[data-row="${row}"][data-col="${col-1}"]`).classList.remove('pulse');
        col--;
        actionAllowed = false;
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

// async function registerKey(event) {  
//   const keyPress = event.key;
//   const keyPressUpperCase = keyPress.toUpperCase();
  
//   const gridRow = document.querySelector(`[data-grid-row="${row}"]`);
//   const box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
//   lastBox = document.querySelector(`[data-row="${row}"][data-col="${4}"]`);

//   if (keyPress === 'Enter') {
//     if (guess.length === 5) {
//       const isValid = await checkIfValidWord(guess);
      
//       if (!isValid) {
//         // cancelFlipAnimation(row);
//         runInvalidEvent(gridRow);
//         return;
//       }
//       startFlipAnimation(row);
//       processGuess(guess);
//     }
//   }
  
//   if (keyPress === 'Backspace') {
//     if (event.repeat) return;
//     if (col - 1 >= 0) {
//       guess = guess.slice(0, -1);
//       document.querySelector(`[data-row="${row}"][data-col="${col-1}"]`).innerHTML = '';
//       document.querySelector(`[data-row="${row}"][data-col="${col-1}"]`).classList.remove('pulse');
//       col--;
//     }
//   }
  
//   if (!(event.keyCode >= 65 && event.keyCode <= 90)) return;
//   if (col >= 5) return; 
  
//   guess += keyPressUpperCase;
//   box.classList.add('pulse');
//   box.innerHTML = keyPressUpperCase;
//   col++;
// }

async function getWord() {
  word = await getRandomWord();
  console.log(`Word: ${word}`);
}

function processGuess(guessToProcess) {
  lastBox = document.querySelector(`[data-row="${row}"][data-col="${4}"]`);
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
  // keys.
  
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
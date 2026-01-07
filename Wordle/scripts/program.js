let word;
let guess = '';
let row = 0;
let col = 0;
let usedLetters = new Map();
let guesses; 
let popupTimeoutId;
let lastBox;
let backspaceAllowed = true;
let keyPressAllowed = true;
const keys = document.querySelectorAll('.js-key');
const popupContainer = document.querySelector('.js-popup-container');
const newGameBtn = document.querySelector('.js-new-game-btn');

getWord();
generateGrid();
guesses = JSON.parse(localStorage.getItem('guesses', JSON.stringify(guesses))) || [];
setGridProgres();
setKeyProgress();

newGameBtn.addEventListener('click', () => {
  runEndgame();
  location.reload();
  alert('Hello there');
})

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
          keyPressAllowed = true;
          return;
        }
        
        guesses.push(guess);
        localStorage.setItem('guesses', JSON.stringify(guesses));
        
        startAnimation('flip', row);
        processGuess(guess, true);
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

function setGridProgres() {
  guesses.forEach(guess => {
    for (let i = 0; i < 5; i++) {
      box = document.querySelector(`[data-row="${row}"][data-col="${i}"]`);
      box.innerHTML = guess.charAt(i);
    }
    processGuess(guess, false);
  });
}

function setKeyProgress() {
  let keyboardKey;
  let correctness;
  
  usedLetters.keys().forEach(letter => {
    keyboardKey = document.querySelector(`[data-key="${letter}"]`);
    correctness = usedLetters.get(letter);
    
    if (correctness === 'correct') {
      keyboardKey.classList.add('correct');
    } else if (correctness === 'present') {
      keyboardKey.classList.add('present');
    } else if (correctness === 'absent') {
      keyboardKey.classList.add('absent');
    }
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
    lastBox.addEventListener('animationend', (animEvent) => {
      startAnimation('bounce', row - 1);
      if (animEvent.animationName === 'flip') {
        showPopup('&#10024; YAY &#10024;');
      }
    });
    
    runEndgame();
  } else if (row === 5) {
    lastBox.addEventListener('animationend', () => {
      showPopup(word);
    });
    runEndgame();
  }
  
  guess = '';
  row++;
  col = 0;
}

function runInvalidEvent(rowToShake, hasEnoughLetters) {
  rowToShake.classList.add('grid-row-shake');
  
  clearTimeout(popupTimeoutId);
  
  if (hasEnoughLetters)  {
    showPopup('Not in word list');
  } else {
    showPopup('Not enough letters');
  }
  
  setTimeout(() => {
    keyPressAllowed = true;
    rowToShake.classList.remove('grid-row-shake');
  }, 500);
  
}

function runEndgame() {
  keys.forEach(key => {
    key.removeEventListener('click', handleVirtualKey);
  });
  document.removeEventListener('keydown', handlePhysicalKey);
  
  localStorage.clear();
  usedLetters.clear();
}

function startAnimation(type, row) {
  let delay;
  type === 'bounce' ? delay = 100 : delay = 350;

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      document
        .querySelector(`[data-row="${row}"][data-col="${i}"]`)
        .classList.add(type);
    }, delay * (i));
  }
}

function showPopup(content) {
  const popup = document.createElement('div');
  popup.className = 'popup js-popup';
  popup.innerHTML = content;
  
  popupContainer.appendChild(popup);
  
  const children = [...popupContainer.children];

  children.forEach(child => {
    if (!content.includes('YAY') && content !== word) {
      child.classList.add('fade-out');
      
      setTimeout(() => {
        child.remove();
      }, 2000);
    }
  });
}
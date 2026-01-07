function runCheck(guess, word, row, lastBox, playCheckAnim) {
  lastBox = document.querySelector(`[data-row="${row}"][data-col="${4}"]`);
  
  const guessChars = toCharArray(guess);
  const wordChars = toCharArray(word);
    
  // Prioritize perfect matches first
  guessChars.forEach((char, index) => {    
    if (wordChars[index] === char) {
      guessChars[index] = '/';
      wordChars[index] = '/';
      
      updateUsedLetters(char, 'correct');
      
      lastBox.addEventListener('animationend', () => {
        document.querySelector(`[data-key="${char}"]`).classList.add('correct');
      });
      
      col++
    }
  });
  
  // Then check for presence
  guessChars.forEach((char, index) => {
    if (char === '/') return;
    
    if (wordChars.includes(char)) {
      guessChars[index] = '~';
      replaceWithTilde(wordChars, char);
      
      if (usedLetters.get(char) !== 'correct') {
        updateUsedLetters(char, 'present');
      }
      
      lastBox.addEventListener('animationend', () => {
        if (document.querySelector(`[data-key="${char}"]`).classList.contains('correct')) return;
        document.querySelector(`[data-key="${char}"]`).classList.add('present');
      });
      
      col++;
    }
  });
  
  guessChars.forEach((char, index) => {
    if (char === '~' || char === '/') return;
    
    guessChars[index] = 'X';
    
    updateUsedLetters(char, 'absent');
    
    lastBox.addEventListener('animationend', () => {
      document.querySelector(`[data-key="${char}"]`).classList.add('absent');
    });
  });
  
  renderCheck(guessChars, row, playCheckAnim);
  
  if (guess === word) {
    renderCheck(['/', '/', '/', '/', '/'], row, true);
    return true;
  }
  
  return false;
}

function toCharArray(word) {
  const charArray = word.split('');
  return charArray;
}

function replaceWithTilde(charArray, char) {
  const index = charArray.indexOf(char);
  charArray[index] = '~';
}

function renderCheck(charArray, row, playAnimation) {
  let box;
  let offset = 0;
  let delay = 0;

  if (playAnimation) {
    offset = 250;
    delay = 350;
  }
  
  charArray.forEach((char, index) => {
    setTimeout(() => {
      box = document.querySelector(`[data-row="${row}"][data-col="${index}"]`);
      
      if (char === '/') {
        box.classList.add('correct');
      } else if (char === '~') {
        box.classList.add('present');
      } else if (char === 'X') {
        box.classList.add('absent');
      }
    }, offset + delay * (index));
  });
}

function updateUsedLetters(letter, state) {
  usedLetters.set(letter, state);
}
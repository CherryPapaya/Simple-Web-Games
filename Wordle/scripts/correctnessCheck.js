function runCheck(guess, word, row, lastBox) {
  lastBox = document.querySelector(`[data-row="${row}"][data-col="${4}"]`);
  
  const guessChars = toCharArray(guess);
  const wordChars = toCharArray(word);
    
  // Prioritize perfect matches first
  guessChars.forEach((char, index) => {    
    if (wordChars[index] === char) {
      guessChars[index] = '/';
      wordChars[index] = '/';
      
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
    
    lastBox.addEventListener('animationend', () => {
      document.querySelector(`[data-key="${char}"]`).classList.add('absent');
    });
  });
  
  renderCheck(guessChars, row);
  
  if (guess === word) {
    renderCheck(['/', '/', '/', '/', '/'], row);
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

function renderCheck(charArray, row) {
  let box;
  
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
    }, 250 + 350 * (index));
  });
}
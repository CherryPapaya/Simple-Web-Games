function runCheck(guess, word, row) {
  if (guess === word) {
    renderCheck(['/', '/', '/', '/', '/'], row);
    return true;
  }
  
  const guessChars = toCharArray(guess);
  const wordChars = toCharArray(word);
    
  // Prioritize perfect matches first
  guessChars.forEach((char, index) => {    
    if (wordChars[index] === char) {
      guessChars[index] = '/';
      wordChars[index] = '/'
      document.querySelector(`[data-key="${char}"]`).classList.add('correct');
      col++
    }
  });
  
  // Then check for presence
  guessChars.forEach((char, index) => {
    if (char === '/') return;
    
    if (wordChars.includes(char)) {
      guessChars[index] = '~';
      replaceWithTilde(wordChars, char);
      document.querySelector(`[data-key="${char}"]`).classList.add('present');
      col++;
    }
  });
  
  guessChars.forEach((char, index) => {
    if (char === '~' || char === '/') return;
    
    guessChars[index] = 'X';
    document.querySelector(`[data-key="${char}"]`).classList.add('absent');
  });
  
  renderCheck(guessChars, row);
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
    }, 250 + 300 * (index));
  });
}
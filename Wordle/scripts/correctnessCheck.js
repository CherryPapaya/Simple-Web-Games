function runCheck(guess, word, row) {
  if (guess === word) {
    console.log('Correct');
    renderCheck(['/', '/', '/', '/', '/'], row);
    return true;
  }
  
  const guessChars = toArray(guess);
  const wordChars = toArray(word);
    
  // Prioritize perfect matches first
  guessChars.forEach((char, index) => {    
    if (wordChars[index] === char) {
      guessChars[index] = '/';
      wordChars[index] = '/'
      col++
    }
  });
  
  // Then check for partial match
  guessChars.forEach((char, index) => {
    if (char === '/') return;
    
    if (wordChars.includes(char)) {
      guessChars[index] = '~';
      replaceWithTilde(wordChars, char);
      col++;
    }
  });
  
  guessChars.forEach((char, index) => {
    if (char === '~' || char === '/') return;
    
    guessChars[index] = 'X';
  });
  
  renderCheck(guessChars, row);
  
  console.log(guessChars);
}

function toArray(word) {
  const charArray = word.split('');
  // console.log(charArray);
  return charArray;
}

function replaceWithTilde(charArray, char) {
  const index = charArray.indexOf(char);
  charArray[index] = '~';
}

function renderCheck(charArray, row) {
  let box;
  
  charArray.forEach((char, index) => {
    box = document.querySelector(`[data-row="${row}"][data-col="${index}"]`);
    
    if (char === '/') {
      box.classList.add('correct');
    } else if (char === '~') {
      box.classList.add('partial');
    }
  });
}
function runCheck(guess, word) {
  if (guess === word) {
    console.log('Correct');
    return true;
  }
  
  const guessChars = toArray(guess);
  const wordChars = toArray(word);
    
  // Prioritize perfect matches first
  guessChars.forEach((char, index) => {    
    if (wordChars[index] === char) {
      guessChars[index] = '/';
      wordChars[index] = '/'
    }
  });
  
  // Then check for partial match
  guessChars.forEach((char, index) => {
    if (char === '/') return;
    
    if (wordChars.includes(char)) {
      guessChars[index] = '~';
      replaceWithTilde(wordChars, char);
    }
  });
  
  guessChars.forEach((char, index) => {
    if (char === '~' || char === '/') return;
    
    guessChars[index] = 'X';
  });
  
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
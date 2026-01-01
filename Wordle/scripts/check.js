function runCheck(guess, word) {
  if (guess === word) {
    console.log('One shot');
    return;
  }
  
  const guessChars = toArray(guess);
  const wordChars = toArray(word);
  
  guessChars.forEach((char, index) => {    
    if (wordChars[index] === char) {
      guessChars[index] = '/';
      wordChars[index] = '/'
    }
  });
  
  guessChars.forEach((char, index) => {
    if (char === '/') return;
    
    if (wordChars.includes(char)) {
      guessChars[index] = '~';
    } else if (!wordChars.includes(char)){
      guessChars[index] = 'X';
    }
  });
  
  console.log(guessChars);
}

function toArray(word) {
  const charArray = word.split('');
  // console.log(charArray);
  return charArray;
}
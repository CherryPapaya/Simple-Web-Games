let word;
// let word = 'TASTE';
// console.log(`Word: ${word}`)
let guess = '';
let row = 0;
let col = 0;
let usedLetters = [];
const wordElement = document.querySelector('.js-word');

generateGrid();
getWord();

document.addEventListener('keydown', registerKey);

function registerKey(event) {  
  const keyPress = event.key;
  const keyPressUpperCase = keyPress.toUpperCase();
  
  const box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  
  if (keyPress === 'Enter') {
    console.log(row);
    
    if (guess.length === 5) {
      
      for (let i = 0; i < 5; i++) {
        const letter = toCharArray(guess)[i];
        if (!usedLetters.includes(letter)) usedLetters.push(letter);
      }
      
      console.log(usedLetters);
      console.log(guess);
      const success = runCheck(guess, word, row);
      // runCheck(guess, word, row);
      if (success) {
        document.removeEventListener('keydown', registerKey);
        return;
      }
      
      guess = '';
      row++;
      col = 0;
      
      if (row + 1 > 6) {
        wordElement.innerHTML = word;
        document.removeEventListener('keydown', registerKey);
        return;
      }
    }
  } else if (keyPress === 'Backspace') {
    if (col - 1 >= 0) {
      guess = guess.slice(0, -1);
      document.querySelector(`[data-row="${row}"][data-col="${col-1}"]`).innerHTML = '';
      col--;
    }
  } else if (!(event.keyCode >= 65 && event.keyCode <= 90)) {
    return;
  } else if (col < 5) {
    guess += keyPressUpperCase;
    box.innerHTML = keyPressUpperCase;
    col++;
  }
}

async function getWord() {
  word = await getRandomWord();
  console.log(`Word: ${word}`);
}
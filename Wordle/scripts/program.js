let word;
// let word = 'TASTE';
// console.log(`Word: ${word}`)
let guess = '';
let row = 0;
let col = 0;

generateGrid();
getWord();

document.addEventListener('keydown', registerKey);

function registerKey(event) {
  if (row + 1 > 6) {
    document.removeEventListener('keydown', registerKey);
    return;
  }
  
  const keyPress = event.key;
  const keyPressUpperCase = keyPress.toUpperCase();
  
  const box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  
  if (keyPress === 'Enter') {
    console.log(row);
    if (guess.length === 5) {
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
    }
    // return;
  } else if (keyPress === 'Backspace') {
    if (col - 1 >= 0) {
      guess = guess.slice(0, -1);
      document.querySelector(`[data-row="${row}"][data-col="${col-1}"]`).innerHTML = '';
      col--;
    }
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
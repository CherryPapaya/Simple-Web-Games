let word;
// let word = 'TASTE';
// console.log(`Word: ${word}`)
let guess = '';
let row = 0;
let col = 0;
let usedLetters = [];
let timeoutIdMsg;
const wordElement = document.querySelector('.js-word');

generateGrid();
getWord();

document.addEventListener('keydown', registerKey);

async function registerKey(event) {  
  const keyPress = event.key;
  const keyPressUpperCase = keyPress.toUpperCase();
  
  const box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  
  if (keyPress === 'Enter') {
    if (guess.length === 5) {
      checkIfValidWord(guess).then(isValid => {
        if (isValid) {
          for (let i = 0; i < 5; i++) {
            const letter = toCharArray(guess)[i];
            if (!usedLetters.includes(letter)) usedLetters.push(letter);
          }
          
          console.log(usedLetters);
          console.log(guess);
          const correct = runCheck(guess, word, row);
          
          if (correct) {
            wordElement.innerHTML = 'YAY';
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
        } else {
          document.querySelector('.js-grid-row').classList.add('grid-row-shake');
          wordElement.innerHTML = 'Invalid word!';
          wordElement.classList.add('invalid-word-msg');
          clearTimeout(timeoutIdMsg);
          
          timeoutIdMsg = setTimeout(() => {
            wordElement.classList.remove('invalid-word-msg');
            wordElement.innerHTML = ' ';
          }, 3000);
          
          setTimeout(() => {
            document.querySelector('.js-grid-row').classList.remove('grid-row-shake');
          }, 500);
        }
      });
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
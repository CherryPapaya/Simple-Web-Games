const guessInput = document.getElementById('guess-input');
let word;

getWord();

async function getWord() {
  word = await getRandomWord();
  console.log(`Word: ${word}`);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const guess = guessInput.value.trim().toUpperCase();
    runCheck(guess, word);
  }
})

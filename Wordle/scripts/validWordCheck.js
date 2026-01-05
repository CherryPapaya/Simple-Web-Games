async function checkIfValidWord(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    return false;
  } else {
    return true;
  }
}
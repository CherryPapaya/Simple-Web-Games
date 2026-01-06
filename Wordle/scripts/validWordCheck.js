async function checkIfValidWord(word) {
  const url = `https://freedictionaryapi.com/api/v1/entries/en/${word.toLowerCase()}`;
  // const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  
  const response = await fetch(url);
  
  // For https://freedictionaryapi.com/api/v1/entries/en/${word}
  const result = await response.json();
  const entries = result.entries;
  
  if (entries.length === 0) return false;
  
  // For https://api.dictionaryapi.dev/api/v2/entries/en/${word}
  // if (!response.ok) return false;
  
  return true;
}
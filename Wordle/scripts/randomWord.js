const url = "https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase";

async function getRandomWord() {
  const notInDictApi = ['APRIL'];
  
  while (true) {
    const response = await fetch(url);
    const result = await response.json();
    const word = result[0];
    
    if (!notInDictApi.includes(word)) return word; 
  }
  
}
const url = "https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase";

async function getRandomWord() {
  const response = await fetch(url);
  const result = await response.json();
  const word = result[0];
  return word;
}
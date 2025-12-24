const floor = document.getElementById('floor');
const move = document.querySelector('.text');

document.addEventListener('keydown', (event) => {
  let keyPress = event.key;
  if (keyPress.includes('Arrow') || keyPress.includes('Space')) event.preventDefault();
  move.innerHTML = keyPress;
  console.log(keyPress);
})

for (let i = 0; i < 3; i++) {
  const row = document.createElement('div');
  row.className = `${i} row`;
  for (let j = 0; j < 3; j++) {
    const tile = document.createElement('div');
    tile.className = `tile${i}${j} tile`;

    row.appendChild(tile);
  }
  floor.appendChild(row);
}
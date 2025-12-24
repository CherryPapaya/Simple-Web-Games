const rand = Math.ceil(Math.random() * 5);

const floor = document.getElementById('floor');
const move = document.querySelector('.text');
let tile;

let box;
let keyPress;

let row;
let col;

for (let i = 0; i < rand; i++) {
  const rowDiv = document.createElement('div');
  rowDiv.className = `${i} row`;

  for (let j = 0; j < rand; j++) {
    tile = document.createElement('div');
    tile.className = `tile`;
    tile.dataset.row = i;
    tile.dataset.col = j;

    rowDiv.appendChild(tile);
  }
  floor.appendChild(rowDiv);
}

box = document.querySelector('[data-row="0"][data-col="0"]');
box.classList.add('box');

row = box.dataset.row;
col = box.dataset.col;

document.addEventListener('keydown', (event) => {
  keyPress = event.key;
  if (keyPress.includes('Arrow')) event.preventDefault();

  if (keyPress.includes('Right')) {
    col === rand - 1 ? col = 0 : col++;
    box.classList.remove('box');
    box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    box.classList.add('box');
  }

  if (keyPress.includes('Left')) {
    col === 0 ? col = rand - 1 : col--;
    box.classList.remove('box');
    box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    box.classList.add('box');
  }

  if (keyPress.includes('Up')) {
    row === 0 ? row = rand - 1 : row--;
    box.classList.remove('box');
    box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    box.classList.add('box');
  }

  if (keyPress.includes('Down')) {
    row === rand - 1 ? row = 0 : row++;
    box.classList.remove('box');
    box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    box.classList.add('box');
  }

  move.innerHTML = keyPress;
});





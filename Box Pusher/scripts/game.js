const arenaSize = 2 + Math.ceil(Math.random() * 3);
const floor = document.getElementById('floor');
const retryBtn = document.querySelector('.retry-btn');
let tile;
let box;
let target;
let keyPress;
let row;
let col;

for (let i = 0; i < arenaSize; i++) {
  const rowDiv = document.createElement('div');
  rowDiv.className = `${i} row`;

  for (let j = 0; j < arenaSize; j++) {
    tile = document.createElement('div');
    tile.className = `tile`;
    tile.dataset.row = i;
    tile.dataset.col = j;

    rowDiv.appendChild(tile);
  }
  floor.appendChild(rowDiv);
}

target = document.querySelector(`[data-row="${arenaSize-1}"][data-col="${arenaSize-1}"]`);
target.classList.add('target');

box = document.querySelector('[data-row="0"][data-col="0"]');
box.classList.add('box');

row = Number(box.dataset.row);
col = Number(box.dataset.col);

document.addEventListener('keydown', handleMove);

retryBtn.addEventListener('click', () => {
  location.reload();
});

function handleMove(event) {
  keyPress = event.key;
  if (keyPress.includes('Arrow')) event.preventDefault();

  if (keyPress.includes('Right')) {
    col === arenaSize - 1 ? col = 0 : col++;
    box.classList.remove('box');
    box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    box.classList.add('box');
  }

  if (keyPress.includes('Left')) {
    col === 0 ? col = arenaSize - 1 : col--;
    box.classList.remove('box');
    box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    box.classList.add('box');
  }

  if (keyPress.includes('Up')) {
    row === 0 ? row = arenaSize - 1 : row--;
    box.classList.remove('box');
    box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    box.classList.add('box');
  }

  if (keyPress.includes('Down')) {
    row === arenaSize - 1 ? row = 0 : row++;
    box.classList.remove('box');
    box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    box.classList.add('box');
  }

  if (box.dataset.row === target.dataset.row && box.dataset.col === target.dataset.col) {
    document.removeEventListener('keydown', handleMove);
    console.log('You win!');
  }
}
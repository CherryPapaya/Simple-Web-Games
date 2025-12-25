const arenaSize = 5 + Math.ceil(Math.random() * 10);
const floor = document.getElementById('floor');
const floorHeight = floor.offsetHeight;
const floorWidth = floor.offsetWidth;

// const retryBtn = document.querySelector('.retry-btn');
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
    tile.style.height = floorHeight / arenaSize / 1.1+ 'px';
    tile.style.width = floorWidth / arenaSize + 'px';
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

// retryBtn.addEventListener('click', () => {
//   location.reload();
// });

function handleMove(event) {
  keyPress = event.key;
  if (keyPress.includes('Arrow')) event.preventDefault();

  if (keyPress.includes('Right')) {
    col === arenaSize - 1 ? col = col : col++;
    box.classList.remove('box');
    box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    box.classList.add('box');
  }

  if (keyPress.includes('Left')) {
    col === 0 ? col = col : col--;
    box.classList.remove('box');
    box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    box.classList.add('box');
  }

  if (keyPress.includes('Up')) {
    row === 0 ? row = row : row--;
    box.classList.remove('box');
    box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    box.classList.add('box');
  }

  if (keyPress.includes('Down')) {
    row === arenaSize - 1 ? row = row : row++;
    box.classList.remove('box');
    box = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    box.classList.add('box');
  }

  if (box.dataset.row === target.dataset.row && box.dataset.col === target.dataset.col) {
    document.removeEventListener('keydown', handleMove);
    document.addEventListener('keydown', (event) => {
      if (event.key === ('Enter')) {
        location.reload();
      }
    });
    target.classList.add('win-tile');
    console.log('You win!');
  }
}
const arenaSize = 5 + Math.ceil(Math.random() * 10);
const floor = document.getElementById('floor');
const floorHeight = floor.offsetHeight;
const floorWidth = floor.offsetWidth;

let tile;
let box;
// let obstacle;
let obstacleRandRow;
let obstacleRandCol;
let target;
let keyPress;
let row;
let col;

for (let i = 0; i < arenaSize; i++) {
  const rowDiv = document.createElement('div');
  rowDiv.className = `${i} row`;

  for (let j = 0; j < arenaSize; j++) {
    tile = document.createElement('div');
    tile.style.height = floorHeight / arenaSize / 1.1 + 'px';
    tile.style.width = floorWidth / arenaSize + 'px';
    tile.className = `tile`;
    tile.dataset.row = i;
    tile.dataset.col = j;

    rowDiv.appendChild(tile);
  }
  floor.appendChild(rowDiv);
}

for (let i = 0; i < 20; i++) {
  obstacleRandRow = Math.floor(Math.random() * arenaSize);
  obstacleRandCol = Math.floor(Math.random() * arenaSize);

  if ((obstacleRandRow === 0 && obstacleRandCol === 0) ||
      (obstacleRandRow === arenaSize - 1 && obstacleRandCol === arenaSize - 1)
  ) {
    continue;
  }

  obstacle = document.querySelector(`[data-row="${obstacleRandRow}"][data-col="${obstacleRandCol}"]`);

  if (!obstacle) continue;

  obstacle.classList.add('obstacle');
}

target = document.querySelector(`[data-row="${arenaSize-1}"][data-col="${arenaSize-1}"]`);
target.classList.add('target');

box = document.querySelector('[data-row="0"][data-col="0"]');
box.classList.add('box');

row = Number(box.dataset.row);
col = Number(box.dataset.col);

document.addEventListener('keydown', handleMove);

function handleMove(event) {
  keyPress = event.key;
  if (keyPress.includes('Arrow')) event.preventDefault();

  if (keyPress.includes('Right')) {
    const nextCol = col + 1;
    if (nextCol >= arenaSize) return;

    const nextTile = document.querySelector(`[data-row="${row}"][data-col="${nextCol}"]`);

    if (nextTile.classList.contains('obstacle')) {
      console.log("Obstacle blocking!");
      return;
    }

    box.classList.remove('box');
    col = nextCol;
    box = nextTile;
    box.classList.add('box');
  }

  if (keyPress.includes('Left')) {
    const prevCol = col - 1;
    if (prevCol < 0) return;

    const prevTile = document.querySelector(`[data-row="${row}"][data-col="${prevCol}"]`);

    if (prevTile.classList.contains('obstacle')) {
      console.log("Obstacle blocking!");
      return;
    }

    box.classList.remove('box');
    col = prevCol;
    box = prevTile;
    box.classList.add('box');
  }

  if (keyPress.includes('Up')) {
    const prevRow = row - 1;
    if (prevRow < 0) return;

    const prevTile = document.querySelector(`[data-row="${prevRow}"][data-col="${col}"]`);

    if (prevTile.classList.contains('obstacle')) {
      console.log("Obstacle blocking!");
      return;
    }

    box.classList.remove('box');
    row = prevRow;
    box = prevTile;
    box.classList.add('box');
  }

  if (keyPress.includes('Down')) {
    const nextRow = row + 1;
    if (nextRow >= arenaSize) return;

    const nextTile = document.querySelector(`[data-row="${nextRow}"][data-col="${col}"]`);

    if (nextTile.classList.contains('obstacle')) {
      console.log("Obstacle blocking!");
      return;
    }

    box.classList.remove('box');
    row = nextRow;
    box = nextTile;
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
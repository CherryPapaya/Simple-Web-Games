

const floor = document.getElementById('floor');
const floorHeight = floor.offsetHeight;
const floorWidth = floor.offsetWidth;

let tile;
let obstacle;
let obstacleRandRow;
let obstacleRandCol;

export function buildArena(arenaSize) {
  for (let i = 0; i < arenaSize; i++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = `${i} row`;

    for (let j = 0; j < arenaSize; j++) {
      tile = document.createElement('div');
      tile.style.height = floorHeight / arenaSize * 0.9 + 'px';
      tile.style.width = floorWidth / arenaSize * 0.9 + 'px';
      tile.className = `tile`;
      tile.dataset.row = i;
      tile.dataset.col = j;

      rowDiv.appendChild(tile);
    }
    floor.appendChild(rowDiv);
  }

  for (let i = 0; i < arenaSize * 2; i++) {
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

  // target = document.querySelector(`[data-row="${arenaSize-1}"][data-col="${arenaSize-1}"]`);
  // target.classList.add('target');

  // box = document.querySelector('[data-row="0"][data-col="0"]');
  // box.classList.add('box');
}
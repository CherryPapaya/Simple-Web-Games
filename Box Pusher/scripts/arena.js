const floor = document.getElementById('floor');
// const floorHeight = floor.offsetHeight;
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
      // tile.style.height = floorHeight / arenaSize * 0.9 + 'px';
      tile.style.width = floorWidth / arenaSize * 0.9 + 'px';
      tile.className = `tile`;
      tile.dataset.row = i;
      tile.dataset.col = j;

      rowDiv.appendChild(tile);
    }
    floor.appendChild(rowDiv);
  }
}

// Implment BFS to avoid layouts where target is unreachable
export function generateObstacles(arenaSize) {
  for (let i = 0; i < arenaSize * 4; i++) {
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
}
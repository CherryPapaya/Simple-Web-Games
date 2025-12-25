import { buildArena } from "./arena.js";
// import { handleMove } from "./input.js";

const arenaSize = Math.floor(Math.random() * 10) + 20;
let box;
let keyPress;
let row;
let col;

buildArena(arenaSize);
// placePlayer();
// placeTarget();
// generateObstacles();

const target = document.querySelector(`[data-row="${arenaSize-1}"][data-col="${arenaSize-1}"]`);
target.classList.add('target');

box = document.querySelector('[data-row="0"][data-col="0"]');
box.classList.add('box');

row = Number(box.dataset.row);
col = Number(box.dataset.col);

document.addEventListener('keydown', handleMove);

function handleMove(event) {
  keyPress = event.key;
  if (keyPress.includes('Arrow')) event.preventDefault();

  if (keyPress.includes('Right')) move(0, 1);
  if (keyPress.includes('Left')) move(0, -1);
  if (keyPress.includes('Up')) move(-1, 0);
  if (keyPress.includes('Down')) move(1, 0);
}

function move(dy, dx) {
  const nextRow = row + dy;
  const nextCol = col + dx;

  if (nextCol >= arenaSize ||
      nextCol < 0 ||
      nextRow >= arenaSize ||
      nextRow < 0
  ) return;

  const nextTile = document.querySelector(`[data-row="${nextRow}"][data-col="${nextCol}"]`);

  if (nextTile.classList.contains('obstacle')) {
    console.log("Obstacle blocking!");
    return;
  }

  if (nextTile.classList.contains('target')) {
    handleWin();
  }

  box.classList.remove('box');
  col = nextCol;
  row = nextRow;
  box = nextTile;
  box.classList.add('box');
}

function handleWin() {
  document.removeEventListener('keydown', handleMove);
  document.addEventListener('keydown', (event) => {
    if (event.key === ('Enter')) location.reload();
  });

  target.classList.add('win-tile');
  console.log('You win!');
}
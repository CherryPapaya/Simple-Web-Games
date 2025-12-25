import { buildArena } from "./arena.js";
// import { handleMove } from "./input.js";

const arenaSize = Math.floor(Math.random() * 10) + 20;
let box;

buildArena(arenaSize);

const target = document.querySelector(`[data-row="${arenaSize-1}"][data-col="${arenaSize-1}"]`);
target.classList.add('target');

box = document.querySelector('[data-row="0"][data-col="0"]');
box.classList.add('box');

let keyPress;
let row;
let col;

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



const grid = document.querySelector('.js-grid');


function generateGrid() {
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('div');
    row.className = ('row');
    
    for (let j = 0; j < 5; j++) {
      const box = document.createElement('div');
      box.className = 'box js-box';
      box.dataset.row = i;
      box.dataset.col = j;
      row.appendChild(box); 
    }
    
    grid.appendChild(row);
  }
}
import { shipArray, createShipArray } from './ship';

const cells = document.querySelectorAll('.cell');
const boardContainer = document.querySelector('#boardContainer');
const output = document.querySelector('#output');

class Player {
  constructor() {
    this.turn = false;
  }
  attack(x, y) {
    this.gameboard.receiveAttack(x, y);
  }
}

class Gameboard {
  constructor() {
    this.shipCount = 0;
  }
  createGameBoardDiv() {}
  allSunk() {
    let sunk = true;
    for (const ship of shipArray) {
      if (ship.isSunk === false) {
        sunk = false;
      }
    }
    return sunk;
  }
  receiveAttack(x, y) {
    //if the coordinates are the same as the ship coordinates, then hit the ship
    //if the coordinates are not the same as the ship coordinates, then return coordinates and report a miss
    for (const ship of shipArray) {
      if (ship.x === x && ship.y === y) {
        ship.hit();
      } else {
        //return coordinates of missed attack
        return x, y;
      }
    }
  }

  findRow(head) {
    let row = 0;
    if (head < 10) {
      row = 0;
    } else if (head < 20) {
      row = 1;
    } else if (head < 30) {
      row = 2;
    } else if (head < 40) {
      row = 3;
    } else if (head < 50) {
      row = 4;
    } else if (head < 60) {
      row = 5;
    } else if (head < 70) {
      row = 6;
    } else if (head < 80) {
      row = 7;
    } else if (head < 90) {
      row = 8;
    } else if (head < 100) {
      row = 9;
    } else {
      console.log('invalid row');
    }
    return row;
  }

  placeShip(head, ship) {
    if (ship.direction === 'horizontal') {
      let tails = head;
      //check if tempCell is already in another ship's blocks
      for (const ship of shipArray) {
        for (const block of ship.blocks) {
          if (block === tails) {
            console.log('invalid click');
            placeShip(head, ship);
            // return;
          }
        }
      }

      const tailsRow = findRow(tails);
      if (findRow(tails + ship.length) !== tailsRow) {
        console.log('invalid click');
        placeShip(head, ship);
      }
      //check if cell.id + ship.length = another row
      for (let i = 0; i < ship.length; i++) {
        ship.blocks.push(tails);
        tails++;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        ship.blocks.push(tails);
        tempCell += 10;
      }
    }

    if (ship.name === 'Destroyer') {
      buildEnemyBoard();
    }
    cells.forEach((cell) => {
      //AND no other ship is occupying that space AND its not out of bounds
      if (shipArray[this.shipCount].blocks.includes(Number(cell.id))) {
        cell.style.backgroundColor = '#9fff9c';
      }
    });
    this.shipCount++;
  }
}

function updateDisplay() {
  if (gameboard.allSunk()) {
    output.textContent = 'You win!';
  } else {
    output.textContent = 'You lose!';
  }
}

const player = new Player();

function initializeGame() {
  createShipArray();
  const gameboard = new Gameboard();
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (gameboard.shipCount < 5) {
        gameboard.placeShip(Number(cell.id), shipArray[gameboard.shipCount]);
        output.textContent = `Place your ${
          shipArray[gameboard.shipCount].name
        }`;
      }
    });
  });
}

initializeGame();

function buildEnemyBoard() {
  // create enemy board and ships
  const enemyShipArray = [];
  const enemyBoard = document.createElement('div');
  const enemyGameboard = new Gameboard();
  const computer = new Player();

  // the last cell.id is 199
  for (let i = 100; i < 200; i++) {
    //the above function selecting these cells?
    const enemyCell = document.createElement('div');
    enemyCell.classList.add('enemyCell');
    enemyCell.setAttribute('id', i);
    enemyBoard.appendChild(enemyCell);
    enemyCell.addEventListener('click', () => {
      console.log('clicked on enemy cell: ' + enemyCell.id);
      enemyCell.styke.backgroundColor = '#ff9c9c';
      // player.attack(enemyCell.id);
    });
  }
  enemyBoard.classList.add('playerBoard');
  boardContainer.appendChild(enemyBoard);
}

/*
module.exports = {
  Carrier,
  Battleship,
  Cruiser,
  Submarine,
  Destroyer,
  shipArray,
  createShipArray,
};
*/

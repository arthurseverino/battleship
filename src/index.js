import {
  shipArray,
  createShipArray,
  createEnemyShipArray,
  enemyShipArray,
} from './ship';

//if ship is sunk put a x and make it red / green

const cells = document.querySelectorAll('.cell');
const boardContainer = document.querySelector('#boardContainer');
const output = document.querySelector('#output');

class Player {
  constructor() {
    this.turn = false;
  }
}

class Gameboard {
  constructor() {
    this.shipCount = 0;
    this.blocksHit = [];
  }

  switchTurns() {
    if (player.turn) {
      computer.turn = true;
    } else {
      player.turn = true;
    }
  }

  //returns a num between 0 and 99 that has not been hit yet
  chooseBlock() {
    let block = Math.floor(Math.random() * 100);
    while (this.blocksHit.includes(block)) {
      block = Math.floor(Math.random() * 100);
    }
    return block;
  }

  allSunk() {
    let sunk = true;
    for (const ship of shipArray) {
      if (ship.isSunk === false) {
        sunk = false;
      }
    }
    return sunk;
  }
  receiveAttack(cellNum, shipArray) {
    //if the ship coordinates contains the same num clicked, then hit the ship
    //else, miss
    for (const ship of shipArray) {
      for (const block of ship.blocks) {
        if (block === cellNum) {
          ship.hit();
          if (ship.isSunk) {
            output.textContent = `You sunk the ${ship.name}!`;
          } else {
            output.textContent = `You hit the ${ship.name}!`;
          }
        } else {
          output.textContent = `You missed! Block #${block}`;
        }
      }
    }
    setTimeout(() => {
      console.log('timeout');
    }, 1000);

    this.blocksHit.push(cellNum);
    this.switchTurns();
    console.log(this.blocksHit);

    if (player.turn) {
      gameboard.receiveAttack(this.chooseBlock(), shipArray);
      cells.forEach((cell) => {
        if (this.blocksHit.includes(Number(cell.id))) {
          cell.textContent = 'X';
          cell.style.backgroundColor = 'grey';
        }
      });
    } else {
      computer.turn = true;
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
      let greenCellNum = head;

      //check if cell is already in another ship's blocks
      for (const ship of shipArray) {
        for (const block of ship.blocks) {
          if (block === greenCellNum) {
            output.textContent = 'A Ship is already occupying this space';
            return;
          }
        }
      }
      //check if cell.id + ship.length = another row
      const shipRow = this.findRow(greenCellNum);
      if (this.findRow(greenCellNum + ship.length) !== shipRow) {
        output.textContent = 'Ship is out of bounds';
        return;
      }

      for (let i = 0; i < ship.length; i++) {
        ship.blocks.push(greenCellNum);
        greenCellNum++;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        ship.blocks.push(greenCellNum);
        greenCellNum += 10;
      }
    }

    if (ship.name === 'Destroyer') {
      buildEnemyBoard();
    }

    cells.forEach((cell) => {
      //if the ships blocks contains the number that was clicked
      if (shipArray[this.shipCount].blocks.includes(Number(cell.id))) {
        cell.style.backgroundColor = '#9fff9c';
      }
    });
    this.shipCount++;
  }
}

const player = new Player();
const gameboard = new Gameboard();
const enemyGameBoard = new Gameboard();
const computer = new Player();

function initializeGame() {
  createShipArray();
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (gameboard.shipCount < 5) {
        gameboard.placeShip(Number(cell.id), shipArray[gameboard.shipCount]);
        output.textContent = `Place your ships. ${
          5 - gameboard.shipCount
        } remaining`;
      }
      if (gameboard.shipCount === 5) {
        output.textContent =
          'All ships placed! Click on the enemy board to attack!! ';
        player.turn = true;
      }
    });
  });
}

initializeGame();

function buildEnemyBoard() {
  createEnemyShipArray();
  for (const ship of enemyShipArray) {
    console.log(ship);
  }

  const enemyBoardDiv = document.createElement('div');

  for (let i = 100; i < 200; i++) {
    const enemyCell = document.createElement('div');
    enemyCell.classList.add('enemyCell');
    enemyCell.setAttribute('id', i);
    enemyBoardDiv.appendChild(enemyCell);
    enemyCell.addEventListener('click', () => {
      player.turn = true;
      enemyGameBoard.receiveAttack(i, enemyShipArray);
      if (enemyGameBoard.blocksHit.includes(i)) {
        enemyCell.style.backgroundColor = 'grey';
        enemyCell.textContent = 'X';
      }
    });

    //the below is just to check if the enemy ships are being placed correctly
    for (const ship of enemyShipArray) {
      if (ship.blocks.includes(i)) {
        enemyCell.style.backgroundColor = '#ff9c9c';
      }
    }
  }

  enemyBoardDiv.classList.add('playerBoard');
  boardContainer.appendChild(enemyBoardDiv);
}

function updateDisplay() {
  if (gameboard.allSunk()) {
    output.textContent = 'You win!';
  } else {
    output.textContent = 'You lose!';
  }
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

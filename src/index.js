import {
  shipArray,
  createShipArray,
  createEnemyShipArray,
  enemyShipArray,
} from './ship';

const cells = document.querySelectorAll('.cell');
const boardContainer = document.querySelector('#boardContainer');
const output = document.querySelector('#output');

class Gameboard {
  constructor() {
    this.shipCount = 0;
    this.blocksHit = [];
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
    for (const ship of enemyShipArray) {
      if (!ship.isSunk) return false;
    }
    return true;
  }

  attackComputer(cellNum) {
    //first, attack computer board
    let hit = false;
    for (const ship of enemyShipArray) {
      if (ship.blocks.includes(cellNum)) {
        ship.hit();
        output.textContent = ship.isSunk
          ? `Player sunk the ${ship.name}!`
          : `Player hit the ${ship.name} at ${cellNum}!`;
        hit = true;
        break;
      }
      if (!hit) {
        output.textContent = `Player missed! Block #${cellNum}`;
      }
    }
    enemyGameBoard.blocksHit.push(cellNum);
    return hit;
  }

  computerRetaliate() {
    let hit2 = false;
    setTimeout(() => {
      //then the ai attacks player board after 1 second
      const randomNum = gameboard.chooseBlock();
      // Get the cell that the computer attacked
      const attackedCell = cells[randomNum];
      for (const ship of shipArray) {
        if (ship.blocks.includes(randomNum)) {
          ship.hit();
          output.textContent = ship.isSunk
            ? `Computer sunk the ${ship.name}!`
            : `Computer hit the ${ship.name} at ${randomNum}!`;
          hit2 = true;
          attackedCell.textContent = 'X';
          attackedCell.style.backgroundColor = 'green';
          break;
        }
        if (!hit2) {
          output.textContent = `Computer missed! Block #${randomNum}`;
          attackedCell.style.backgroundColor = 'cyan';
        }
      }
      gameboard.blocksHit.push(randomNum);
      return hit2;
    }, 1000);
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

const gameboard = new Gameboard();
const enemyGameBoard = new Gameboard();

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
        gameboard.shipCount++;
      }
    });
  });
}

initializeGame();

function buildEnemyBoard() {
  createEnemyShipArray();
  const enemyBoardDiv = document.createElement('div');

  for (let i = 100; i < 200; i++) {
    const enemyCell = document.createElement('div');
    enemyCell.classList.add('enemyCell');
    enemyCell.setAttribute('id', i);
    enemyBoardDiv.appendChild(enemyCell);
    enemyCell.addEventListener('click', () => {
      const isHit = enemyGameBoard.attackComputer(i);
      enemyGameBoard.computerRetaliate();
      if (isHit) {
        enemyCell.style.backgroundColor = 'red';
        enemyCell.textContent = 'X';
      } else {
        enemyCell.style.backgroundColor = 'cyan';
      }

      if (enemyGameBoard.allSunk()) {
        output.textContent = 'You win!';
        return;
      }
    });
  }
  enemyBoardDiv.classList.add('playerBoard');
  boardContainer.appendChild(enemyBoardDiv);
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

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
    this.lastHit = null;
    this.hitDirection = 1; // 1 for right, -1 for left
    this.hitStreak = 0;
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

  //first, attack computer board
  attackComputer(cellNum) {
    let hit = false;
    let shipName = null;
    let isSunk = false;
    for (const ship of enemyShipArray) {
      if (ship.blocks.includes(cellNum)) {
        ship.hit();
        hit = true;
        shipName = ship.name;
        isSunk = ship.isSunk;
        break;
      }
    }
    this.blocksHit.push(cellNum);
    return { hit, shipName, isSunk };
  }

  computerRetaliate() {
    let hit = false;
    let shipName = null;
    let isSunk = false;
    let block;

    if (this.lastHit !== null) {
      block = this.lastHit + this.hitDirection;
      if (this.blocksHit.includes(block)) {
        this.hitDirection *= -1;
        block = this.lastHit + this.hitDirection;
      }
    } else {
      block = this.chooseBlock();
    }

    for (const ship of shipArray) {
      if (ship.blocks.includes(block)) {
        ship.hit();
        hit = true;
        shipName = ship.name;
        isSunk = ship.isSunk;
        this.lastHit = block;
        this.hitStreak++;
        break;
      }
    }

    if (!hit) {
      if (this.hitStreak > 1) {
        this.hitDirection *= -1;
        this.hitStreak = 1;
      } else {
        this.lastHit = null;
      }
    }

    this.blocksHit.push(block);
    return { hit, shipName, isSunk, block };
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
      //check if cell.id + ship.length - 1 = another row
      const shipRow = this.findRow(head);
      const shipEnd = greenCellNum + ship.length - 1;
      if (this.findRow(shipEnd) !== shipRow) {
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
    cell.addEventListener('mouseover', () => {
      if (gameboard.shipCount < 5) {
        const ship = shipArray[gameboard.shipCount];
        const head = Number(cell.id);
        const shipEnd = head + ship.length - 1;
        const shipRow = gameboard.findRow(head);
        if (gameboard.findRow(shipEnd) === shipRow) {
          for (let i = 0; i < ship.length; i++) {
            const block = document.getElementById(head + i);
            if (block) block.style.backgroundColor = '#9fff9c';
          }
        }
      }
    });

    cell.addEventListener('mouseout', () => {
      if (gameboard.shipCount < 5) {
        const ship = shipArray[gameboard.shipCount];
        const head = Number(cell.id);
        for (let i = 0; i < ship.length; i++) {
          const blockId = head + i;
          const block = document.getElementById(blockId);
          if (block) {
            // Check if a ship has been placed at the block
            const isOccupied = shipArray.some((ship) =>
              ship.blocks.includes(blockId)
            );
            if (!isOccupied) {
              block.style.backgroundColor = '';
            }
          }
        }
      }
    });

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

function updateDomAfterAttack(result, cell) {
  if (result.hit) {
    output.textContent = result.isSunk
      ? `Player sunk the ${result.shipName}!`
      : `Player hit the ${result.shipName} at ${cell.id}!`;
    cell.style.backgroundColor = 'red';
    cell.textContent = 'X';
  } else {
    output.textContent = `Player missed! Block #${cell.id}`;
    cell.style.backgroundColor = 'blue';
  }
}

function updateDomAfterComputerRetaliation(result, cells) {
  const attackedCell = cells[result.block];
  if (result.hit) {
    output.textContent = result.isSunk
      ? `Computer sunk the ${result.shipName}!`
      : `Computer hit the ${result.shipName} at ${result.block}!`;
    attackedCell.textContent = 'X';
    attackedCell.style.backgroundColor = 'green';
  } else {
    output.textContent = `Computer missed! Block #${result.block}`;
    attackedCell.style.backgroundColor = 'blue'; 
  }
}

function buildEnemyBoard() {
  createEnemyShipArray();
  const enemyBoardDiv = document.createElement('div');

  for (let i = 100; i < 200; i++) {
    const enemyCell = document.createElement('div');
    enemyCell.classList.add('enemyCell');
    enemyCell.setAttribute('id', i);
    enemyBoardDiv.appendChild(enemyCell);

    enemyCell.addEventListener('click', () => {
      const result = enemyGameBoard.attackComputer(i);
      updateDomAfterAttack(result, enemyCell);
      if (enemyGameBoard.allSunk()) {
        output.textContent = 'You win!';
        return;
      }
      setTimeout(() => {
        const retaliationResult = enemyGameBoard.computerRetaliate();
        updateDomAfterComputerRetaliation(retaliationResult, cells);
        if (gameboard.allSunk()) {
          output.textContent = 'Computer wins!';
          return;
        }
      }, 500);
    });
  }
  enemyBoardDiv.classList.add('playerBoard');
  boardContainer.appendChild(enemyBoardDiv);
}

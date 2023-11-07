import {
  shipArray,
  Ship,
  Carrier,
  Battleship,
  Cruiser,
  Submarine,
  Destroyer,
} from './ship';

class Gameboard {
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
  placeShip(x, y, ship) {
    // check if the ships coordinates would be out of bound
    const shipCoordinates = [];
    if (ship.direction === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        shipCoordinates.push(i + 10, y);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        shipCoordinates.push(x, i + 10);
      }
    }
    ship.x = x;
    ship.y = y;
    return shipCoordinates;
  }
}

class Player {
  constructor() {
    this.turn = false;
  }
  attack(x, y) {
    this.gameboard.receiveAttack(x, y);
  }
}

function createShipArray() {
  shipArray.push(new Carrier());
  shipArray.push(new Battleship());
  shipArray.push(new Cruiser());
  shipArray.push(new Submarine());
  shipArray.push(new Destroyer());
}

const cells = document.querySelectorAll('.cell');

function initializeGame() {
  createShipArray();
  const player = new Player();
  let shipCount = 0;

  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      placeShip(cell.x, cell.y, shipArray[shipCount]);
      for (const cell of shipCoordinates) {
        cell.x = shipCoordinates[0];
        cell.y = shipCoordinates[1];
      }
      cell.style.backgroundColor = 'green';
      shipCount++;
    });

    cell.addEventListener('mouseover', () => {
      shipArray[shipCount].x = cell.xvalue;
      cell.style.backgroundColor = 'green';
    });
  });

  /*
  if (shipCount = 5){
    create enemy board and ships
    let gameboard = new Gameboard();
    let computer = new Player(); } 
    */
}

initializeGame();

module.exports = {
  Carrier,
  Battleship,
  Cruiser,
  Submarine,
  Destroyer,
  shipArray,
  createShipArray,
};

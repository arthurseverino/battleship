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
    //place ship on gameboard
    ship.x = x;
    ship.y = y;
  }
}

class Player {
  constructor() {
    this.gameboard = new Gameboard();
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
cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    cell.classList.add('clicked');
  });
});

function initializeGame() {
  createShipArray();
  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      cell.classList.add('clicked');
      for (const ship of shipArray) {
        placeShip(cell.xvalue, cell.yvalue, ship);
      }
    });
  });
  /*
  if (5 ships are placed on board){
    create enemy board and ships
    let gameboard = new Gameboard();
    let player = new Player();
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

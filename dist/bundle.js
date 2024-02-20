/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Battleship: () => (/* binding */ Battleship),
/* harmony export */   Carrier: () => (/* binding */ Carrier),
/* harmony export */   Cruiser: () => (/* binding */ Cruiser),
/* harmony export */   Destroyer: () => (/* binding */ Destroyer),
/* harmony export */   Ship: () => (/* binding */ Ship),
/* harmony export */   Submarine: () => (/* binding */ Submarine),
/* harmony export */   createEnemyShipArray: () => (/* binding */ createEnemyShipArray),
/* harmony export */   createShipArray: () => (/* binding */ createShipArray),
/* harmony export */   enemyShipArray: () => (/* binding */ enemyShipArray),
/* harmony export */   shipArray: () => (/* binding */ shipArray)
/* harmony export */ });
const shipArray = [];
const enemyShipArray = [];

class Ship {
  constructor() {
    this.blocks = [];
    this.hits = 0;
    this.isSunk = false;
    this.direction = 'horizontal';
  }
  hit() {
    this.hits += 1;
    if (this.hits === this.length) {
      this.isSunk = true;
    }
  }
}

class Carrier extends Ship {
  constructor() {
    super();
    this.length = 5;
    this.name = 'Carrier';
  }
}

class Battleship extends Ship {
  constructor() {
    super();
    this.length = 4;
    this.name = 'Battleship';
  }
}

class Cruiser extends Ship {
  constructor() {
    super();
    this.length = 3;
    this.name = 'Cruiser';
  }
}

class Submarine extends Ship {
  constructor() {
    super();
    this.length = 3;
    this.name = 'Submarine';
  }
}

class Destroyer extends Ship {
  constructor() {
    super();
    this.length = 2;
    this.name = 'Destroyer';
  }
}

function createShipArray() {
  shipArray.push(new Carrier());
  shipArray.push(new Battleship());
  shipArray.push(new Cruiser());
  shipArray.push(new Submarine());
  shipArray.push(new Destroyer());
}

function createEnemyShipArray() {
  const enemyCarrier = new Carrier();
  enemyCarrier.blocks.push(105, 106, 107, 108, 109);

  const enemyBattleship = new Battleship();
  enemyBattleship.blocks.push(122, 123, 124, 125);

  const enemyCruiser = new Cruiser();
  enemyCruiser.blocks.push(184, 185, 186);

  const enemySubmarine = new Submarine();
  enemySubmarine.blocks.push(145, 146, 147);

  const enemyDestroyer = new Destroyer();
  enemyDestroyer.blocks.push(161, 162);

  enemyShipArray.push(enemyCarrier);
  enemyShipArray.push(enemyBattleship);
  enemyShipArray.push(enemyCruiser);
  enemyShipArray.push(enemySubmarine);
  enemyShipArray.push(enemyDestroyer);
}

function getRandomNumber() {
  // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // Scale and shift the random decimal to get a number between 100 and 199
  const randomNumber = Math.floor(randomDecimal * 100) + 100;

  return randomNumber;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");


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
    for (const ship of _ship__WEBPACK_IMPORTED_MODULE_0__.enemyShipArray) {
      if (!ship.isSunk) return false;
    }
    return true;
  }

  //first, attack computer board
  attackComputer(cellNum) {
    let hit = false;
    let shipName = null;
    let isSunk = false;
    for (const ship of _ship__WEBPACK_IMPORTED_MODULE_0__.enemyShipArray) {
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

    for (const ship of _ship__WEBPACK_IMPORTED_MODULE_0__.shipArray) {
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
      for (const ship of _ship__WEBPACK_IMPORTED_MODULE_0__.shipArray) {
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
      if (_ship__WEBPACK_IMPORTED_MODULE_0__.shipArray[this.shipCount].blocks.includes(Number(cell.id))) {
        cell.style.backgroundColor = '#9fff9c';
      }
    });
    this.shipCount++;
  }
}

const gameboard = new Gameboard();
const enemyGameBoard = new Gameboard();

function initializeGame() {
  (0,_ship__WEBPACK_IMPORTED_MODULE_0__.createShipArray)();
  cells.forEach((cell) => {
    cell.addEventListener('mouseover', () => {
      if (gameboard.shipCount < 5) {
        const ship = _ship__WEBPACK_IMPORTED_MODULE_0__.shipArray[gameboard.shipCount];
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
        const ship = _ship__WEBPACK_IMPORTED_MODULE_0__.shipArray[gameboard.shipCount];
        const head = Number(cell.id);
        for (let i = 0; i < ship.length; i++) {
          const blockId = head + i;
          const block = document.getElementById(blockId);
          if (block) {
            // Check if a ship has been placed at the block
            const isOccupied = _ship__WEBPACK_IMPORTED_MODULE_0__.shipArray.some((ship) =>
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
        gameboard.placeShip(Number(cell.id), _ship__WEBPACK_IMPORTED_MODULE_0__.shipArray[gameboard.shipCount]);
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
  (0,_ship__WEBPACK_IMPORTED_MODULE_0__.createEnemyShipArray)();
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxxQkFBcUIsNENBQVM7QUFDOUI7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDRDQUFTO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSw2Q0FBNkMsNENBQVM7QUFDdEQ7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnQkFBZ0I7QUFDM0MsMEJBQTBCLGlCQUFpQixLQUFLLFFBQVE7QUFDeEQ7QUFDQTtBQUNBLElBQUk7QUFDSixrREFBa0QsUUFBUTtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsZ0JBQWdCO0FBQzdDLDRCQUE0QixpQkFBaUIsS0FBSyxhQUFhO0FBQy9EO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0RBQW9ELGFBQWE7QUFDakU7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRSwyREFBb0I7QUFDdEI7O0FBRUEsb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHNoaXBBcnJheSA9IFtdO1xuZXhwb3J0IGNvbnN0IGVuZW15U2hpcEFycmF5ID0gW107XG5cbmV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ibG9ja3MgPSBbXTtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICAgIHRoaXMuaXNTdW5rID0gZmFsc2U7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICAgIGlmICh0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmlzU3VuayA9IHRydWU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYXJyaWVyIGV4dGVuZHMgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5sZW5ndGggPSA1O1xuICAgIHRoaXMubmFtZSA9ICdDYXJyaWVyJztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmF0dGxlc2hpcCBleHRlbmRzIFNoaXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubGVuZ3RoID0gNDtcbiAgICB0aGlzLm5hbWUgPSAnQmF0dGxlc2hpcCc7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENydWlzZXIgZXh0ZW5kcyBTaGlwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmxlbmd0aCA9IDM7XG4gICAgdGhpcy5uYW1lID0gJ0NydWlzZXInO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdWJtYXJpbmUgZXh0ZW5kcyBTaGlwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmxlbmd0aCA9IDM7XG4gICAgdGhpcy5uYW1lID0gJ1N1Ym1hcmluZSc7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERlc3Ryb3llciBleHRlbmRzIFNoaXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubGVuZ3RoID0gMjtcbiAgICB0aGlzLm5hbWUgPSAnRGVzdHJveWVyJztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hpcEFycmF5KCkge1xuICBzaGlwQXJyYXkucHVzaChuZXcgQ2FycmllcigpKTtcbiAgc2hpcEFycmF5LnB1c2gobmV3IEJhdHRsZXNoaXAoKSk7XG4gIHNoaXBBcnJheS5wdXNoKG5ldyBDcnVpc2VyKCkpO1xuICBzaGlwQXJyYXkucHVzaChuZXcgU3VibWFyaW5lKCkpO1xuICBzaGlwQXJyYXkucHVzaChuZXcgRGVzdHJveWVyKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRW5lbXlTaGlwQXJyYXkoKSB7XG4gIGNvbnN0IGVuZW15Q2FycmllciA9IG5ldyBDYXJyaWVyKCk7XG4gIGVuZW15Q2Fycmllci5ibG9ja3MucHVzaCgxMDUsIDEwNiwgMTA3LCAxMDgsIDEwOSk7XG5cbiAgY29uc3QgZW5lbXlCYXR0bGVzaGlwID0gbmV3IEJhdHRsZXNoaXAoKTtcbiAgZW5lbXlCYXR0bGVzaGlwLmJsb2Nrcy5wdXNoKDEyMiwgMTIzLCAxMjQsIDEyNSk7XG5cbiAgY29uc3QgZW5lbXlDcnVpc2VyID0gbmV3IENydWlzZXIoKTtcbiAgZW5lbXlDcnVpc2VyLmJsb2Nrcy5wdXNoKDE4NCwgMTg1LCAxODYpO1xuXG4gIGNvbnN0IGVuZW15U3VibWFyaW5lID0gbmV3IFN1Ym1hcmluZSgpO1xuICBlbmVteVN1Ym1hcmluZS5ibG9ja3MucHVzaCgxNDUsIDE0NiwgMTQ3KTtcblxuICBjb25zdCBlbmVteURlc3Ryb3llciA9IG5ldyBEZXN0cm95ZXIoKTtcbiAgZW5lbXlEZXN0cm95ZXIuYmxvY2tzLnB1c2goMTYxLCAxNjIpO1xuXG4gIGVuZW15U2hpcEFycmF5LnB1c2goZW5lbXlDYXJyaWVyKTtcbiAgZW5lbXlTaGlwQXJyYXkucHVzaChlbmVteUJhdHRsZXNoaXApO1xuICBlbmVteVNoaXBBcnJheS5wdXNoKGVuZW15Q3J1aXNlcik7XG4gIGVuZW15U2hpcEFycmF5LnB1c2goZW5lbXlTdWJtYXJpbmUpO1xuICBlbmVteVNoaXBBcnJheS5wdXNoKGVuZW15RGVzdHJveWVyKTtcbn1cblxuZnVuY3Rpb24gZ2V0UmFuZG9tTnVtYmVyKCkge1xuICAvLyBHZW5lcmF0ZSBhIHJhbmRvbSBkZWNpbWFsIGJldHdlZW4gMCAoaW5jbHVzaXZlKSBhbmQgMSAoZXhjbHVzaXZlKVxuICBjb25zdCByYW5kb21EZWNpbWFsID0gTWF0aC5yYW5kb20oKTtcblxuICAvLyBTY2FsZSBhbmQgc2hpZnQgdGhlIHJhbmRvbSBkZWNpbWFsIHRvIGdldCBhIG51bWJlciBiZXR3ZWVuIDEwMCBhbmQgMTk5XG4gIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IocmFuZG9tRGVjaW1hbCAqIDEwMCkgKyAxMDA7XG5cbiAgcmV0dXJuIHJhbmRvbU51bWJlcjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgc2hpcEFycmF5LFxuICBjcmVhdGVTaGlwQXJyYXksXG4gIGNyZWF0ZUVuZW15U2hpcEFycmF5LFxuICBlbmVteVNoaXBBcnJheSxcbn0gZnJvbSAnLi9zaGlwJztcblxuY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuY29uc3QgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYm9hcmRDb250YWluZXInKTtcbmNvbnN0IG91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvdXRwdXQnKTtcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zaGlwQ291bnQgPSAwO1xuICAgIHRoaXMuYmxvY2tzSGl0ID0gW107XG4gICAgdGhpcy5sYXN0SGl0ID0gbnVsbDtcbiAgICB0aGlzLmhpdERpcmVjdGlvbiA9IDE7IC8vIDEgZm9yIHJpZ2h0LCAtMSBmb3IgbGVmdFxuICAgIHRoaXMuaGl0U3RyZWFrID0gMDtcbiAgfVxuXG4gIC8vcmV0dXJucyBhIG51bSBiZXR3ZWVuIDAgYW5kIDk5IHRoYXQgaGFzIG5vdCBiZWVuIGhpdCB5ZXRcbiAgY2hvb3NlQmxvY2soKSB7XG4gICAgbGV0IGJsb2NrID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcbiAgICB3aGlsZSAodGhpcy5ibG9ja3NIaXQuaW5jbHVkZXMoYmxvY2spKSB7XG4gICAgICBibG9jayA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgfVxuICAgIHJldHVybiBibG9jaztcbiAgfVxuXG4gIGFsbFN1bmsoKSB7XG4gICAgZm9yIChjb25zdCBzaGlwIG9mIGVuZW15U2hpcEFycmF5KSB7XG4gICAgICBpZiAoIXNoaXAuaXNTdW5rKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy9maXJzdCwgYXR0YWNrIGNvbXB1dGVyIGJvYXJkXG4gIGF0dGFja0NvbXB1dGVyKGNlbGxOdW0pIHtcbiAgICBsZXQgaGl0ID0gZmFsc2U7XG4gICAgbGV0IHNoaXBOYW1lID0gbnVsbDtcbiAgICBsZXQgaXNTdW5rID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBzaGlwIG9mIGVuZW15U2hpcEFycmF5KSB7XG4gICAgICBpZiAoc2hpcC5ibG9ja3MuaW5jbHVkZXMoY2VsbE51bSkpIHtcbiAgICAgICAgc2hpcC5oaXQoKTtcbiAgICAgICAgaGl0ID0gdHJ1ZTtcbiAgICAgICAgc2hpcE5hbWUgPSBzaGlwLm5hbWU7XG4gICAgICAgIGlzU3VuayA9IHNoaXAuaXNTdW5rO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5ibG9ja3NIaXQucHVzaChjZWxsTnVtKTtcbiAgICByZXR1cm4geyBoaXQsIHNoaXBOYW1lLCBpc1N1bmsgfTtcbiAgfVxuXG4gIGNvbXB1dGVyUmV0YWxpYXRlKCkge1xuICAgIGxldCBoaXQgPSBmYWxzZTtcbiAgICBsZXQgc2hpcE5hbWUgPSBudWxsO1xuICAgIGxldCBpc1N1bmsgPSBmYWxzZTtcbiAgICBsZXQgYmxvY2s7XG5cbiAgICBpZiAodGhpcy5sYXN0SGl0ICE9PSBudWxsKSB7XG4gICAgICBibG9jayA9IHRoaXMubGFzdEhpdCArIHRoaXMuaGl0RGlyZWN0aW9uO1xuICAgICAgaWYgKHRoaXMuYmxvY2tzSGl0LmluY2x1ZGVzKGJsb2NrKSkge1xuICAgICAgICB0aGlzLmhpdERpcmVjdGlvbiAqPSAtMTtcbiAgICAgICAgYmxvY2sgPSB0aGlzLmxhc3RIaXQgKyB0aGlzLmhpdERpcmVjdGlvbjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYmxvY2sgPSB0aGlzLmNob29zZUJsb2NrKCk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBzaGlwIG9mIHNoaXBBcnJheSkge1xuICAgICAgaWYgKHNoaXAuYmxvY2tzLmluY2x1ZGVzKGJsb2NrKSkge1xuICAgICAgICBzaGlwLmhpdCgpO1xuICAgICAgICBoaXQgPSB0cnVlO1xuICAgICAgICBzaGlwTmFtZSA9IHNoaXAubmFtZTtcbiAgICAgICAgaXNTdW5rID0gc2hpcC5pc1N1bms7XG4gICAgICAgIHRoaXMubGFzdEhpdCA9IGJsb2NrO1xuICAgICAgICB0aGlzLmhpdFN0cmVhaysrO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWhpdCkge1xuICAgICAgaWYgKHRoaXMuaGl0U3RyZWFrID4gMSkge1xuICAgICAgICB0aGlzLmhpdERpcmVjdGlvbiAqPSAtMTtcbiAgICAgICAgdGhpcy5oaXRTdHJlYWsgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sYXN0SGl0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmJsb2Nrc0hpdC5wdXNoKGJsb2NrKTtcbiAgICByZXR1cm4geyBoaXQsIHNoaXBOYW1lLCBpc1N1bmssIGJsb2NrIH07XG4gIH1cbiAgZmluZFJvdyhoZWFkKSB7XG4gICAgbGV0IHJvdyA9IDA7XG4gICAgaWYgKGhlYWQgPCAxMCkge1xuICAgICAgcm93ID0gMDtcbiAgICB9IGVsc2UgaWYgKGhlYWQgPCAyMCkge1xuICAgICAgcm93ID0gMTtcbiAgICB9IGVsc2UgaWYgKGhlYWQgPCAzMCkge1xuICAgICAgcm93ID0gMjtcbiAgICB9IGVsc2UgaWYgKGhlYWQgPCA0MCkge1xuICAgICAgcm93ID0gMztcbiAgICB9IGVsc2UgaWYgKGhlYWQgPCA1MCkge1xuICAgICAgcm93ID0gNDtcbiAgICB9IGVsc2UgaWYgKGhlYWQgPCA2MCkge1xuICAgICAgcm93ID0gNTtcbiAgICB9IGVsc2UgaWYgKGhlYWQgPCA3MCkge1xuICAgICAgcm93ID0gNjtcbiAgICB9IGVsc2UgaWYgKGhlYWQgPCA4MCkge1xuICAgICAgcm93ID0gNztcbiAgICB9IGVsc2UgaWYgKGhlYWQgPCA5MCkge1xuICAgICAgcm93ID0gODtcbiAgICB9IGVsc2UgaWYgKGhlYWQgPCAxMDApIHtcbiAgICAgIHJvdyA9IDk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdpbnZhbGlkIHJvdycpO1xuICAgIH1cbiAgICByZXR1cm4gcm93O1xuICB9XG5cbiAgcGxhY2VTaGlwKGhlYWQsIHNoaXApIHtcbiAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgbGV0IGdyZWVuQ2VsbE51bSA9IGhlYWQ7XG5cbiAgICAgIC8vY2hlY2sgaWYgY2VsbCBpcyBhbHJlYWR5IGluIGFub3RoZXIgc2hpcCdzIGJsb2Nrc1xuICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHNoaXBBcnJheSkge1xuICAgICAgICBmb3IgKGNvbnN0IGJsb2NrIG9mIHNoaXAuYmxvY2tzKSB7XG4gICAgICAgICAgaWYgKGJsb2NrID09PSBncmVlbkNlbGxOdW0pIHtcbiAgICAgICAgICAgIG91dHB1dC50ZXh0Q29udGVudCA9ICdBIFNoaXAgaXMgYWxyZWFkeSBvY2N1cHlpbmcgdGhpcyBzcGFjZSc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL2NoZWNrIGlmIGNlbGwuaWQgKyBzaGlwLmxlbmd0aCAtIDEgPSBhbm90aGVyIHJvd1xuICAgICAgY29uc3Qgc2hpcFJvdyA9IHRoaXMuZmluZFJvdyhoZWFkKTtcbiAgICAgIGNvbnN0IHNoaXBFbmQgPSBncmVlbkNlbGxOdW0gKyBzaGlwLmxlbmd0aCAtIDE7XG4gICAgICBpZiAodGhpcy5maW5kUm93KHNoaXBFbmQpICE9PSBzaGlwUm93KSB7XG4gICAgICAgIG91dHB1dC50ZXh0Q29udGVudCA9ICdTaGlwIGlzIG91dCBvZiBib3VuZHMnO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBzaGlwLmJsb2Nrcy5wdXNoKGdyZWVuQ2VsbE51bSk7XG4gICAgICAgIGdyZWVuQ2VsbE51bSsrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2hpcC5ibG9ja3MucHVzaChncmVlbkNlbGxOdW0pO1xuICAgICAgICBncmVlbkNlbGxOdW0gKz0gMTA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNoaXAubmFtZSA9PT0gJ0Rlc3Ryb3llcicpIHtcbiAgICAgIGJ1aWxkRW5lbXlCb2FyZCgpO1xuICAgIH1cblxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIC8vaWYgdGhlIHNoaXBzIGJsb2NrcyBjb250YWlucyB0aGUgbnVtYmVyIHRoYXQgd2FzIGNsaWNrZWRcbiAgICAgIGlmIChzaGlwQXJyYXlbdGhpcy5zaGlwQ291bnRdLmJsb2Nrcy5pbmNsdWRlcyhOdW1iZXIoY2VsbC5pZCkpKSB7XG4gICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM5ZmZmOWMnO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc2hpcENvdW50Kys7XG4gIH1cbn1cblxuY29uc3QgZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuY29uc3QgZW5lbXlHYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVHYW1lKCkge1xuICBjcmVhdGVTaGlwQXJyYXkoKTtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgaWYgKGdhbWVib2FyZC5zaGlwQ291bnQgPCA1KSB7XG4gICAgICAgIGNvbnN0IHNoaXAgPSBzaGlwQXJyYXlbZ2FtZWJvYXJkLnNoaXBDb3VudF07XG4gICAgICAgIGNvbnN0IGhlYWQgPSBOdW1iZXIoY2VsbC5pZCk7XG4gICAgICAgIGNvbnN0IHNoaXBFbmQgPSBoZWFkICsgc2hpcC5sZW5ndGggLSAxO1xuICAgICAgICBjb25zdCBzaGlwUm93ID0gZ2FtZWJvYXJkLmZpbmRSb3coaGVhZCk7XG4gICAgICAgIGlmIChnYW1lYm9hcmQuZmluZFJvdyhzaGlwRW5kKSA9PT0gc2hpcFJvdykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoZWFkICsgaSk7XG4gICAgICAgICAgICBpZiAoYmxvY2spIGJsb2NrLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjOWZmZjljJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICBpZiAoZ2FtZWJvYXJkLnNoaXBDb3VudCA8IDUpIHtcbiAgICAgICAgY29uc3Qgc2hpcCA9IHNoaXBBcnJheVtnYW1lYm9hcmQuc2hpcENvdW50XTtcbiAgICAgICAgY29uc3QgaGVhZCA9IE51bWJlcihjZWxsLmlkKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgYmxvY2tJZCA9IGhlYWQgKyBpO1xuICAgICAgICAgIGNvbnN0IGJsb2NrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYmxvY2tJZCk7XG4gICAgICAgICAgaWYgKGJsb2NrKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiBhIHNoaXAgaGFzIGJlZW4gcGxhY2VkIGF0IHRoZSBibG9ja1xuICAgICAgICAgICAgY29uc3QgaXNPY2N1cGllZCA9IHNoaXBBcnJheS5zb21lKChzaGlwKSA9PlxuICAgICAgICAgICAgICBzaGlwLmJsb2Nrcy5pbmNsdWRlcyhibG9ja0lkKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICghaXNPY2N1cGllZCkge1xuICAgICAgICAgICAgICBibG9jay5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAoZ2FtZWJvYXJkLnNoaXBDb3VudCA8IDUpIHtcbiAgICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChOdW1iZXIoY2VsbC5pZCksIHNoaXBBcnJheVtnYW1lYm9hcmQuc2hpcENvdW50XSk7XG4gICAgICAgIG91dHB1dC50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyIHNoaXBzLiAke1xuICAgICAgICAgIDUgLSBnYW1lYm9hcmQuc2hpcENvdW50XG4gICAgICAgIH0gcmVtYWluaW5nYDtcbiAgICAgIH1cbiAgICAgIGlmIChnYW1lYm9hcmQuc2hpcENvdW50ID09PSA1KSB7XG4gICAgICAgIG91dHB1dC50ZXh0Q29udGVudCA9XG4gICAgICAgICAgJ0FsbCBzaGlwcyBwbGFjZWQhIENsaWNrIG9uIHRoZSBlbmVteSBib2FyZCB0byBhdHRhY2shISAnO1xuICAgICAgICBnYW1lYm9hcmQuc2hpcENvdW50Kys7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5pbml0aWFsaXplR2FtZSgpO1xuXG5mdW5jdGlvbiB1cGRhdGVEb21BZnRlckF0dGFjayhyZXN1bHQsIGNlbGwpIHtcbiAgaWYgKHJlc3VsdC5oaXQpIHtcbiAgICBvdXRwdXQudGV4dENvbnRlbnQgPSByZXN1bHQuaXNTdW5rXG4gICAgICA/IGBQbGF5ZXIgc3VuayB0aGUgJHtyZXN1bHQuc2hpcE5hbWV9IWBcbiAgICAgIDogYFBsYXllciBoaXQgdGhlICR7cmVzdWx0LnNoaXBOYW1lfSBhdCAke2NlbGwuaWR9IWA7XG4gICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICBjZWxsLnRleHRDb250ZW50ID0gJ1gnO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dC50ZXh0Q29udGVudCA9IGBQbGF5ZXIgbWlzc2VkISBCbG9jayAjJHtjZWxsLmlkfWA7XG4gICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSc7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlRG9tQWZ0ZXJDb21wdXRlclJldGFsaWF0aW9uKHJlc3VsdCwgY2VsbHMpIHtcbiAgY29uc3QgYXR0YWNrZWRDZWxsID0gY2VsbHNbcmVzdWx0LmJsb2NrXTtcbiAgaWYgKHJlc3VsdC5oaXQpIHtcbiAgICBvdXRwdXQudGV4dENvbnRlbnQgPSByZXN1bHQuaXNTdW5rXG4gICAgICA/IGBDb21wdXRlciBzdW5rIHRoZSAke3Jlc3VsdC5zaGlwTmFtZX0hYFxuICAgICAgOiBgQ29tcHV0ZXIgaGl0IHRoZSAke3Jlc3VsdC5zaGlwTmFtZX0gYXQgJHtyZXN1bHQuYmxvY2t9IWA7XG4gICAgYXR0YWNrZWRDZWxsLnRleHRDb250ZW50ID0gJ1gnO1xuICAgIGF0dGFja2VkQ2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JlZW4nO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dC50ZXh0Q29udGVudCA9IGBDb21wdXRlciBtaXNzZWQhIEJsb2NrICMke3Jlc3VsdC5ibG9ja31gO1xuICAgIGF0dGFja2VkQ2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSc7IFxuICB9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRW5lbXlCb2FyZCgpIHtcbiAgY3JlYXRlRW5lbXlTaGlwQXJyYXkoKTtcbiAgY29uc3QgZW5lbXlCb2FyZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIGZvciAobGV0IGkgPSAxMDA7IGkgPCAyMDA7IGkrKykge1xuICAgIGNvbnN0IGVuZW15Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15Q2VsbC5jbGFzc0xpc3QuYWRkKCdlbmVteUNlbGwnKTtcbiAgICBlbmVteUNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGkpO1xuICAgIGVuZW15Qm9hcmREaXYuYXBwZW5kQ2hpbGQoZW5lbXlDZWxsKTtcblxuICAgIGVuZW15Q2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGVuZW15R2FtZUJvYXJkLmF0dGFja0NvbXB1dGVyKGkpO1xuICAgICAgdXBkYXRlRG9tQWZ0ZXJBdHRhY2socmVzdWx0LCBlbmVteUNlbGwpO1xuICAgICAgaWYgKGVuZW15R2FtZUJvYXJkLmFsbFN1bmsoKSkge1xuICAgICAgICBvdXRwdXQudGV4dENvbnRlbnQgPSAnWW91IHdpbiEnO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgcmV0YWxpYXRpb25SZXN1bHQgPSBlbmVteUdhbWVCb2FyZC5jb21wdXRlclJldGFsaWF0ZSgpO1xuICAgICAgICB1cGRhdGVEb21BZnRlckNvbXB1dGVyUmV0YWxpYXRpb24ocmV0YWxpYXRpb25SZXN1bHQsIGNlbGxzKTtcbiAgICAgICAgaWYgKGdhbWVib2FyZC5hbGxTdW5rKCkpIHtcbiAgICAgICAgICBvdXRwdXQudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXIgd2lucyEnO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSwgNTAwKTtcbiAgICB9KTtcbiAgfVxuICBlbmVteUJvYXJkRGl2LmNsYXNzTGlzdC5hZGQoJ3BsYXllckJvYXJkJyk7XG4gIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15Qm9hcmREaXYpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
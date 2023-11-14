export const shipArray = [];
export const enemyShipArray = [];

export class Ship {
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

export class Carrier extends Ship {
  constructor() {
    super();
    this.length = 5;
    this.name = 'Carrier';
  }
}

export class Battleship extends Ship {
  constructor() {
    super();
    this.length = 4;
    this.name = 'Battleship';
  }
}

export class Cruiser extends Ship {
  constructor() {
    super();
    this.length = 3;
    this.name = 'Cruiser';
  }
}

export class Submarine extends Ship {
  constructor() {
    super();
    this.length = 3;
    this.name = 'Submarine';
  }
}

export class Destroyer extends Ship {
  constructor() {
    super();
    this.length = 2;
    this.name = 'Destroyer';
  }
}

export function createShipArray() {
  shipArray.push(new Carrier());
  shipArray.push(new Battleship());
  shipArray.push(new Cruiser());
  shipArray.push(new Submarine());
  shipArray.push(new Destroyer());
}

export function createEnemyShipArray() {
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

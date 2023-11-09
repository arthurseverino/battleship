export const shipArray = [];

export class Ship {
  constructor() {
    this.hits = 0;
    this.isSunk = false;
    this.direction = 'horizontal';
    this.blocks = [];
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


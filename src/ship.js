export const shipArray = [];

export class Ship {
  constructor() {
    this.hits = 0;
    this.isSunk = false;
    this.x = 0;
    this.y = 0;
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
  }
}

export class Battleship extends Ship {
  constructor() {
    super();
    this.length = 4;
  }
}

export class Cruiser extends Ship {
  constructor() {
    super();
    this.length = 3;
  }
}

export class Submarine extends Ship {
  constructor() {
    super();
    this.length = 3;
  }
}

export class Destroyer extends Ship {
  constructor() {
    super();
    this.length = 2;
  }
}
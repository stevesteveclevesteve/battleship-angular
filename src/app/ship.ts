import { Shot } from './shot';

export class Ship {
  ShipCoordinates: Shot[];
  IsSunk: boolean;
  Name: string;
  HorizontalLayout: boolean;

  constructor(name: string, length: number, initialX: number, initialY: number, horizontalLayout: boolean) {
    this.Name = name;
    this.IsSunk = false;
    this.ShipCoordinates = [];
    this.HorizontalLayout = horizontalLayout;
    for (let i = 0; i < length; i++) {
      var newShot: Shot = {
        x: (horizontalLayout ? initialX + i : initialX),
        y: (horizontalLayout ? initialY : initialY + i),
        hit: false
      }
      this.ShipCoordinates[i] = newShot;
    }
  }
}

export class Submarine extends Ship {
  constructor(initialX: number, initialY: number, horizontalLayout: boolean) {
    super("Submarine", 3, initialX, initialY, horizontalLayout);
  }
}

export class Destroyer extends Ship {
  constructor(initialX: number, initialY: number, horizontalLayout: boolean) {
    super("Destroyer", 2, initialX, initialY, horizontalLayout);
  }
}

export class Cruiser extends Ship {
  constructor(initialX: number, initialY: number, horizontalLayout: boolean) {
    super("Cruiser", 3, initialX, initialY, horizontalLayout);
  }
}

export class Battleship extends Ship {
  constructor(initialX: number, initialY: number, horizontalLayout: boolean) {
    super("Battleship", 4, initialX, initialY, horizontalLayout);
  }
}

export class Carrier extends Ship {
  constructor(initialX: number, initialY: number, horizontalLayout: boolean) {
    super("Carrier", 5, initialX, initialY, horizontalLayout);
  }
}

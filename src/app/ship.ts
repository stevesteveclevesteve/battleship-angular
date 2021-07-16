import { Shot } from './shot';

export class Ship {
  ShipCoordinates: Shot[];
  IsSunk: boolean;
  Name: string;
  HorizontalLayout: boolean;
  Length: number;

  constructor(name: string, length: number, initialX: number, initialY: number, horizontalLayout: boolean) {
    this.Name = name;
    this.Length = length;
    this.IsSunk = false;
    this.HorizontalLayout = horizontalLayout;
    this.ShipCoordinates = this.FillShipCoordinates(initialX, initialY, horizontalLayout);
  }

  FillShipCoordinates(initialX: number, initialY: number, horizontalLayout: boolean): Shot[] {
    var shipCoordinates = [];
    for (let i = 0; i < this.Length; i++) {
      var newShot: Shot = {
        x: (horizontalLayout ? initialX + i : initialX),
        y: (horizontalLayout ? initialY : initialY + i),
        hit: false
      }
      shipCoordinates[i] = newShot;
    }

    return shipCoordinates;
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

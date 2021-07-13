import { Shot } from '../shot';
import { Battleship, Carrier, Cruiser, Destroyer, Ship, Submarine } from '../ship';
import { Component, OnInit } from '@angular/core';

@Component({
  template: ''
})

export abstract class BaseGrid implements OnInit {
  SeaGrid: (boolean | undefined)[][];
  SunkenEnemyShips: [];
  ShotsFired: Shot[];
  MyShips: Ship[]

  constructor() {
    this.SeaGrid = [];
    this.SunkenEnemyShips = [];
    this.ShotsFired = [];
    this.MyShips = [];

    for (let i = 0; i < 9; i++) {
      this.SeaGrid[i] = [];
      for (let j = 0; j < 9; j++) {
        this.SeaGrid[i][j] = undefined;
      }
    }
  }

  ngOnInit() {

  }

  AddShipToMyShips(name: string, initialX: number, initialY: number, horizontalLayout: boolean) {
    var existingShipOfNameTypeIndex: number = this.MyShips.findIndex(x => x.Name === name);

    if (existingShipOfNameTypeIndex > -1) {
      this.MyShips.splice(existingShipOfNameTypeIndex, 1);
    }

    switch (name) {
      case "Submarine": {
        var newSub: Submarine = new Submarine(initialX, initialY, horizontalLayout);
        this.MyShips.push(newSub);
        break;
      }
      case "Destroyer": {
        var newDestroyer: Destroyer = new Destroyer(initialX, initialY, horizontalLayout);
        this.MyShips.push(newDestroyer);
        break;
      }
      case "Cruiser": {
        var newCruiser: Cruiser = new Cruiser(initialX, initialY, horizontalLayout);
        this.MyShips.push(newCruiser);
        break;
      }
      case "Battleship": {
        var newBattleship: Battleship = new Battleship(initialX, initialY, horizontalLayout);
        this.MyShips.push(newBattleship);
        break;
      }
      case "Carrier": {
        var newCarrier: Carrier = new Carrier(initialX, initialY, horizontalLayout);
        this.MyShips.push(newCarrier);
        break;
      }
    }
  }
}

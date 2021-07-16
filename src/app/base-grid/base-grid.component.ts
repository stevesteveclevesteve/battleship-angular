import { Shot } from '../shot';
import { Battleship, Carrier, Cruiser, Destroyer, Ship, Submarine } from '../ship';
import { Component, OnInit } from '@angular/core';
import { RandomService } from '../random.service';
import { IntersectionService } from '../intersection.service';

@Component({
  template: ''
})

export abstract class BaseGrid implements OnInit {
  SeaGrid: (boolean | undefined)[][];
  SunkenEnemyShips: [];
  ShotsFired: Shot[];
  MyShips: Ship[]

  constructor(public randomService: RandomService, public intersectionService: IntersectionService) {
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

  GenerateRandomPlacementOfShips() {
    var carrier = new Carrier(0, 0, false);
    this.RandomlyPlaceShip(carrier);

    var battleship = new Battleship(0, 0, false);
    this.RandomlyPlaceShip(battleship);

    var cruiser = new Cruiser(0, 0, false);
    this.RandomlyPlaceShip(cruiser);

    var submarine = new Submarine(0, 0, false);
    this.RandomlyPlaceShip(submarine);

    var destroyer = new Destroyer(0, 0, false);
    this.RandomlyPlaceShip(destroyer);
  }

  RandomlyPlaceShip(newShip: Ship) {
    var isInvalidPosition = true;
    while (isInvalidPosition) {
      newShip.ShipCoordinates = this.GetRandomPosition(newShip);
      isInvalidPosition = this.PlacementIsInvalid(newShip);
    }
    this.MyShips.push(newShip);
  }

  GetRandomPosition(shipToSet: Ship): Shot[] {
    shipToSet.HorizontalLayout = this.randomService.GetRandomInt(2) === 1 ? true : false;
    console.log(shipToSet.Name + ' ' + shipToSet.HorizontalLayout);
    var firstPointLong = this.randomService.GetRandomInt(9 - shipToSet.Length);
    var firstPointShort = this.randomService.GetRandomInt(9);

    return shipToSet.FillShipCoordinates(shipToSet.HorizontalLayout ? firstPointLong : firstPointShort, shipToSet.HorizontalLayout ? firstPointShort : firstPointLong, shipToSet.HorizontalLayout);
  }

  PlacementIsInvalid(shipToCheck: Ship): boolean {
    for (var k = 0; k < shipToCheck.Length; k++) {
      console.log('x: ' + shipToCheck.ShipCoordinates[k].x + '  y: ' + shipToCheck.ShipCoordinates[k].y);
      if (shipToCheck.ShipCoordinates[k].x > 8 || shipToCheck.ShipCoordinates[k].y > 8)
        return true;
    }

    for (var i = 0; i < this.MyShips.length; i++) {
      for (var j = 0; j < shipToCheck.ShipCoordinates.length; j++)
        if (this.intersectionService.ShotContainedInShotArray(shipToCheck.ShipCoordinates[j], this.MyShips[i].ShipCoordinates))
          return true;
    }

    return false;
  }

  // Below method is not currently called.  Plan is to allow for custom placement of ships at start of game for my-grid if selected.

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

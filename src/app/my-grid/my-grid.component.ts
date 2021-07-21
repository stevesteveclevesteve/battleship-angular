import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { BaseGrid } from '../base-grid/base-grid.component';
import { IntersectionService } from '../intersection.service';
import { RandomService } from '../random.service';
import { Shot } from '../shot';

@Component({
  selector: 'display-my-grid',
  templateUrl: './my-grid.component.html',
  styleUrls: ['./my-grid.component.css']
})

export class MyGrid extends BaseGrid implements OnInit {
  ShipToDisplay: string | undefined;
  RotateShipToDisplay: boolean;
  ShipImage: string;

  constructor(public randomService: RandomService, public intersectionService: IntersectionService) {
    super(randomService, intersectionService);
    this.ShipToDisplay = undefined;
    this.RotateShipToDisplay = false;
    this.ShipImage = "";

  }

  ngOnInit() {
    super.GenerateRandomPlacementOfShips();
  }

  async ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const change = changes[propName];
      const oldValue = JSON.stringify(change.previousValue);
      const newValue = JSON.stringify(change.currentValue);
      console.log(change);
      if (oldValue == "false" && newValue === "true")
        await this.IncomingEnemyShot();
    }
  }

  GetShipToDisplay(xIndex: number, yIndex: number): string {
    for (var i = 0; i < this.MyShips.length; i++) {
      if (this.MyShips[i].ShipCoordinates[0].x === xIndex && this.MyShips[i].ShipCoordinates[0].y === yIndex) {
        this.ShipToDisplay = this.MyShips[i].Name;
        this.ShipImage = `../../assets/ship-${this.ShipToDisplay}.gif`;
        this.RotateShipToDisplay = this.RotateShip(this.ShipToDisplay);
        return this.ShipToDisplay;
      }
    }

    this.ShipImage = "";
    this.ShipToDisplay = "";
    return this.ShipToDisplay;
  }

  RotateShip(shipName: string): boolean {
    for (var i = 0; i < this.MyShips.length; i++) {
      if (this.MyShips[i].Name === shipName) {
        return !(this.MyShips[i].HorizontalLayout);
      }
    }

    return false;
  }

  async IncomingEnemyShot() {
    var thisShot = this.GetRandomShot();

    while (this.ShotWasAlreadyFired(thisShot)) {
      thisShot = this.GetRandomShot();
    }

    await new Promise(wait2secs => setTimeout(wait2secs, 2000));

    thisShot = this.ShotFired(thisShot);

    console.log(this.ShotsFired);
    console.log(this.SeaGrid);

    this.SeaGrid[thisShot.y][thisShot.x] = thisShot.hit;

    this.CompleteTurn(thisShot, "Enemy");
  }

  GetRandomShot(): Shot {
    var newX: number = this.randomService.GetRandomInt(9);
    var newY: number = this.randomService.GetRandomInt(9);
    var randomShot: Shot = {
      x: newX,
      y: newY,
      hit: false
    };

    return randomShot;
  }

  ShotWasAlreadyFired(shotToCheck: Shot): boolean {
    var matchingIndexInShotFired = this.intersectionService.ShotContainedInShotArray(shotToCheck, this.ShotsFired);
    return matchingIndexInShotFired >= 0;
  }
}

import { Component, OnInit } from '@angular/core'
import { BaseGrid } from '../base-grid/base-grid.component';

@Component({
  selector: 'display-my-grid',
  templateUrl: './my-grid.component.html',
  styleUrls: ['./my-grid.component.css']
})

export class MyGrid extends BaseGrid implements OnInit {
  ShotSelected: boolean;
  SelectedX?: number;
  SelectedY?: number;
  ShipToDisplay: string | undefined;
  RotateShipToDisplay: boolean;
  ShipImage: string;

  constructor() {
    super();
    this.ShotSelected = false;
    this.ShipToDisplay = undefined;
    this.RotateShipToDisplay = false;
    this.AddShipToMyShips("Submarine", 2, 2, true);
    this.ShipImage = "";
  }

  ngOnInit() {

  }

  GetShipToDisplay(xIndex: number, yIndex: number): string {
    for (var i = 0; i < this.MyShips.length; i++) {
      if (this.MyShips[i].ShipCoordinates[0].x === xIndex && this.MyShips[i].ShipCoordinates[0].y === yIndex) {
        this.ShipToDisplay = this.MyShips[i].Name;
        this.ShipImage = `../../assets/ship-${this.ShipToDisplay}.gif`;
        this.RotateShipToDisplay = this.GetRotateShip(this.ShipToDisplay);
        return this.ShipToDisplay;
      }
    }

    this.ShipImage = "";
    this.ShipToDisplay = "";
    return this.ShipToDisplay;
  }

  GetRotateShip(shipName: string): boolean {
    for (var i = 0; i < this.MyShips.length; i++) {
      if (this.MyShips[i].Name === shipName) {
        return this.MyShips[i].HorizontalLayout;
      }
    }

    return false;
  }

}

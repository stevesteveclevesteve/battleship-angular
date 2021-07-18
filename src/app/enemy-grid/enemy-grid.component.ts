import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core'
import { BaseGrid } from '../base-grid/base-grid.component';
import { IntersectionService } from '../intersection.service';
import { RandomService } from '../random.service';
import { Shot } from '../shot';
import { Ship } from '../ship';

@Component({
  selector: 'display-enemy-grid',
  templateUrl: './enemy-grid.component.html',
  styleUrls: ['./enemy-grid.component.css']
})

export class EnemyGrid extends BaseGrid implements OnInit {
  ShotSelected: boolean;
  SelectedX?: number;
  SelectedY?: number;

  @Output() targeted = new EventEmitter<boolean>();

  constructor(public randomService: RandomService, public intersectionService: IntersectionService) {
    super(randomService, intersectionService);
    this.ShotSelected = false;


  }

  ngOnInit() {
    super.GenerateRandomPlacementOfShips();
  }

  onSelectShot(selectedX: number, selectedY: number) {
    this.ShotSelected = true;
    this.SelectedX = selectedX;
    this.SelectedY = selectedY;
    this.targeted.emit(this.ShotSelected);
  }

  fire() {
    if (this.SelectedX && this.SelectedY) {

      var shotToCheck: Shot = {
        x: this.SelectedX,
        y: this.SelectedY,
        hit: false
      };

      for (let i = 0; i < this.MyShips.length; i++) {
        if (this.MyShips[i].IsSunk) {
          continue;
        }
        var hitIndexOfMyShip: number = this.intersectionService.ShotContainedInShotArray(shotToCheck, this.MyShips[i].ShipCoordinates);
        if (hitIndexOfMyShip > -1) {
          shotToCheck.hit = true;
          this.MyShips[i].ShipCoordinates[hitIndexOfMyShip].hit = true;
          this.MyShips[i].IsSunk = this.MyShips[i].CheckIfShipIsSunk();
        }
      }

      this.SeaGrid[this.SelectedY][this.SelectedX] = shotToCheck.hit;
      this.ShotsFired.push(shotToCheck);
    }
  }


}

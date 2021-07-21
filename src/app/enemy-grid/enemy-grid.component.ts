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
  @Input() MyTurn: boolean;

  constructor(public randomService: RandomService, public intersectionService: IntersectionService) {
    super(randomService, intersectionService);
    this.ShotSelected = false;
    this.MyTurn = false;
  }

  ngOnInit() {
    super.GenerateRandomPlacementOfShips();
  }

  onSelectShot(selectedX: number, selectedY: number) {
    if (!this.MyTurn) {
      return;
    }

    this.ShotSelected = true;
    this.SelectedX = selectedX;
    this.SelectedY = selectedY;
    this.targeted.emit(this.ShotSelected);
  }

  fire() {
    if (this.SelectedX !== undefined && this.SelectedX >= 0 && this.SelectedY !== undefined && this.SelectedY >= 0) {

      var shotToCheck: Shot = {
        x: this.SelectedX,
        y: this.SelectedY,
        hit: false
      };

      shotToCheck = this.ShotFired(shotToCheck);

      this.SeaGrid[this.SelectedY][this.SelectedX] = shotToCheck.hit;

      this.CompleteTurn(shotToCheck, "Player");
    }

  }


}

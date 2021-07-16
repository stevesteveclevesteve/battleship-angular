import { Component, OnInit } from '@angular/core'
import { BaseGrid } from '../base-grid/base-grid.component';
import { IntersectionService } from '../intersection.service';
import { RandomService } from '../random.service';

@Component({
  selector: 'display-enemy-grid',
  templateUrl: './enemy-grid.component.html',
  styleUrls: ['./enemy-grid.component.css']
})

export class EnemyGrid extends BaseGrid implements OnInit {
  ShotSelected: boolean;
  SelectedX?: number;
  SelectedY?: number;

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
  }

}

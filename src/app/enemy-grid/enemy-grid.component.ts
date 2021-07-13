import { Component, OnInit } from '@angular/core'
import { BaseGrid } from '../base-grid/base-grid.component';

@Component({
  selector: 'display-enemy-grid',
  templateUrl: './enemy-grid.component.html',
  styleUrls: ['./enemy-grid.component.css']
})

export class EnemyGrid extends BaseGrid implements OnInit {
  ShotSelected: boolean;
  SelectedX?: number;
  SelectedY?: number;

  constructor() {
    super();
    this.ShotSelected = false;
  }

  ngOnInit() {

  }

  onSelectShot(selectedX: number, selectedY: number) {
    this.ShotSelected = true;
    this.SelectedX = selectedX;
    this.SelectedY = selectedY;
  }

}

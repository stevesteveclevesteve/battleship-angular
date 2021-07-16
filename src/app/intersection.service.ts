import { Injectable } from '@angular/core';
import { Shot } from './shot';

@Injectable({
  providedIn: 'root'
})
export class IntersectionService {

  constructor() { }

  ShotContainedInShotArray(shotToCheck: Shot, shotArray: Shot[]): boolean {
    for (var i = 0; i < shotArray.length; i++) {
      if (shotToCheck.x === shotArray[i].x && shotToCheck.y === shotArray[i].y)
        return true;
    }

    return false;
  }
}

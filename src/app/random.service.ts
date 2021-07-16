import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() { }

  GetRandomInt(options: number) {
    return Math.floor(Math.random() * options);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Battling Ships!';
  targeted: boolean;
  buttonImageUrl: string; 

  constructor() {
    this.targeted = false;
    this.buttonImageUrl = '../assets/fireInactive.gif';
  }

  onTargeted(targeted: boolean) {
    this.targeted = targeted;
  }
}

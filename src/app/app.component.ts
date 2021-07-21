import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Battling Ships!';
  targeted: boolean;
  buttonImageUrl: string;
  userTurn: boolean;
  cpuTurn: boolean;

  constructor() {
    this.targeted = false;
    this.buttonImageUrl = '../assets/fireInactive.gif';
    this.userTurn = false;
    this.cpuTurn = false;
  }

  ngOnInit() {
    this.userTurn = true;
  }

  onTargeted(targeted: boolean) {
    this.targeted = targeted;
  }

  onTurnOver(myTurnOverFromPlayer: boolean) {
    this.targeted = false;
    console.log("Received turn ovr message from " + (myTurnOverFromPlayer ? "Player" : "Enemy"));
    this.userTurn = !myTurnOverFromPlayer;
    this.cpuTurn = myTurnOverFromPlayer;
  }
}

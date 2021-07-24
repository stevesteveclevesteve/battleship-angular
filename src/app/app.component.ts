import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideOverlayInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})

export class AppComponent {
  title = 'Battling Ships!';
  targeted: boolean;
  buttonImageUrl: string;
  userTurn: boolean;
  cpuTurn: boolean;
  showOverlay: boolean;
  winnerIsPlayer: boolean | undefined;

  constructor() {
    this.targeted = false;
    this.buttonImageUrl = '../assets/fireInactive.gif';
    this.userTurn = false;
    this.cpuTurn = false;
    this.showOverlay = false;
  }

  async ngOnInit() {
    this.userTurn = true;
    this.showAndHideOverlay();
  }

  onTargeted(targeted: boolean) {
    this.targeted = targeted;
  }

  async onTurnOver(myTurnOverFromPlayer: boolean) {
    this.targeted = false;
    this.userTurn = !myTurnOverFromPlayer;
    this.cpuTurn = myTurnOverFromPlayer;
    await this.showAndHideOverlay();
  }

  async showAndHideOverlay() {
    this.showOverlay = true;
    await new Promise(wait1pt5secs => setTimeout(wait1pt5secs, 1500));
    this.showOverlay = false;
  }

  showWinner(winnerWasPlayer: boolean) {
    this.winnerIsPlayer = winnerWasPlayer;
  }
}

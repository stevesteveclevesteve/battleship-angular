import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EnemyGrid } from './enemy-grid/enemy-grid.component';
import { MyGrid } from './my-grid/my-grid.component';
import { LoadMyShipForGridLocationDirective } from './load-my-ship-for-grid-location.directive';

@NgModule({
  declarations: [
    AppComponent,
    EnemyGrid,
    MyGrid,
    LoadMyShipForGridLocationDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

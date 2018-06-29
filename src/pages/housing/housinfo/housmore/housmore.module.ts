import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousmorePage } from './housmore';

@NgModule({
  declarations: [
    HousmorePage,
  ],
  imports: [
    IonicPageModule.forChild(HousmorePage),
  ],
})
export class HousmorePageModule {}

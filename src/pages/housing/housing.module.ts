import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousingPage } from './housing';

@NgModule({
  declarations: [
    HousingPage,
  ],
  imports: [
    IonicPageModule.forChild(HousingPage),
  ],
})
export class HousingPageModule {}

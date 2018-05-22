import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerdetailPage } from './passengerdetail';

@NgModule({
  declarations: [
    PassengerdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerdetailPage),
  ],
})
export class PassengerdetailPageModule {}

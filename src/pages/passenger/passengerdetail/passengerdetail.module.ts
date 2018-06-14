import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerdetailPage } from './passengerdetail';
import {PfollowrecordPageModule} from "./pfollowrecord/pfollowrecord.module";
import {PlookrecordPageModule} from "./plookrecord/plookrecord.module";

@NgModule({
  declarations: [
    PassengerdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerdetailPage),
    PfollowrecordPageModule,
    PlookrecordPageModule
  ],
})
export class PassengerdetailPageModule {}

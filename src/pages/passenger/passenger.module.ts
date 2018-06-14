import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerPage } from './passenger';
import {AddpassengerPageModule} from "./addpassenger/addpassenger.module";
import {CloseprivateguestPageModule} from "./mypassenger/closeprivateguest/closeprivateguest.module";
import {MypassengerPageModule} from "./mypassenger/mypassenger.module";
import {PassengerdetailPageModule} from "./passengerdetail/passengerdetail.module";
import {PublicpassengerPageModule} from "./publicpassenger/publicpassenger.module";
import {PsearchPageModule} from "./psearch/psearch.module";

@NgModule({
  declarations: [
    PassengerPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerPage),
    AddpassengerPageModule,
    MypassengerPageModule,
    PassengerdetailPageModule,
    PublicpassengerPageModule,
    PsearchPageModule
  ],
})
export class PassengerPageModule {}

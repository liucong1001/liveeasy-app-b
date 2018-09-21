import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerPage } from './passenger';
import {MypassengerPageModule} from "./mypassenger/mypassenger.module";
import {PublicpassengerPageModule} from "./publicpassenger/publicpassenger.module";
import {DealPageModule} from "./deal/deal.module";
import {InvalidPageModule} from "./invalid/invalid.module";
import {SoldPageModule} from "./sold/sold.module";

@NgModule({
  declarations: [
    PassengerPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerPage),
    MypassengerPageModule,
    PublicpassengerPageModule,
    DealPageModule,
    InvalidPageModule,
    SoldPageModule,
  ],
})
export class PassengerPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerPage } from './passenger';
import {MypassengerPageModule} from "./mypassenger/mypassenger.module";
import {PublicpassengerPageModule} from "./publicpassenger/publicpassenger.module";

@NgModule({
  declarations: [
    PassengerPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerPage),
    MypassengerPageModule,
    PublicpassengerPageModule,
  ],
})
export class PassengerPageModule {}

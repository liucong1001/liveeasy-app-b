import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerPage } from './passenger';
import {MypassengerPageModule} from "./mypassenger/mypassenger.module";
import {PublicpassengerPageModule} from "./publicpassenger/publicpassenger.module";
import {OtherpaPageModule} from "./otherpa/otherpa.module";

@NgModule({
  declarations: [
    PassengerPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerPage),
    MypassengerPageModule,
    PublicpassengerPageModule,
    OtherpaPageModule

  ],
})
export class PassengerPageModule {}

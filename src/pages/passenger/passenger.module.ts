import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerPage } from './passenger';
import {AddpassengerPageModule} from "./mypassenger/addpassenger/addpassenger.module";
import {CloseprivateguestPageModule} from "./mypassenger/closeprivateguest/closeprivateguest.module";
import {MypassengerPageModule} from "./mypassenger/mypassenger.module";
import {PublicpassengerPageModule} from "./publicpassenger/publicpassenger.module";
import {PsearchPageModule} from "./psearch/psearch.module";

@NgModule({
  declarations: [
    PassengerPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerPage),
    MypassengerPageModule,
    PublicpassengerPageModule,
    PsearchPageModule,
  ],
})
export class PassengerPageModule {}

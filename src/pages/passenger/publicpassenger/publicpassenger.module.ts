import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicpassengerPage } from './publicpassenger';
import {ChoosehousePageModule} from "./choosehouse/choosehouse.module";
import {PublicpdetailPageModule} from "./publicpdetail/publicpdetail.module";
@NgModule({
  declarations: [
    PublicpassengerPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicpassengerPage),
    ChoosehousePageModule,
    PublicpdetailPageModule
  ],
})
export class PublicpassengerPageModule {}

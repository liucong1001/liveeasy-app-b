import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicpassengerPage } from './publicpassenger';
import {PublicpdetailPageModule} from "./publicpdetail/publicpdetail.module";
import {PipesModule} from "../../../pipes/pipes.module";
@NgModule({
  declarations: [
    PublicpassengerPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicpassengerPage),
    PublicpdetailPageModule,
    PipesModule
  ],
})
export class PublicpassengerPageModule {}

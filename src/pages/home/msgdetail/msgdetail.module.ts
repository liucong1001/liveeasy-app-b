import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsgdetailPage } from './msgdetail';
import {MdetailsPageModule} from "./mdetails/mdetails.module";

@NgModule({
  declarations: [
    MsgdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MsgdetailPage),
    MdetailsPageModule
  ],
})
export class MsgdetailPageModule {}

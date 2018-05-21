import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsgdetailPage } from './msgdetail';

@NgModule({
  declarations: [
    MsgdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MsgdetailPage),
  ],
})
export class MsgdetailPageModule {}

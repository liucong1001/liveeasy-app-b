import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeclardetailPage } from './declardetail';
import {DeclinfoPageModule} from "./declinfo/declinfo.module";

@NgModule({
  declarations: [
    DeclardetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DeclardetailPage),
    DeclinfoPageModule
  ],
})
export class DeclardetailPageModule {}

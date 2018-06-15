import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlookrecordPage } from './plookrecord';
import {ClosePageModule} from "./close/close.module";

@NgModule({
  declarations: [
    PlookrecordPage,
  ],
  imports: [
    IonicPageModule.forChild(PlookrecordPage),
    ClosePageModule

  ],
})
export class PlookrecordPageModule {}

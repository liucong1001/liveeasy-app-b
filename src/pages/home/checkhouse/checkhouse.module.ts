import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckhousePage } from './checkhouse';

@NgModule({
  declarations: [
    CheckhousePage,
  ],
  imports: [
    IonicPageModule.forChild(CheckhousePage),
  ],
})
export class CheckhousePageModule {}

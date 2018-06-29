import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousinfoPage } from './housinfo';

@NgModule({
  declarations: [
    HousinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(HousinfoPage),
  ],
})
export class HousinfoPageModule {}

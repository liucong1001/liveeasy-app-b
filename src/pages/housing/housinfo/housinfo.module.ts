import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousinfoPage } from './housinfo';
import {HousmorePageModule} from "./housmore/housmore.module";

@NgModule({
  declarations: [
    HousinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(HousinfoPage),
    HousmorePageModule
  ],
})
export class HousinfoPageModule {}

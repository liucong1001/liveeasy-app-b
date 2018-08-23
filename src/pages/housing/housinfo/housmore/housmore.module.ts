import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousmorePage } from './housmore';
import {PipesModule} from "../../../../pipes/pipes.module";

@NgModule({
  declarations: [
    HousmorePage,
  ],
  imports: [
    IonicPageModule.forChild(HousmorePage),
    PipesModule,
  ],
})
export class HousmorePageModule {}

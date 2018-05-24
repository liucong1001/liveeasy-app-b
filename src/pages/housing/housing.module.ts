import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousingPage } from './housing';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    HousingPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(HousingPage),
  ],
})
export class HousingPageModule {}

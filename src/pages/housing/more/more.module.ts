import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorePage } from './more';
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    MorePage,
  ],
  imports: [
    IonicPageModule.forChild(MorePage),
    PipesModule
  ],
})
export class MorePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousinfoPage } from './housinfo';
import {HousmorePageModule} from "./housmore/housmore.module";
import {ComponentsModule} from "../../../components/components.module";
import {DirectivesModule} from "../../../directives/directives.module";

@NgModule({
  declarations: [
    HousinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(HousinfoPage),
    HousmorePageModule,
    ComponentsModule,DirectivesModule
  ],
})
export class HousinfoPageModule {}

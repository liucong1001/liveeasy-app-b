import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousinfoPage } from './housinfo';
import {HousmorePageModule} from "./housmore/housmore.module";
import {ComponentsModule} from "../../../components/components.module";
import {DirectivesModule} from "../../../directives/directives.module";
import {DescribePageModule} from "./describe/describe.module";

@NgModule({
  declarations: [
    HousinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(HousinfoPage),
    HousmorePageModule,
    ComponentsModule,DirectivesModule,
    DescribePageModule
  ],
})
export class HousinfoPageModule {}

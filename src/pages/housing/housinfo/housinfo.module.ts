import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousinfoPage } from './housinfo';
import {HousmorePageModule} from "./housmore/housmore.module";
import {ComponentsModule} from "../../../components/components.module";
import {DirectivesModule} from "../../../directives/directives.module";
import {DescribePageModule} from "./describe/describe.module";
import {BaiduMapModule } from "angular2-baidu-map";
import {AuditPageModule} from "./audit/audit.module";
@NgModule({
  declarations: [
    HousinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(HousinfoPage),
    HousmorePageModule,
    ComponentsModule,DirectivesModule,
    DescribePageModule,
    BaiduMapModule,
    AuditPageModule
  ],
})
export class HousinfoPageModule {}

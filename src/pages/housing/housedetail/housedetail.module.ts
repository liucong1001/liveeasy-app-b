import { NgModule } from '@angular/core';
import { HousedetailPage } from './housedetail';
import {ComponentsModule} from '../../../components/components.module';
import {DescPageModule} from "./desc/desc.module";
import {KeyPageModule} from "./key/key.module";
import {LetteratorneyPageModule} from "./letteratorney/letteratorney.module";
import {LookhousePageModule} from "./lookhouse/lookhouse.module";
import {RecordPageModule} from "./record/record.module";
import {RolepeoplePageModule} from "./rolepeople/rolepeople.module";
import {SearchhousePageModule} from "./searchhouse/searchhouse.module";
import {DirectivesModule} from "../../../directives/directives.module";
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations: [
    HousedetailPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(HousedetailPage),
    ComponentsModule,
    DescPageModule,
    KeyPageModule,
    LetteratorneyPageModule,
    LookhousePageModule,
    RecordPageModule,
    RolepeoplePageModule,
    SearchhousePageModule,
  ],
})
export class HousedetailPageModule {}

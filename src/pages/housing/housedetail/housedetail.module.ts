import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HousedetailPage } from './housedetail';
import {ComponentsModule} from '../../../components/components.module';
import {DescPageModule} from "./desc/desc.module";
import {KeyPageModule} from "./key/key.module";
import {LetteratorneyPageModule} from "./letteratorney/letteratorney.module";
import {LookhousePageModule} from "./lookhouse/lookhouse.module";
import {RecordPageModule} from "./record/record.module";
import {RolepeoplePageModule} from "./rolepeople/rolepeople.module";
import {SearchhousePageModule} from "./searchhouse/searchhouse.module";


@NgModule({
  declarations: [
    HousedetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HousedetailPage),
    ComponentsModule,
    ComponentsModule,
    DescPageModule,
    KeyPageModule,
    LetteratorneyPageModule,
    LookhousePageModule,
    RecordPageModule,
    RolepeoplePageModule,
    SearchhousePageModule
  ],
})
export class HousedetailPageModule {}

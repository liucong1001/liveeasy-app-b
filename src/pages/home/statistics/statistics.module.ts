import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticsPage } from './statistics';
import {PersonPageModule} from "./person/person.module";

@NgModule({
  declarations: [
    StatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(StatisticsPage),
    PersonPageModule
  ],
})
export class StatisticsPageModule {}

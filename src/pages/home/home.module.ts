import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {MdetailsPageModule} from "./msgdetail/mdetails/mdetails.module";
import {MsgdetailPageModule} from "./msgdetail/msgdetail.module";
import {DeclardetailPageModule} from "./declaration/declardetail/declardetail.module";
import {DeclarationPageModule} from "./declaration/declaration.module";
import {MsgdetailPage} from "./msgdetail/msgdetail";
import {CheckhousePageModule} from "./checkhouse/checkhouse.module";
import {HomesearchPage} from "./homesearch/homesearch";
import {HomesearchPageModule} from "./homesearch/homesearch.module";
import {StatisticsPageModule} from "./statistics/statistics.module";
import { JPush } from 'ionic3-jpush';
import {DirectivesModule} from "../../directives/directives.module";
@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(HomePage),
    MsgdetailPageModule,
    DeclarationPageModule,
    CheckhousePageModule,
    HomesearchPageModule,
    StatisticsPageModule,
  ],
  providers: [ JPush ],
})
export class HomePageModule {}

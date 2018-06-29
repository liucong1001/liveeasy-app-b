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
@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    MsgdetailPageModule,
    DeclarationPageModule,
    CheckhousePageModule,
    HomesearchPageModule,
  ],
})
export class HomePageModule {}

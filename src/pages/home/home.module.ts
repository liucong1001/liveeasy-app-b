import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {MdetailsPageModule} from "./mdetails/mdetails.module";
import {MsgdetailPageModule} from "./msgdetail/msgdetail.module";
import {DeclardetailPageModule} from "./declaration/declardetail/declardetail.module";
import {DeclarationPageModule} from "./declaration/declaration.module";
import {MsgdetailPage} from "./msgdetail/msgdetail";
@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    MdetailsPageModule,
    MsgdetailPageModule,
    DeclarationPageModule
  ],
})
export class HomePageModule {}

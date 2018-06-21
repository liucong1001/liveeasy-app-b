import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeclarationPage } from './declaration';
import {DeclardetailPageModule} from "../declaration/declardetail/declardetail.module";
@NgModule({
  declarations: [
    DeclarationPage,
  ],
  imports: [
    IonicPageModule.forChild(DeclarationPage),
    DeclardetailPageModule,
  ],
})
export class DeclarationPageModule {}

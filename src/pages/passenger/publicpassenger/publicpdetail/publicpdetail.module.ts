import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicpdetailPage } from './publicpdetail';
import {AddpublicguestPageModule} from "./addpublicguest/addpublicguest.module";

@NgModule({
  declarations: [
    PublicpdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicpdetailPage),
    AddpublicguestPageModule,
  ],
})
export class PublicpdetailPageModule {}

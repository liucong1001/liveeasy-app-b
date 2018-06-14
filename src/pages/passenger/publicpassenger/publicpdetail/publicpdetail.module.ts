import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicpdetailPage } from './publicpdetail';
import {AddpublicguestPageModule} from "./addpublicguest/addpublicguest.module";
import {PfollowrecordPageModule} from "../../passengerdetail/pfollowrecord/pfollowrecord.module";
import {PlookrecordPageModule} from "../../passengerdetail/plookrecord/plookrecord.module";

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

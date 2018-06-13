import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicpdetailPage } from './publicpdetail';
import {AddpublicguestPageModule} from "./addpublicguest/addpublicguest.module";
import {PfollowrecordPageModule} from "./pfollowrecord/pfollowrecord.module";
import {PlookrecordPageModule} from "./plookrecord/plookrecord.module";

@NgModule({
  declarations: [
    PublicpdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicpdetailPage),
    AddpublicguestPageModule,
    PfollowrecordPageModule,
    PlookrecordPageModule
  ],
})
export class PublicpdetailPageModule {}

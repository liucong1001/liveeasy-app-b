import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicpdetailPage } from './publicpdetail';
import {AddpublicguestPageModule} from "./addpublicguest/addpublicguest.module";
import {PubliclookPageModule} from "./publiclook/publiclook.module";
import {PublicfollowPageModule} from "./publicfollow/publicfollow.module";

@NgModule({
  declarations: [
    PublicpdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicpdetailPage),
    AddpublicguestPageModule,
    PubliclookPageModule,
    PublicfollowPageModule

  ],
})
export class PublicpdetailPageModule {}

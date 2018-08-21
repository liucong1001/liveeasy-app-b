import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PubliclookPage } from './publiclook';
import {PubliclosePageModule} from "./publiclose/publiclose.module";

@NgModule({
  declarations: [
    PubliclookPage,
  ],
  imports: [
    IonicPageModule.forChild(PubliclookPage),
    PubliclosePageModule,
  ],
})
export class PubliclookPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescsPage } from './descs';

@NgModule({
  declarations: [
    DescsPage,
  ],
  imports: [
    IonicPageModule.forChild(DescsPage),
  ],
})
export class DescsPageModule {}

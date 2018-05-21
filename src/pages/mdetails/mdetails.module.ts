import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MdetailsPage } from './mdetails';

@NgModule({
  declarations: [
    MdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MdetailsPage),
  ],
})
export class MdetailsPageModule {}

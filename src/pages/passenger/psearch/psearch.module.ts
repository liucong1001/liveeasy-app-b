import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PsearchPage } from './psearch';

@NgModule({
  declarations: [
    PsearchPage,
  ],
  imports: [
    IonicPageModule.forChild(PsearchPage),
  ],
})
export class PsearchPageModule {}

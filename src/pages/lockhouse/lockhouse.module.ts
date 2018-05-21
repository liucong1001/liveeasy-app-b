import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LockhousePage } from './lockhouse';

@NgModule({
  declarations: [
    LockhousePage,
  ],
  imports: [
    IonicPageModule.forChild(LockhousePage),
  ],
})
export class LockhousePageModule {}

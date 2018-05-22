import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerlookPage } from './passengerlook';

@NgModule({
  declarations: [
    PassengerlookPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerlookPage),
  ],
})
export class PassengerlookPageModule {}

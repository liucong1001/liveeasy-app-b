import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MypassengerPage } from './mypassenger';

@NgModule({
  declarations: [
    MypassengerPage,
  ],
  imports: [
    IonicPageModule.forChild(MypassengerPage),
  ],
})
export class MypassengerPageModule {}

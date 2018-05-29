import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MypassengerPage } from './mypassenger';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    MypassengerPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(MypassengerPage),
  ],
})
export class MypassengerPageModule {}

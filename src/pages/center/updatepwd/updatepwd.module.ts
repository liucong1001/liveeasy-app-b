import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatepwdPage } from './updatepwd';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    UpdatepwdPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatepwdPage),
    ComponentsModule
  ],
})
export class UpdatepwdPageModule {}

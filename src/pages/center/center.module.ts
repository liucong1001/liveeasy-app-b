import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CenterPage } from './center';
import {AboutusPageModule} from "./aboutus/aboutus.module";
import {MyaccountPageModule} from "./myaccount/myaccount.module";
import {HelpPageModule} from "./help/help.module";
import {UpdatepwdPageModule} from "./updatepwd/updatepwd.module";
import {VerifyphonePageModule} from "./verifyphone/verifyphone.module";
import {AttentionPageModule} from "./attention/attention.module";

@NgModule({
  declarations: [
    CenterPage,
  ],
  imports: [
    IonicPageModule.forChild(CenterPage),
    AboutusPageModule,
    MyaccountPageModule,
    HelpPageModule,
    UpdatepwdPageModule,
    VerifyphonePageModule,
    AttentionPageModule
  ],
})
export class CenterPageModule {}

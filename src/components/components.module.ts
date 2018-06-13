import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components/components';
import { ValidErrorComponent } from './valid-error/valid-error';
import { UploadComponent } from './upload/upload';
import { ToastComponent } from './toast/toast';
import {ImgListComponent} from './img-list/img-list'
import {DirectivesModule} from "../directives/directives.module";

@NgModule({
	declarations: [
	ComponentsComponent,
    ValidErrorComponent,
    UploadComponent,
    ToastComponent,
    ImgListComponent],
	imports: [CommonModule,DirectivesModule],
	exports: [ComponentsComponent,
    ValidErrorComponent,
    UploadComponent,
    ToastComponent,
    ImgListComponent]
})
export class ComponentsModule {}

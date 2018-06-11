import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components/components';
import { ValidErrorComponent } from './valid-error/valid-error';
import { UploadComponent } from './upload/upload';
import { ToastComponent } from './toast/toast';

@NgModule({
	declarations: [
	ComponentsComponent,
    ValidErrorComponent,
    UploadComponent,
    ToastComponent,],
	imports: [CommonModule],
	exports: [ComponentsComponent,
    ValidErrorComponent,
    UploadComponent,
    ToastComponent,]
})
export class ComponentsModule {}

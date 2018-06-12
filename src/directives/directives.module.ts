import { NgModule } from '@angular/core';
import { ImgViewDirective } from './img-view/img-view';
import { ImgGalleryDirective } from './img-gallery/img-gallery';
@NgModule({
	declarations: [ImgViewDirective,
    ImgGalleryDirective],
	imports: [],
	exports: [ImgViewDirective,
    ImgGalleryDirective]
})
export class DirectivesModule {}

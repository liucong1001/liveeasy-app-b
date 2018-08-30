import { NgModule } from '@angular/core';
import { ImgViewDirective } from './img-view/img-view';
import { ImgGalleryDirective } from './img-gallery/img-gallery';
import { OpenWinDirective } from './open-win/open-win';
@NgModule({
	declarations: [ImgViewDirective,
    ImgGalleryDirective,
    OpenWinDirective,],
	imports: [],
	exports: [ImgViewDirective,
    ImgGalleryDirective,
    OpenWinDirective,]
})
export class DirectivesModule {}

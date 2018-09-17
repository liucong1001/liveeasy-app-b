import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';
import {platformBrowser} from "@angular/platform-browser";
// import {MyAppModuleNgFactory} from './app.ngfactory';

 platformBrowserDynamic().bootstrapModule(AppModule);
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory).catch(err => console.error(err));

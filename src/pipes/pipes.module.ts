import { NgModule } from '@angular/core';
import { StringJsonPipe } from './string-json/string-json';
import { ToParseIntPipe } from './to-parse-int/to-parse-int';
import { AreaPipe } from './area/area';
import { TradingAreaPipe } from './trading-area/trading-area';
import { CodeValuePipe } from './code-value/code-value';
import { ArryCodeValuePipe } from './arry-code-value/arry-code-value';
import { ReversePipe } from './reverse/reverse';
import { CityPipe } from './city/city';
import { CodeShowPipe } from './code-show/code-show';
@NgModule({
	declarations: [StringJsonPipe,
    ToParseIntPipe,
    AreaPipe,
    TradingAreaPipe,
    CodeValuePipe,
    ArryCodeValuePipe,
    ReversePipe,
    CityPipe,
    CodeShowPipe],
	imports: [],
	exports: [StringJsonPipe,
    ToParseIntPipe,
    AreaPipe,
    TradingAreaPipe,
    CodeValuePipe,
    ArryCodeValuePipe,
    ReversePipe,
    CityPipe,
    CodeShowPipe]
})
export class PipesModule {}

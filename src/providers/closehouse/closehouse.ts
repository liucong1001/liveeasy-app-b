import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";

/*
  Generated class for the AddhouseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClosehouseProvider {

  private  closeHouse = 'property/propertyInfo/closeProperty';
  constructor(public http: HttpClient,public httpProvider:HttpProvider) {
    console.log('Hello UpdatepwdProvider Provider');
  }

  public getClose(params?){
    return this.httpProvider.httpPost(this.closeHouse,params);
  }
}

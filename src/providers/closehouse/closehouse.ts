import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
import {ConfigProvider} from "../config/config";
/*
  Generated class for the AddhouseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClosehouseProvider {

  private  closeHouse = this.configProvider.set().http+'/property/propertyInfo/propertyCloseProperty.do';
  private  show = this.configProvider.set().http+'/property/propertyInfo/closePropertyShow.do';
  constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider) {
    console.log('Hello UpdatepwdProvider Provider');
  }

  public getClose(params?){
    return this.httpProvider.httpPost(this.closeHouse,params);
  }
  public getShow(propertyId){
    return this.httpProvider.httpPost(this.show + "?propertyId="+propertyId,propertyId);
  }
}

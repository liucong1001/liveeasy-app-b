import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";

/*
  Generated class for the AddhouseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecordProvider {

  private  record = 'property/propertyInfo/detail';
  constructor(public http: HttpClient,public httpProvider:HttpProvider) {
    console.log('Hello UpdatepwdProvider Provider');
  }

  public getRecord(params?){
    return this.httpProvider.httpPost(this.record,params);
  }
}


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
export class FollowProvider {

  private  follow = this.configProvider.set().http+'/property/propertyFollowupInfo/insertFollowUp.do';
  constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider) {
    console.log('Hello UpdatepwdProvider Provider');
  }

  //提交增加跟进
  public getfollow(params?){
    return this.httpProvider.httpPost(this.follow,params);
  }
}

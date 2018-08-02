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
export class UpdatepwdProvider {
    private  aaPassword = this.configProvider.set().http+'/sys/user/repass.do';
    private  helpPath = this.configProvider.set().http+'/feedback/appFeedbackInfo/insert';
    //获取版本号
  private  versionPath = this.configProvider.set().http+'/feedback/appInfo/findMaxVersion';

  constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider) {
        console.log('Hello UpdatepwdProvider Provider');
    }
    //修改密码
  postPassword(opass,npass){
    return this.httpProvider.httpPost(this.aaPassword + "?npass=" + npass+"&opass="+opass);
  }

  helps(params?){
    return this.httpProvider.httpPost(this.helpPath,params);
  }
  version(params?){
    return this.httpProvider.httpGet(this.versionPath,params);
  }
}

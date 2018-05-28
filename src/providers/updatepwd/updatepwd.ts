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

    private  oldPassword = this.configProvider.set().http+'/property/propertyInfo/editPassword';
    private  aaPassword = this.configProvider.set().http+'/property/propertyInfo/undatePassword';
    constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider) {
        console.log('Hello UpdatepwdProvider Provider');
    }

    //修改密码——判断密码一致
    public getoldPassword(params?){
        return this.httpProvider.httpGet(this.oldPassword,params);
    }
    //修改密码——提交新密码
    public postPassword(params?){
        return this.httpProvider.httpPost(this.aaPassword,params);
    }

    // public  login(username,password):Promise<any>{
    //     return this.http.post(this.newsPassword+'?username='+username+'&password='+password,null).toPromise().then(res=>{
    //         return  res  as any;
    //     })
    // }
}

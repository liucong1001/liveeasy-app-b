// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {ConfigProvider} from "../config/config";
/*
 登录相关接口服务
*/
@Injectable()
export class LoginProvider {
  private  path = this.configProvider.set().http+'/login';
  constructor(public http: HttpClient,private configProvider:ConfigProvider) {
    console.log('Hello LoginProvider Provider');
  }
  public  login(username,password):Promise<any>{
     return this.http.post(this.path+'?username='+username+'&password='+password,null).toPromise().then(res=>{
        return  res  as any;
     })
  }

}

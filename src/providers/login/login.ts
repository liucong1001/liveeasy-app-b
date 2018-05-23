// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
/*
 登录相关接口服务
*/
@Injectable()
export class LoginProvider {
  private  path = '/login';
  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }
  public  login(username,password):Promise<any>{
     return this.http.post(this.path+'?username='+username+'&password='+password,null).toPromise().then(res=>{
        return  res  as any;
     })
  }
}

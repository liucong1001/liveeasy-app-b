// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {ConfigProvider} from "../config/config";
import {ToastComponent} from "../../components/toast/toast";


/*
 登录相关接口服务
*/
@Injectable()
export class LoginProvider {
  private  path = this.configProvider.set().http+'/login';
  constructor(public http: HttpClient,private configProvider:ConfigProvider, public toast:ToastComponent) {

  }

  public  login(username,password):Promise<any>{
    return this.http.post(this.path+'?username='+username+'&password='+password,null).timeout(8000).toPromise().then(res=>{
      return  res  as any;
    }).catch(err=>{
      this.errResponse(err);
      err.name=='TimeoutError'&&this.toast.errorBlack('连接超时!');
    })
  }


  errResponse(err){

    if(err.status==401){
      this.toast.errorBlack('错误代码'+err.status);
      // this.reset();
    }

    if(err.status==403){
      this.toast.errorBlack('错误代码'+err.status);
    }

    if(err.status==500){
      this.toast.errorBlack('服务器异常!');
    }

    if(err.status==504){
      this.toast.errorBlack('服务器连接超时!');
    }

    throw  err
  }

}

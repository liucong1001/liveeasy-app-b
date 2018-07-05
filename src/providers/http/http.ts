import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, ViewChild} from '@angular/core';
import {LocalStorageProvider} from '../local-storage/local-storage'
import "rxjs/add/operator/map";
import {catchError} from "rxjs/operators";
import {errorHandler} from "@angular/platform-browser/src/browser";
import {AccountPage} from "../../pages/account/account";
import {Content,IonicPage, NavParams,App,Nav} from "ionic-angular";
import {ToastComponent} from "../../components/toast/toast";
import  {NavController} from "ionic-angular";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {
  @ViewChild(Content) content: Content;
  @ViewChild(Nav) nav: Nav;
   defaultTimeout = 10000;
  constructor(public http: HttpClient,public localStorageProvider:LocalStorageProvider,
              public toast:ToastComponent,public app: App,) {
              console.log('Hello HttpProvider Provider');
  }
  public headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('token',this.localStorageProvider.get('ticket'))
    .set('Access-Control-Allow-Origin','*');

  public headersForm = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('token',this.localStorageProvider.get('ticket'))
    .set('Access-Control-Allow-Origin','*');

  public headersFormJson = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8')
    .set('token',this.localStorageProvider.get('ticket'))
    .set('Access-Control-Allow-Origin','*');


  public httpGet(url,params?):Promise<any>{
    return this.http.get(url,{headers:this.headers,params:params},).timeout(8000)
      .toPromise().then(res=>{
      return res as any;
    }).catch(err=>{
      this.errResponse(err);
      err.name=='TimeoutError'&&this.toast.errorBlack('连接超时!');
    })
  }

  public httpPost(url,params?):Promise<any>{
    return this.http.post(url,params,{headers:this.headers}).timeout(8000)
      .toPromise().then(res=>{
          return res as any;
    }).catch(err=>{
        err.name=='TimeoutError'&&this.toast.errorBlack('连接超时!');
        this.errResponse(err);

    })
  }
  //测试 没有权限
  public httpPostTest(url,params?):Promise<any>{
    return this.http.post(url,params).toPromise().then(res=>{
      // console.log();
       return res as any;

    }).catch(err=>{
     this.errResponse(err);
    })
  };


  //formData表单
  public httpPostForm(url,params?):Promise<any>{
    return this.http.post(url,params,{headers:this.headersForm}).toPromise().then(res=>{
      return res as any;
    }).catch(err=>{
      this.errResponse(err);
    })
  }
//formData传object
  public httpPostFormJson(url,data):Promise<any>{
    return this.http.post(url,data,{headers:this.headersForm}).toPromise().then(res=>{
      return res as any;
    }).catch(err=>{
      this.errResponse(err);
    })
  }

//退出登录
  reset(){
    localStorage.clear();
    window.location.reload();
    this.app.getActiveNavs()[0].setRoot("AccountPage");
  }

  errResponse(err){
    // switch (err.status){
    //   case 401 :console.log('错误代码',err.status);
    //     this.toast.errorBlack('错误代码'+err.status);
    //     // this.reset();
    //     break;
    //   case 403 :console.log('错误代码',err.status),this.reset();
    //     this.toast.errorBlack('错误代码'+err.status);
    //     break;
    //   case 500 :console.log('错误代码',err.status);
    //     this.toast.errorBlack('服务器异常!');
    //     break;
    //   case 504 :console.log('错误代码',err.status);
    //     this.toast.errorBlack('服务器连接超时!');
    //     break;
    //     }

    if(err.status==401){
      this.toast.errorBlack('错误代码'+err.status);
       this.reset();
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

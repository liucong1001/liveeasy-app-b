import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LocalStorageProvider} from '../local-storage/local-storage'
import "rxjs/add/operator/map";
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor(public http: HttpClient,public localStorageProvider:LocalStorageProvider) {
    console.log('Hello HttpProvider Provider');
  }
  public headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('token',this.localStorageProvider.get('ticket'))
    .set('Access-Control-Allow-Origin','*');

  public headersForm = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    .set('token',this.localStorageProvider.get('ticket'))
    .set('Access-Control-Allow-Origin','*');

  public httpGet(url,params?):Promise<any>{
    return this.http.get(url,{headers:this.headers,params:params},).toPromise().then(res=>{
      return res as any;
    })
  }

  public httpPost(url,params?):Promise<any>{
    return this.http.post(url,params,{headers:this.headers}).toPromise().then(res=>{
      return res as any;
    })
  }
  //formData表单
  public httpPostForm(url,params?):Promise<any>{
    return this.http.post(url,params,{headers:this.headersForm}).toPromise().then(res=>{
      return res as any;
    })
  }


}

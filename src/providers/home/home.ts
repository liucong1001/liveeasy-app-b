import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LocalStorageProvider} from '../local-storage/local-storage'
import {toPromise} from "rxjs/operator/toPromise";
import {HttpProvider} from "../http/http";
import {ConfigProvider} from "../config/config";
/*
  首页接口服务
*/
@Injectable()
export class HomeProvider {

    private  pageListPath = this.configProvider.set().http+'/property/propertyInfo/pageList';
    private  notificationPath =this.configProvider.set().http+ '/notification/notificationInfo/findNotifyByCompanyId';

    public headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('token',this.localStorageProvider.get('ticket')) ;


  constructor(public http: HttpClient,public localStorageProvider:LocalStorageProvider,
              public httpProvider:HttpProvider,private configProvider:ConfigProvider) {
    console.log('Hello HomeProvider Provider',this.headers);
  }

    public pageList():Promise<any>{
        return this.http.post(this.pageListPath,null,{headers:this.headers}).toPromise().then(res=>{
            return  res  as any;
        })
    }

    // 首页-公告消息接口
    public  notification():Promise<any>{
       return this.http.post(this.notificationPath,null,{headers:this.headers}).toPromise().then(res=>{
           return res as any;
        })
    }

    //二次封装
    cpageList(params?){
      return this.httpProvider.httpPost(this.pageListPath,params);
    }

    gpageList(params?){
        return this.httpProvider.httpGet(this.pageListPath,params);
    }
    //首页-公告消息接口
    getNotification(){
      var dataP = {"currentPage":1,"limit":10,"offset":0,"params":{"status":"1"},"totalCount":0,"totalPages":0,"totalRecords":0};
      return this.httpProvider.httpPost(this.notificationPath,dataP);
    }
    successOrder(){

    }



}

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
    private  declarationPath =this.configProvider.set().http+ '/order/submitOrderInfo/pageList/1.do';
    private  declDetailPath =this.configProvider.set().http+ '/order/submitOrderInfo/orderDetailApp';
    //数据统计
    private statisPath=this.configProvider.set().http+'/statistics/statisticsInfo/getList'
    private  getDictCodePath = this.configProvider.set().http+ '/property/propertyInfo/getDictCode';

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

    successOrder(currentPage,params){
      var  data = {
        currentPage: currentPage,
        hasCount:true,
        limit:10,
        totalRecords:0,
        totalPages:0,
        offset:0,
        order:'asc',
        params:{
          ...params,
        },
      };
      return this.httpProvider.httpPost(this.declarationPath,data);
    }

    decldetail(orderId){
      return this.httpProvider.httpGet(this.declDetailPath,{orderId:orderId});
    }

     // 获取码值
     getCode(){
       return this.httpProvider.httpGet(this.getDictCodePath);
     }

    statis(params?){
      return this.httpProvider.httpPost(this.statisPath,params);
    }
}

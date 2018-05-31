import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
import {ConfigProvider} from "../config/config";

/*
 客源接口
*/
@Injectable()
export class CustomerProvider {

  private  pageListPath = this.configProvider.set().http+'/customer/customerInfo/pageList';
  private  areaPath = this.configProvider.set().http+'/customer/customerInfo/addressInfo/4.do';
  private  tradingAreaPath = this.configProvider.set().http+'/customer/customerInfo/addressInfo/5.do';
  constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider) {
    console.log('Hello CustomerProvider Provider');
  }

  //分页列表
  page(currentPage){
    var data = {"currentPage":currentPage,"limit":10,"totalRecords":0,"totalPages":0,"offset":0,"params":{"orderBy":"1","propertyPriceUnit":"1","tags":0,"loginUserProvince":"42"}}
    return   this.httpProvider.httpPost(this.pageListPath,data)
  }
  //区域
  area(){
    return   this.httpProvider.httpGet(this.areaPath);
  }
  //商圈
  tradingArea(){
    return   this.httpProvider.httpGet(this.tradingAreaPath);
  }

  //列表条件搜索
  pageSearch(currentPage,params){
    var  data = {
      currentPage: currentPage,
      limit:10,
      totalRecords:0,
      totalPages:0,
      offset:0,
      order:'asc',
      params:{
        ...params,
      },
    };
    return this.httpProvider.httpPost(this.pageListPath,data)
  }


}

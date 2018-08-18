import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
import {ConfigProvider} from "../config/config";

/*
  公客接口
*/
@Injectable()
export class PublicCustomerProvider {

  private  pageListPath = this.configProvider.set().http+'/publiccustomer/publicCustomerInfo/pageList.do';
  constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider) {
    console.log('Hello PublicCustomerProvider Provider');
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
      orderBy: 'ASC',
      hasCount:true,
      ... params,
    };
    return this.httpProvider.httpGet(this.pageListPath,data)
  }

}

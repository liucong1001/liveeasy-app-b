import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
/*
  房源接口
*/
@Injectable()
export class PropertyProvider {

  private  pageListPath = '/property/propertyInfo/pageList.do';
  private  insertEmptyLookPath = '/propertyFollowupInfo/insertEmptyLook.do';
  constructor(public http: HttpClient,public httpProvider:HttpProvider) {
    console.log('Hello PropertyProvider Provider');
  }

  //分页列表
  page(currentPage){
    var data = {"currentPage":currentPage,"limit":10,"totalRecords":0,"totalPages":0,"offset":0,"params":{"orderBy":"1","propertyPriceUnit":"1","tags":0,"loginUserProvince":"42"}}
    return   this.httpProvider.httpPost(this.pageListPath,data)
  }
 //添加空看
  insertEmptyLook(params?){
     return this.httpProvider.httpPost(this.insertEmptyLookPath,params)
  }

}

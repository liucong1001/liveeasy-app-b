import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
import {ConfigProvider} from "../config/config";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
/*
  房源接口
*/
@Injectable()
export class PropertyProvider {

  private  pageListPath = this.configProvider.set().http+'/property/propertyInfo/pageList.do';
  private  insertEmptyLookPath = this.configProvider.set().http+'/property/propertyFollowupInfo/insertEmptyLook.do';
  private  searchHousePath = this.configProvider.set().http+'/property/propertyInfo/findSubDistrict.do';
  private  updatePath = this.configProvider.set().http+'/property/propertyInfo/update.do';
  bedRType:any;
  districtId:any;
  constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider, public localStorageProvider: LocalStorageProvider,) {
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
  //搜索房源——区域
  search(params?) {
    var data = {"superDistrictId":'32553c97266c463895df33e3e5ec0215','type':1};
    return this.httpProvider.httpGet(this.searchHousePath,data)
  }
  //搜索房源——区域——商圈
  search2(districtId) {
    // this.districtId=this.localStorageProvider.get('districtId')
    var data = {"superDistrictId":districtId,'type':2};
    return this.httpProvider.httpGet(this.searchHousePath,data)
  }
  //搜索房源——户型
  houseType(params?) {
    this.bedRType=this.localStorageProvider.get('bedroom');
    var data = {"currentPage":1,"limit":10,"totalRecords":0,"totalPages":0,"offset":0,"params":{"orderBy":"1","propertyPriceUnit":"1","bedroomType":this.bedRType,"tags":0,"loginUserProvince":"42"}}
    return this.httpProvider.httpPost(this.pageListPath,data)
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
          loginUserProvince:'42',
          orderBy:'1',
          propertyPriceUnit:'1',
          ...params,
        },
      };
      return this.httpProvider.httpPost(this.pageListPath,data)
  }
//修改房源
  updates(params?) {
    // var data = {};
    return this.httpProvider.httpPost(this.updatePath,params)
  }
}

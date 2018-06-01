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
  private  customerSrcInfoPath = this.configProvider.set().http+'/customer/customerInfo/customerSrcInfo';
  private  agentListPath = this.configProvider.set().http+'/customer/customerInfo/agentList';
  private customeroGrageInfoPath = this.configProvider.set().http+'/customer/customerInfo/customeroGradeInfo';
  private  addPath = this.configProvider.set().http+'/customer/customerInfo/insert';
  private  detailPath = this.configProvider.set().http+'/customer/customerInfo/DateilView.do';
  private  updateDetailPath = this.configProvider.set().http+'/customer/customerInfo/update';

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
 //客户来源
  customerSrcInfo(){
     return this.httpProvider.httpGet(this.customerSrcInfoPath);
  }
 //客户归属
  agentList(){
    return this.httpProvider.httpGet(this.agentListPath);
  }
  //客户等级
  customeroGrageInfo(){
    return this.httpProvider.httpGet(this.customeroGrageInfoPath);
  }
  //录入客户
  add(params){
     return this.httpProvider.httpPostForm(this.addPath,params);
  }
  //根据ID获取客户详情
  getDetail(id){
     return this.httpProvider.httpPost(this.detailPath+'&id='+id);
  }
  //编辑客户
  update(params){
    return this.httpProvider.httpPostForm(this.updateDetailPath,params);
  }



}

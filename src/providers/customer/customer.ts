import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
import {ConfigProvider} from "../config/config";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
/*
 客源接口
*/
@Injectable()
export class CustomerProvider {
  private  pageListPath = this.configProvider.set().http+'/customer/customerInfo/pageList';
  // private  areaPath = this.configProvider.set().http+'/customer/customerInfo/addressInfo/4';
  private  areaPath = this.configProvider.set().http+'/dicts/getDistrictsAndPropertyTag/4';
  private  tradingAreaPath = this.configProvider.set().http+'/customer/customerInfo/addressInfo/5.do';
  private  customerSrcInfoPath = this.configProvider.set().http+'/customer/customerInfo/customerSrcInfo';
  private  agentListPath = this.configProvider.set().http+'/customer/customerInfo/agentList';
  private customeroGrageInfoPath = this.configProvider.set().http+'/customer/customerInfo/customeroGradeInfo';
  private  addPath = this.configProvider.set().http+'/customer/customerInfo/insert';
  private  detailPath = this.configProvider.set().http+'/customer/customerInfo/customerDetails';
  private  updateDetailPath = this.configProvider.set().http+'/customer/customerInfo/update';

  //我的客户——跟进
  private  prFollowPath=this.configProvider.set().http+'/customer/customerInfo/CustomerFollowUp';
  //我的客户——带看
  private  prlookPath=this.configProvider.set().http+'/customer/customerInfo/lookCustomer';
  //带看搜索
  private  lookseaPath=this.configProvider.set().http+'/customer/customerInfo/lookProperty'
  //关闭
  private  prclosePath=this.configProvider.set().http+'/customer/customerInfo/closeCustomer';
//跟进记录
  private  mfollowPath=this.configProvider.set().http+'/customer/customerInfo/followupPageList';
 //公客详情
  private  publicDetailPath = this.configProvider.set().http+'/publiccustomer/publicCustomerInfo/toDetailApp';
  //约看
  private  finishPath=this.configProvider.set().http+'/customer/customerInfo/updateFollowStatus';


  constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider,public localStorageProvider: LocalStorageProvider) {
    console.log('Hello CustomerProvider Provider');
  }

  //分页列表
  page(currentPage){
    var data = {"currentPage":currentPage,"limit":10,"totalRecords":0,"totalPages":0,"offset":0,"params":{"orderBy":"1","propertyPriceUnit":"1","tags":0,"loginUserProvince":"42"}}
    return   this.httpProvider.httpPost(this.pageListPath,data)
  }
  //区域
  area(){
    var loginUserDistrict = this.localStorageProvider.get('loginInfo')['office']['area']['code'];
    var city = loginUserDistrict.substring(0,4);
    var data = {
      type:'4',
      cityToFor:city,
      num:6
    };
    return   this.httpProvider.httpPost(this.areaPath+'?cityToFor='+city+'&num=6',0);
  }
  //商圈
  tradingArea(){
    // var data = {
    //   type:'4',
    //   cityToFor:'4201',
    //   num:0
    // };
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
    return this.httpProvider.httpGet(this.pageListPath,data)
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
     return this.httpProvider.httpPost(this.addPath,params);
  }
  //根据ID获取客户详情
  getDetail(customerId){
     return this.httpProvider.httpPost(this.detailPath+'?customerId='+customerId);
  }
  //编辑客户
  update(params){
    return this.httpProvider.httpPost(this.updateDetailPath,params);
  }

  //我的客户——跟进
  public prfollow(params?){
    return this.httpProvider.httpPost(this.prFollowPath,params);
  }
  //我的客户——带看
  public prlook(params?){
    return this.httpProvider.httpPost(this.prlookPath,params);
  }
  //带看搜索
  lookSearch(params){
    return this.httpProvider.httpPost(this.lookseaPath,params);
  }
  //我的客户——关闭
  public prclose(params?){
    return this.httpProvider.httpPost(this.prclosePath,params);
  }
  //我的客户——记录(跟进，约看)
  public mfollow(currentPage,params){
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
    return this.httpProvider.httpPost(this.mfollowPath,data);
  }
  //公客详情
  public getPublicDetail(id){
    return this.httpProvider.httpGet(this.publicDetailPath+'?id='+id);
  }

  public mfinish(id,status,content){
    return this.httpProvider.httpPostForm(this.finishPath,"id=" +id + "&status="+status + '&content=' + content);
  }





}

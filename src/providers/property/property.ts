import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
import {ConfigProvider} from "../config/config";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HTTP} from "@ionic-native/http";
/*
  房源接口
*/
@Injectable()
export class PropertyProvider {

  private  insertEmptyLookPath = this.configProvider.set().http+'/property/propertyFollowupInfo/insertEmptyLook.do';
  private  searchHousePath = this.configProvider.set().http+'/property/propertyInfo/findSubDistrict.do';
  private  updatePath = this.configProvider.set().http+'/property/propertyInfo/update.do';

  //角色人
  private  rolePath = this.configProvider.set().http+ '/property/propertyInfo/propertyDetail';
  //业主委托
  private  attorneyPath = this.configProvider.set().http+'/property/delegateDocInfo/insert.do';
  private  aupdatePath = this.configProvider.set().http+'/property/delegateDocInfo/update.do'
  private  adetailPath = this.configProvider.set().http+'/property/propertyAuditInfo/getAuditDocInfoDetail.do';
  //钥匙
  private  keyPath = this.configProvider.set().http+'/property/propertyKeyInfo/insertKey.do';
  private  keydetailPath = this.configProvider.set().http+'/property/propertyAuditInfo/getAuditKeyInfoDetail.do';
  private  keyupdatePath = this.configProvider.set().http+'/property/propertyKeyInfo/updateKey.do';
  //实勘图
  private  shiKanPath =  this.configProvider.set().http+'/property/propertyPics/uploadPic';
  private  shiKanDetailPath =  this.configProvider.set().http+'/property/propertyAuditInfo/getAuditPicsInfoDetail.do';

  // 楼盘模糊搜索
  private  floorSearchPath = '/47.75.151.57:7077/live/search?keyword=';
  //查找具体信息内容
  private record = this.configProvider.set().http + '/property/propertyInfo/propertyDetail.do';
  //图片接口测试
  private  getAuditInfo = this.configProvider.set().http + '/property/propertyAuditInfo/getAuditInfo.do';

  /**
   * https://c.liveeasy.tech 接口
   * @type {string}
   */
  public propertyApi='/property/api/v1/query';

  private  basePath = this.configProvider.set().cHttp+this.propertyApi;
  private  tagsListPath = this.basePath+'?qId=dict&dictType=property_tag_desc';
  private  getDictCodePath=this.basePath+'?qId=dict&qCate=3&dictType=orientation,rent_pay_type,property_life,curr_live_state,sex,property_source,rent_type,school_type,property_mortgage,buzz_owner_type,property_tag_desc,info_owner_type,property_type,buzz_type,has_elevator,decoration,building_type';


  bedRType:any;
  districtId:any;
  propertyid:any;
  constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider, public localStorageProvider: LocalStorageProvider,
             ) {
    console.log('Hello PropertyProvider Provider');
  }

  // //分页列表
  // page(currentPage){
  //   var data = {"currentPage":currentPage,"limit":10,"totalRecords":0,"totalPages":0,"offset":0,"params":{"orderBy":"1","propertyPriceUnit":"1","tags":0,"loginUserProvince":"42"}}
  //   return   this.httpProvider.httpPost(this.pageListPath,data)
  // }

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
  // //搜索房源——户型
  // houseType(params?) {
  //   this.bedRType=this.localStorageProvider.get('bedroom');
  //   var data = {"currentPage":1,"limit":10,"totalRecords":0,"totalPages":0,"offset":0,"params":{"orderBy":"1","propertyPriceUnit":"1","bedroomType":this.bedRType,"tags":0,"loginUserProvince":"42"}}
  //   return this.httpProvider.httpPost(this.pageListPath,data)
  // }


  /**
   * 列表条件搜索
   *
   * @param currentPage
   * @param params
   * @param qId  查询配置，列表用properties， 查询用propQuery
   * @returns {Promise<any>}
   */
  pageSearch(currentPage,params,qId){
    var loginUserDistrict = this.localStorageProvider.get('loginInfo')['office']['area']['code'];
    var loginUserProvince = loginUserDistrict.substring(0,4);
    var qType;
    if(qId == 'propQuery'){
      qType ='dynamic';
    }else if (qId == 'properties') {
      qType= 'fixed';
    }

    var  data = {
      page: currentPage,
      qId:qId,
      qType:qType,
      city:loginUserProvince,
      // division:loginUserDistrict,
      owner:this.localStorageProvider.get('loginInfo')['company']['id'],
      ...params,
    };
    return this.http.get(this.basePath,{params:data}).toPromise().then(
      res=>{
        return res as any;
      }
    );

  }

  //房源标签
  getTagsList(){
     return  this.http.get(this.tagsListPath).toPromise().then(res=>{
       return res as any ;
     })
  }
  //行政区划
  getDivision(){
    var loginUserDistrict = this.localStorageProvider.get('loginInfo')['office']['area']['code'];
    var loginUserProvince = loginUserDistrict.substring(0,4);
    var data = {
      qId:'division',
      qCate:'3',
      code:loginUserProvince,
    };
    return  this.http.get(this.basePath,{params:data}).toPromise().then(res=>{
      return res as any ;
    })
  }

  //修改房源
  updates(params?) {
    // var data = {};
    return this.httpProvider.httpPost(this.updatePath,params)
  }
  //业主委托书
  attorney(params?) {
    return this.httpProvider.httpPost(this.attorneyPath,params)
  }
  //业主委托书详情
  adetail(propertyId) {
    return this.httpProvider.httpPostForm(this.adetailPath,'propertyId='+propertyId)
  }
  //业主委托书修改
  aupdate(params?) {
    return this.httpProvider.httpPost(this.aupdatePath,params)
  }

  //钥匙
  key(params?) {
    return this.httpProvider.httpPost(this.keyPath,params)
  }
  //钥匙详情
  keydetail(propertyId) {
    return this.httpProvider.httpPostForm(this.keydetailPath  ,'propertyId='+propertyId)
  }
  //钥匙修改
  keyupdate(params?) {
    return this.httpProvider.httpPost(this.keyupdatePath,params)
  }
  //角色人
  role(propertyId){
    // var  data = {''}
    return this.httpProvider.httpPost(this.rolePath,{propertyId:propertyId})
  }


  //实勘图
  shiKanSave(arrPic,propertyId){
    return this.httpProvider.httpPostForm(this.shiKanPath,"arrPic=" + arrPic+"&propertyId="+propertyId);
  }
  //实勘图详情
   shikanDetail(propertyId){
     return this.httpProvider.httpPost(this.shiKanDetailPath + '?propertyId='+ propertyId ,propertyId)
   }

  //专用版楼盘搜索
  searchFloor(params){
    var site = '2000';
    return this.httpProvider.httpGet(this.floorSearchPath+params+'&site='+site)
  }
  // 根据id查询内容
  getRecord(propertyId) {
    return this.httpProvider.httpPost(this.record, {propertyId:propertyId})
  }


  //房源实勘图，业主委托书
  getPropertyPicInfo(propertyId){
    return this.httpProvider.httpPost(this.getAuditInfo, {propertyId:propertyId})
  }
  // 获取码值
  getCode(){
    return  this.http.get(this.getDictCodePath).toPromise().then(res=>{
      return res as any ;
    })
  }


}

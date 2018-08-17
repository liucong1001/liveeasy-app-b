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
  private  shiKanDetailPath =  this.configProvider.set().http+'/property/propertyPics/';

  // 楼盘模糊搜索
  private  floorSearchPath = 'https://web.liveeasy.tech/api/search';
  //查找具体信息内容
  private record = this.configProvider.set().http + '/property/propertyInfo/propertyDetail.do';
  //图片接口测试
  private  getAuditInfo = this.configProvider.set().http + '/property/propertyAuditInfo/getAuditInfo.do';
  //房源详情图片（钥匙，业主委托书，实勘图）
  private  propertyPics = this.configProvider.set().http+ '/property/propertyAuditInfo';
  //价格审核
  private  priceAuditPass = this.configProvider.set().http+'/property/propertyAuditInfo/claimAudit.do';

  /**
   * https://c.liveeasy.tech 接口
   * @type {string}
   */
  public   propertyApi='property/api/v1/query';
  private  basePath = this.configProvider.set().cHttp+this.propertyApi;
  private  tagsListPath = this.basePath+'?qId=dict&dictType=property_tag_desc';
  private  getDictCodePath=this.basePath+'?qId=dict&qCate=3&dictType=orientation,rent_pay_type,property_life,curr_live_state,sex,property_source,rent_type,school_type,property_mortgage,buzz_owner_type,property_tag_desc,info_owner_type,property_type,buzz_type,has_elevator,decoration,building_type,loan_type,mny_deliver_type,customer_grade,cms_src,operate_code,order_status,role_in_order';

  bedRType:any;
  districtId:any;
  propertyid:any;
  constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider, public localStorageProvider: LocalStorageProvider,
             ) {
    console.log('Hello PropertyProvider Provider');
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


  /**
   * 列表条件搜索
   *
   * @param currentPage
   * @param params
   * @param qId  查询配置，列表用properties， 查询用propQuery
   * @returns {Promise<any>}
   */
  pageSearch(currentPage,params,qId){
    var loginUserDistrict = this.localStorageProvider.get('loginInfo')['user']['office']['area']['code'];
    console.log('code',this.localStorageProvider.get('loginInfo')['user']['office']['area']['code']);
     // var loginUserDistrict='213';
    var loginUserProvince = loginUserDistrict.substring(0,4);
    var qType;
    if(qId == 'propQuery'){
      qType ='dynamic';
      params.qCate=1;
      params.update =1;
    }else if (qId == 'properties') {
      qType= 'fixed';
    }

    var  data = {
      page: currentPage,
      qId:qId,
      qType:qType,
      city:loginUserProvince,
      owner:this.localStorageProvider.get('loginInfo')['user']['company']['id'],
      ...params,
    };

    return this.http.get(this.basePath,{params:data}).toPromise().then(
      res=>{
        return res as any;
      }
    );

  }

  /**
   * 获取房源详情
   * @param propertyId
   * @returns {Promise<Object>}
   */
  getPropertyDetail(propertyId){
     var data= {
        qId:'property',
       propId:propertyId,
     };
     return this.http.get(this.basePath,{params:data}).toPromise().then(res=>{
       return res as any;
     })
  }


  //房源标签
  getTagsList(){
     return  this.http.get(this.tagsListPath).toPromise().then(res=>{
       return res as any ;
     })
  }
  //行政区划
  getDivision(){
    var loginUserDistrict = this.localStorageProvider.get('loginInfo')['user']['office']['area']['code'];
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
    return this.httpProvider.httpPost(this.keydetailPath+'?propertyId='+propertyId)
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
  //实勘图详情信息
   shikanDetail(propertyId){
     return this.httpProvider.httpGet(this.shiKanDetailPath + propertyId)
   }

  //专用版楼盘搜索
  searchFloor(keyword){

    var loginUserDistrict = this.localStorageProvider.get('loginInfo')['user']['office']['area']['code'];
    var city = loginUserDistrict.substring(0,4);
    var data = {
      qId:'search',
      qCate:'3',
      qType:'search',
      site:city,
      keyword:keyword,
      score:'1',
    };
    return this.http.get(this.basePath,{params:data}).toPromise().then(res=>{
      return res as any ;
    })
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

  getPropertyPics(propertyId:string){
      return  this.httpProvider.httpPost(this.propertyPics,{propertyId:propertyId})
  }
 //价格异常审核通过 priceAuditPass
  priceAuditConfirm(params){
     return  this.httpProvider.httpPost(this.priceAuditPass,params)
  }

  //房源敏感信息
  sensitiveInfo(propId){
      var data = {
        qId:'sensitive',
        propId:propId,
      };
     return  this.http.get(this.basePath,{params:data}).toPromise().then(res=>{
       return  res  as any;
     })
  }
}

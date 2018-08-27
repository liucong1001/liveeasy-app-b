import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LocalStorageProvider} from "../local-storage/local-storage";

/*
 基本配置服务
*/
@Injectable()
export class ConfigProvider {

  onLine = false; //打包线上开关
  isProd = false;//是否是生产环境
  globalConfig:any;
  appKeyData:any;
  imgHeaderServer:any;
  constructor(public http: HttpClient,public localStorageProvider: LocalStorageProvider,) {

  }

  set(){
    if(this.localStorageProvider.get('loginInfo')){
      this.imgHeaderServer ='https://'+ this.localStorageProvider.get('loginInfo')['props']['oss-bucket']+'.'+
      this.localStorageProvider.get('loginInfo')['props']['oss-endpoint']+'/';
    }

    if(this.onLine){
      /*线上*/
      this.globalConfig = {
        url:'',
        oss:'',
        http:'https://beta-erp.zdfc.com/api/v1/',
        cHttp:'https://beta-c.zdfc.com/',
        cmsHttp:'https://beta-cms.zdfc.com/',
        img:this.imgHeaderServer,
        errorImg:'assets/imgs/http502.png',
        imgSign:'?x-oss-process=style/b-detail',
        smSign:'?x-oss-process=style/b-list',
      }
    }else {
      /*线下*/
      this.globalConfig = {
        url:'',
        oss:'',
        http:'',
        cHttp:'https://beta-c.zdfc.com/',
        cmsHttp:'https://beta-cms.zdfc.com/',
        img:this.imgHeaderServer,
        errorImg:'assets/imgs/http502.png',
        imgSign:'?x-oss-process=style/b-detail',
        smSign:'?x-oss-process=style/b-list',
      }
    }
     return this.globalConfig;
  }

  setKey(){
      if(this.isProd){
          this.appKeyData = {
            appKey:'e862e663383d107fbbec515cd5064ec5'
          }
      }else {
          this.appKeyData = {
            appKey:'9db9597481973c878648387bf30eaca0'
          }
      }
      return  this.appKeyData;

  }

}

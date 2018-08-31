import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LocalStorageProvider} from "../local-storage/local-storage";
import { ENV } from '@app/env'
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
   ENV:any;
   envName:any;
  constructor(public http: HttpClient,public localStorageProvider: LocalStorageProvider,) {
    this.ENV = ENV;
    this.envName = ENV.name;
  }

  set(){
    this.onLine = this.ENV.isProd;

    if(this.localStorageProvider&&this.localStorageProvider.get('loginInfo')){
      this.imgHeaderServer ='https://'+ this.localStorageProvider.get('loginInfo')['props']['oss-bucket']+'.'+
      this.localStorageProvider.get('loginInfo')['props']['oss-endpoint']+'/';
    }

    if(this.envName=='prod'){
      /*正式包*/
      this.globalConfig = {
        url:'',
        oss:'',
        http:'https://erp.zdfc.com/api/v1/',
        cHttp:'https://q.zdfc.com/',
        cmsHttp:'https://cms.zdfc.com/',
        img:this.imgHeaderServer,
        errorImg:'assets/imgs/http502.png',
        imgSign:'?x-oss-process=style/b-detail',
        smSign:'?x-oss-process=style/b-list',
      }
    }else if(this.envName=='beta') {
      /*beta*/
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
    }else if(this.envName=='dev'){
      /*dev*/
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


}

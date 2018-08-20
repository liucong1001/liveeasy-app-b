import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LocalStorageProvider} from "../local-storage/local-storage";

/*
 基本配置服务
*/
@Injectable()
export class ConfigProvider {

  onLine = true; //打包线上开关
  globalConfig:any;
  constructor(public http: HttpClient,public localStorageProvider: LocalStorageProvider,) {

  if(this.localStorageProvider.get('loginInfo')){
    var imgHeaderServer ='https://'+ this.localStorageProvider.get('loginInfo')['props']['oss-bucket']+'.'+
      this.localStorageProvider.get('loginInfo')['props']['oss-endpoint']+'/';
  }

    if(this.onLine){
      /*线上*/
      this.globalConfig = {
        url:'',
        oss:'',
        http:'https://erp.zdfc.com/api/v1/',//erp客源
        cHttp:'https://q.zdfc.com/', //祥哥专属查询接口
        cmsHttp:'https://cms.zdfc.com/',
        img:imgHeaderServer,
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
        img:imgHeaderServer,
        errorImg:'assets/imgs/http502.png',
        imgSign:'?x-oss-process=style/b-detail',
        smSign:'?x-oss-process=style/b-list',
      }
    }
  }

  set(){
     return this.globalConfig;
  }

}

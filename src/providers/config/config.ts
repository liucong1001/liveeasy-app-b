import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
 基本配置服务
*/
@Injectable()
export class ConfigProvider {
  onLine = false; //打包线上开关
  globalConfig =  {
    url:'',
    oss:'',
    http:'',
    cHttp:'https://beta-c.zdfc.com/',
    cmsHttp:'https://beta-cms.zdfc.com/',
    img:'https://zdfc-beta.oss-cn-shanghai.aliyuncs.com/',
    errorImg:'assets/imgs/http502.png',
    imgSign:'?x-oss-process=style/b-detail',
    smSign:'?x-oss-process=style/b-list',
  };
  constructor(public http: HttpClient) {
    if(this.onLine){
      this.globalConfig = {
        url:'',
        oss:'',
        http:'https://beta-erp.zdfc.com/api/v1/',
        cHttp:'https://beta-c.zdfc.com/',
        cmsHttp:'https://beta-cms.zdfc.com/',
        img:'https://zdfc-beta.oss-cn-shanghai.aliyuncs.com/',
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

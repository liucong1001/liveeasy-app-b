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
    cHttp:'https://c.liveeasy.tech',
    img:'https://liveeasydev.oss-cn-shenzhen.aliyuncs.com/',
    errorImg:'assets/imgs/http502.png',
  };
  constructor(public http: HttpClient) {
    console.log('Hello ConfigProvider Provider');

    if(this.onLine){
      this.globalConfig = {
        url:'',
        oss:'',
        http:'https://erp.liveeasy.tech/api/v1',
        cHttp:'https://c.liveeasy.tech',
        img:'https://liveeasydev.oss-cn-shenzhen.aliyuncs.com/',
        errorImg:'assets/imgs/http502.png',
      }
    }
  }

  set(){
     return this.globalConfig;
  }

}

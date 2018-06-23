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
    img:'https://liveeasydev.oss-cn-shenzhen.aliyuncs.com/',
  };

  constructor(public http: HttpClient) {
    console.log('Hello ConfigProvider Provider');

    if(this.onLine){
      this.globalConfig = {
        url:'',
        oss:'',
        http:'https://erp.liveeasy.tech/api/v1',
        img:'https://liveeasydev.oss-cn-shenzhen.aliyuncs.com/',
      }
    }
  }

  set(){
     return this.globalConfig;
  }

}

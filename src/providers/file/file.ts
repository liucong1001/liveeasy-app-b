import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
/*
  file文件服务
*/
@Injectable()
export class FileProvider {

  getTickerPath = '/oss/getTicker';
  baseDir = 'liveeasy-erp/oss/';
  constructor(public http: HttpClient,public httpProvider:HttpProvider) {
    console.log('Hello FileProvider Provider');
  }

  //获取签证
  getTicker(userDir){
     return this.httpProvider.httpPost(this.getTickerPath,this.baseDir+userDir)
  }


}

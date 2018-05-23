import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
/*
  Generated class for the AddhouseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddhouseProvider {

  private  estateList = '/property/estateInfo/pageList.do';
  private  estateTagsInfos ='/property/tagsInfo/list.do';
  constructor(public http: HttpClient,public httpProvider:HttpProvider) {
    console.log('Hello AddhouseProvider Provider');
  }

  // 楼盘列表
  public estateListSelect(params?){
      return this.httpProvider.httpPost(this.estateList,params);
  }
  //房源标签
  public estateTagsSelect(params?){
      return this.httpProvider.httpGet(this.estateTagsInfos,params);
  }

}

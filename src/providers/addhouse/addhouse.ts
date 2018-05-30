import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
import {ConfigProvider} from "../config/config";
/*
  Generated class for the AddhouseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddhouseProvider {

  private  estateList = this.configProvider.set().http+'/property/estateInfo/pageList.do';
  private  estateTagsInfos =this.configProvider.set().http+'/property/tagsInfo/list.do';
  private  addEatate = this.configProvider.set().http+'property/propertyInfo/insert.do';
  constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider) {
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
 //录入房源
  public  save(params?){
      return this.httpProvider.httpPost(this.addEatate,params);
  }



}

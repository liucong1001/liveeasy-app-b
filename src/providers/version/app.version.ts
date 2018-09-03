import { Injectable } from '@angular/core';
import {AppVersion} from "@ionic-native/app-version";
import {HTTP} from "@ionic-native/http";

import {Device} from "@ionic-native/device";
import {VersionUpdateProvider} from "./app.update";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageProvider} from "../local-storage/local-storage";
import {File} from "@ionic-native/file";
import {HttpProvider} from "../http/http";
import {ConfigProvider} from "../config/config";
import {ToastComponent} from "../../components/toast/toast";
import { ENV } from '@app/env'
import {Environment} from "../../environments/environment.model";
/*
  Generated class for the VersionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class VersionProvider {
  private versionJsonUrl : any;
  versionNumber:any;
  ENY:Environment;
  constructor(private http: HTTP,
              private http2:HttpClient,
              public localStorageProvider:LocalStorageProvider,
              private appVersion: AppVersion,
              private device: Device,
              private appUpdate: VersionUpdateProvider,  private file: File,
             public httpProvider:HttpProvider,private configProvider:ConfigProvider,public toast:ToastComponent,){
    this.versionJsonUrl = "https://www.pgyer.com/apiv2/app/listMy";
    this.ENY = ENV;
  }
  public headers = new HttpHeaders().set('Access-Control-Allow-Origin','*');

  /**
   * 版本检测更新
   * appType :1pc  2android    3ios
   */
  checkVersion(noFouce) {

    var params={
      _api_key:this.ENY.apiKey,
      page:'1',
    };
    this.headers = new HttpHeaders() //.set('Content-Type', 'application/json')
      .set('token',this.localStorageProvider.get('ticket'))
      .set('Access-Control-Allow-Origin','*');
    const  path = this.configProvider.set().cmsHttp+'/interface/appinfo/findMaxAppVersion';
    console.log('app版本更新',path);
    this.http.get(path, {},{token:this.localStorageProvider.get('ticket')}).then(
        res=>{
          console.log("下载内容：" , res,"数据层",res.data);
            var  result = JSON.parse(res.data);
            console.log('检测',result);
            var androidData ,iosData;
            for(var i   in  result['data']){
               if(result['data'][i].appType==2){
                 androidData = result['data'][i];
               }else if(result['data'][i].appType==3){
                 iosData = result['data'][i];
               }
            }

          this.appVersion.getVersionNumber().then(ressult=>{
            this.versionNumber =ressult;
            if(noFouce==false){
              /*首页强制更新*/
              if(androidData['appVersion']>this.versionNumber){
                if(this.device.version<='6.0'){
                  console.log('这是低版本',this.device.version);
               /*   window.open('https://www.pgyer.com/liveeasyApp');
                  return false*/
                }
                this.appUpdate.detectionUpgrade(androidData.downlodAddr,  noFouce);
              }
            }else {
              /* center个人中心更新*/
              if(androidData['appVersion']>this.versionNumber){
                this.appUpdate.detectionUpgrade(androidData.downlodAddr,  noFouce);
              }else {
                this.toast.defaultMsg('middle','暂无更新!');
              }
            }

          })
        }
    );
  }




}

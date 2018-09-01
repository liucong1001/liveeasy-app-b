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
  public headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin','*');

  /**
   * 版本检测更新
   * appType :1pc  2android    3ios
   */
  checkVersion(noFouce) {
    var params={
      _api_key:this.ENY.apiKey,
      page:'1',
    };
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
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

    // this.http.post(this.versionJsonUrl,params,{
    //   "content-type":"application/json"
    // }).then(data  => {
    //    var res;
    //    res = JSON.parse(data.data);
    //   console.log('检测',res);
    //  let versionInfo = res.data.list[0];
    //   console.log('最新版本',versionInfo);
    //   if (data && data.status && data.status == 200 && data.data) {
    //     // let result = data.data || {};
    //     versionInfo.url=" https://www.pgyer.com/apiv2/app/install?appKey=9db9597481973c878648387bf30eaca0&_api_key=14eca046de7309cd5125d4e3bdb1afd1";
    //       // if (typeof result == "string") {
    //     //   result = eval("("+ result +")");
    //     // }
    //     // let versionInfo = data.data.list[0].buildVersionNo;
    //     // console.log('最新版本',versionInfo);
    //     // versionInfo.url = 'https://www.pgyer.com/apiv2/app/install?appKey='+versionInfo.appKey+'&_api_key='+params._api_key;
    //     console.log('url', versionInfo.url);
    //     //获取系统版本号和服务器版本号对比
    //     // this.appVersion.getVersionCode().then(result => {
    //     //   if (versionInfo.buildVersionNo > result) {
    //     //     this.appUpdate.detectionUpgrade(versionInfo.url, versionInfo.show || true);
    //     //     //TODO IOS页面单独处理
    //     //
    //     //
    //     //   }
    //     // });
    //
    //   }
    // }).catch((e)=> {
    //   console.error(JSON.stringify(e));
    // })
  }




}

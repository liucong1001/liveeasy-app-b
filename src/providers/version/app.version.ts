import { Injectable } from '@angular/core';
import {AppVersion} from "@ionic-native/app-version";
import {HTTP} from "@ionic-native/http";
import {Device} from "@ionic-native/device";
import {VersionUpdateProvider} from "./app.update";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageProvider} from "../local-storage/local-storage";


/*
  Generated class for the VersionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class VersionProvider {
  private versionJsonUrl : any;
  constructor(private http: HTTP,
              private http2:HttpClient,
              public localStorageProvider:LocalStorageProvider,
              private appVersion: AppVersion,
              private device: Device,
              private appUpdate: VersionUpdateProvider){
    this.versionJsonUrl = "https://www.pgyer.com/apiv2/app/listMy";

    // https://www.pgyer.com/liveeasyApp
  }
  public headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin','*');

  /**
   * 版本检测更新
   */
  checkVersion() {
    var params={
      _api_key:'14eca046de7309cd5125d4e3bdb1afd1',
      page:'1',
      // APPKEY:'42d16b350c365b3dd38f471fd5c102bb',
    };
    this.http.post(this.versionJsonUrl,params,{
      "content-type":"application/json"
    }).then(data  => {
       var res;
       res = JSON.parse(data.data);
      console.log('检测',res);
     let versionInfo = res.data.list[0];
      console.log('最新版本',versionInfo);
      if (data && data.status && data.status == 200 && data.data) {
        // let result = data.data || {};
        // https://www.pgyer.com/apiv2/app/install?appKey=9db9597481973c878648387bf30eaca0&_api_key=14eca046de7309cd5125d4e3bdb1afd1

          // if (typeof result == "string") {
        //   result = eval("("+ result +")");
        // }
        // let versionInfo = data.data.list[0].buildVersionNo;
        // console.log('最新版本',versionInfo);
        versionInfo.url = 'https://www.pgyer.com/apiv2/app/install?appKey='+versionInfo.appKey+'&_api_key='+params._api_key;
        console.log('url', versionInfo.url);
        //获取系统版本号和服务器版本号对比
        this.appVersion.getVersionCode().then(result => {
          if (versionInfo.buildVersionNo > result) {
            this.appUpdate.detectionUpgrade(versionInfo.url, versionInfo.show || true);
            //TODO IOS页面单独处理


          }
        });

      }
    }).catch((e)=> {
      console.error(JSON.stringify(e));
    })
  }




}

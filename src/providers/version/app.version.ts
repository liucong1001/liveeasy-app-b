import { Injectable } from '@angular/core';
import {AppVersion} from "@ionic-native/app-version";
import {HTTP} from "@ionic-native/http";
import {Device} from "@ionic-native/device";
import {VersionUpdateProvider} from "./app.update";


/*
  Generated class for the VersionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class VersionProvider {
  private versionJsonUrl : any;
  constructor(private http: HTTP,
              private appVersion: AppVersion,
              private device: Device,
              private appUpdate: VersionUpdateProvider){
    this.versionJsonUrl = "https://objectnull.oss-cn-beijing.aliyuncs.com/upload/uploader-android";
  }

  /**
   * 版本检测更新
   */
  checkVersion() {
    this.http.get(this.versionJsonUrl,{},{
      "content-type":"application/json"
    }).then(data => {
      if (data && data.status && data.status == 200 && data.data) {
        let result = data.data || {};
        if (typeof result == "string") {
          result = eval("("+ result +")");
        }
        let versionInfo = result[this.device.platform.toLowerCase()] || {};
        //获取系统版本号和服务器版本号对比
        this.appVersion.getVersionCode().then(result => {
          if (versionInfo.version > result) {
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

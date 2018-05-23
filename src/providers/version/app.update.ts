import { Injectable } from '@angular/core';
import {AppVersion} from "@ionic-native/app-version";
import {FileOpener} from "@ionic-native/file-opener";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {File} from '@ionic-native/file';
import {AlertController} from "ionic-angular";

/*
  Generated class for the VersionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class VersionUpdateProvider {

  constructor(
              private fileOpener: FileOpener,
              private transfer: FileTransfer,
              private file: File,
              private alertCtrl: AlertController) {
  }

  detectionUpgrade(apkUrl, allowChoose) {
    if (allowChoose) {
      this.alertCtrl.create({
        title: '升级提示',
        subTitle: '发现新版本,是否立即升级？',
        buttons: [{
          text: '取消'
        }, {
          text: '确定',
          handler: () => {
            this.downloadApp(apkUrl);
          }
        }]
      }).present();
    } else {
      this.downloadApp(apkUrl);
    }
  }

  downloadApp(apkUrl) {
    let alert = this.alertCtrl.create({
      title: '下载进度：0%',
      enableBackdropDismiss: false,
      buttons: ['后台下载']
    });
    alert.present();

    const fileTransfer: FileTransferObject = this.transfer.create();
    const apk = this.file.externalRootDirectory + 'app.apk'; //apk保存的目录
    fileTransfer.download(apkUrl, apk).then(() => {
      this.fileOpener.open(apk, 'application/vnd.android.package-archive').then(() =>{
        console.log('File is opened')
      }).catch(e => {
        console.log('Error openening file', e)
      });
    });
    fileTransfer.onProgress((event: ProgressEvent) => {
      let num = Math.floor(event.loaded / event.total * 100);
      if (num === 100) {
        alert.dismiss();
      } else {
        let title = document.getElementsByClassName('alert-title')[0];
        title && (title.innerHTML = '下载进度：' + num + '%');
      }
    });
  }

}

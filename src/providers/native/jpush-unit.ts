
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {ConfigProvider} from "../config/config";
import {ToastComponent} from "../../components/toast/toast";
import {Device} from "@ionic-native/device";
import { JPush } from '@jiguang-ionic/jpush';
import {CheckhousePage} from "../../pages/home/checkhouse/checkhouse";
import {NavController} from "ionic-angular";
import {App} from 'ionic-angular';
/*
 jpush消息推送服务
*/
@Injectable()
export class  jpushUnit{


  public registrationId: string;
  devicePlatform: string;
  sequence: number = 0;

  tagResultHandler = function(result) {
    var sequence: number = result.sequence;
    var tags: Array<string> = result.tags == null ? [] : result.tags;
    alert('Success!' + '\nSequence: ' + sequence + '\nTags: ' + tags.toString());
  };

  aliasResultHandler = function(result) {
    var sequence: number = result.sequence;
    var alias: string = result.alias;
    alert('Success!' + '\nSequence: ' + sequence + '\nAlias: ' + alias);
  };

  errorHandler = function(err) {
    var sequence: number = err.sequence;
    var code = err.code;
    alert('Error!' + '\nSequence: ' + sequence + '\nCode: ' + code);
  };

  constructor(device: Device,public toast:ToastComponent, public jpush: JPush,
              public app: App) {
    this.devicePlatform = device.platform;
  }

  /**
   * 初始化
   */
  initPush(){
    document.addEventListener('jpush.receiveNotification', (event: any) => {
      var content;
      if (this.devicePlatform == 'Android') {
        content = event.alert['messageContent'];
      } else {
        content = event.aps.alert;
      }
      // alert('接受到通知: ' + JSON.stringify(event));
      console.log('接受到通知: ' , JSON.stringify(event));
    }, false);

    document.addEventListener('jpush.openNotification', (event: any) => {
      var content;
      if (this.devicePlatform == 'Android') {
        content = event.alert.messageContent;
      } else {  // iOS
        if (event.aps == undefined) { // 本地通知
          content = event.content;
        } else {  // APNS
          content = event.aps.alert;
        }
      }
       // alert('打开通知: ' + JSON.stringify(event));
      this.app.getActiveNav().push(CheckhousePage);
      console.log('打开通知: ' , JSON.stringify(event));
    }, false);

    document.addEventListener('jpush.receiveLocalNotification', (event: any) => {
      // iOS(*,9) Only , iOS(10,*) 将在 jpush.openNotification 和 jpush.receiveNotification 中触发。
      var content;
      if (this.devicePlatform == 'Android') {
      } else {
        content = event.content;
      }
      alert('接受本地通知: ' + JSON.stringify(event));
    }, false);
  }



  /**
   * 设备的id
   */

  getRegistrationID() {
    console.log('开始获取registrationId');
    this.jpush.getRegistrationID()
      .then(rId => {
        this.registrationId = rId;
        console.log('registrationId的值是',this.registrationId);
      });
  }
  /**
   * 设置标签
   * tags:['Tag1', 'Tag2']
   */
  setTags() {
    this.jpush.setTags({ sequence: this.sequence++, tags: ['Tag1', 'Tag2']})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }
  /**
   * 添加标签
   * tags:['Tag3', 'Tag4']
   */
  addTags() {
    this.jpush.addTags({ sequence: this.sequence++, tags: ['Tag3', 'Tag4']})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }
  /**
   * 检测标签状态
   * * @param tag
   */
  checkTagBindState() {
    this.jpush.checkTagBindState({ sequence: this.sequence++, tag: 'Tag1' })
      .then(result => {
        var sequence = result.sequence;
        var tag = result.tag;
        var isBind = result.isBind;
        alert('Sequence: ' + sequence + '\nTag: ' + tag + '\nIsBind: ' + isBind);
      }).catch(this.errorHandler);
  }

  deleteTags() {
    this.jpush.deleteTags({ sequence: this.sequence++, tags: ['Tag4']})
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }
  /**
   *
   * 获取所有标签
   */
  getAllTags() {
    this.jpush.getAllTags({ sequence: this.sequence++ })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  cleanTags() {
    this.jpush.cleanTags({ sequence: this.sequence++ })
      .then(this.tagResultHandler)
      .catch(this.errorHandler);
  }

  /**
   *
   * @param alias 设置别名
   */
  setAlias(alias:string) {
    this.jpush.setAlias({ sequence: this.sequence++, alias: alias })
      .then(
         // this.aliasResultHandler
      )
      .catch(
        // this.errorHandler
      );
  }
  /**
   *
   * 获取所有别名
   */
  getAlias() {
    this.jpush.getAlias({ sequence: this.sequence++ })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }
  /**
   *
   * 删除所有别名
   */
  deleteAlias() {
    this.jpush.deleteAlias({ sequence: this.sequence++ })
      .then(this.aliasResultHandler)
      .catch(this.errorHandler);
  }
  /**
   * 添加本地消息
   */
  addLocalNotification() {
    if (this.devicePlatform == 'Android') {
      this.jpush.addLocalNotification(0, 'Hello JPush', 'JPush', 1, 5000);
    } else {
      this.jpush.addLocalNotificationForIOS(5, 'Hello JPush', 1, 'localNoti1');
    }
  }






}

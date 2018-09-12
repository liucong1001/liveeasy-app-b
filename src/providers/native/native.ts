import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AlertController, Loading, LoadingController, NavController, Platform, ToastController} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import { Diagnostic } from '@ionic-native/diagnostic';
import { CodePush } from '@ionic-native/code-push';
import { Observable } from 'rxjs/Rx';
import {ToastComponent} from "../../components/toast/toast";
import { ENV } from '@app/env'
declare var LocationPlugin;
declare var AMapNavigation;
/*
   手机原生服务层
*/
@Injectable()
export class NativeProvider {
  ENV:any;
  constructor(public http: HttpClient,private platform: Platform,
              public nativePageTransitions: NativePageTransitions,
              private network: Network, private codePush: CodePush,
              private diagnostic: Diagnostic,public toast:ToastComponent,
              private alertCtrl: AlertController,) {
    this.ENV = ENV;
  }



  /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }
  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
   * 判断是否有网络
   */
  isConnecting(): any {
    return this.getNetworkType() != 'none';
  }

  /**
   * 获得用户当前坐标信息
   * 5秒内只会返回同一结果
   */
  getUserLocation = (() => {
    let lastTime = null; //  缓存上次获取定位时间
    let lastResult = null; //  缓存上次获取的结果
    return () => {
      return Observable.create(observer => {
        //  5秒内有获取过定位则不再重复获取
        if (lastTime && (new Date().getTime() - lastTime < 5000)) {
          if (lastResult) {
            observer.next(lastResult);
          } else {
            //  获取定位是异步,所以这里用定时,直到获取到结果
            const timer = setInterval(() => {
              if (lastResult) {
                clearInterval(timer);
                observer.next(lastResult);
              }
            }, 1000);
          }
        } else {
          lastTime = new Date().getTime(); //  准备获取定位时记录时间
          lastResult = null; //  每次重新获取时,需清空上次结果,以免下次一获取在5秒内直接返回上次结果
          this.getLocation().subscribe(res => {
            lastTime = new Date().getTime(); //  当获取成功,重置上次获取时间
            lastResult = res;
            observer.next(res);
          }, () => {
            lastTime = null;
          });
        }
      });
    };
  })();
  /**
   * 获取位置
   */
  getLocation() {
    return Observable.create(observer => {
      if (this.isMobile()) {
        //  检查app是否开始位置服务和定位权限.没有则会请求权限
        Observable.zip(this.assertLocationService(), this.assertLocationAuthorization()).subscribe(() => {
          LocationPlugin.getLocation(data => {
            //  android返回data形如:{"locationType":4,"latitude":23.119225,"longitude":113.350784,"hasAccuracy":true,"accuracy":29,"address":"广东省广州市天河区潭乐街靠近广电科技大厦","country":"中国","province":"广东省","city":"广州市","district":"天河区","street":"平云路","cityCode":"020","adCode":"440106","aoiName":"广电平云广场","speed":0,"bearing":0,"time":1515976535559}
            //  其中locationType为定位来源.定位类型对照表: http://lbs.amap.com/api/android-location-sdk/guide/utilities/location-type/
            //  iOS只会返回data形如:{longitude: 113.35081420800906, latitude: 23.119172707345594}
            console.log('定位信息', data);
            observer.next({'lng': data.longitude, 'lat': data.latitude});
          }, msg => {
            if (msg.indexOf('缺少定位权限') != -1 || (this.isIos() && msg.indexOf('定位失败') != -1)) {
              this.alertCtrl.create({
                title: '缺少定位权限',
                subTitle: '请在手机设置或app权限管理中开启',
                buttons: [{text: '取消'},
                  {
                    text: '去开启',
                    handler: () => {
                      this.diagnostic.switchToSettings();
                    }
                  }
                ]
              }).present();
            } else if (msg.indexOf('WIFI信息不足') != -1) {
              alert('定位失败,请确保连上WIFI或者关掉WIFI只开流量数据');
            } else if (msg.indexOf('网络连接异常') != -1) {
              alert('网络连接异常,请检查您的网络是否畅通');
            } else {
              alert('获取位置错误,错误消息:' + msg);
              // this.logger.log(msg, '获取位置失败');
              this.toast.msg(msg+'获取位置失败');
            }
            observer.error('获取位置失败');
          });
        }, err => {
          observer.error(err);
        });
      } else {
        console.log('非手机环境,即测试环境返回固定坐标');
        observer.next({'lng': 113.350912, 'lat': 23.119495});
      }
    });
  }

  // 检测app位置服务是否开启
  private assertLocationService = (() => {
    let enabledLocationService = false; // 手机是否开启位置服务
    return () => {
      return Observable.create(observer => {
        if (enabledLocationService) {
          observer.next(true);
        } else {
          this.diagnostic.isLocationEnabled().then(enabled => {
            if (enabled) {
              enabledLocationService = true;
              observer.next(true);
            } else {
              enabledLocationService = false;
              this.alertCtrl.create({
                title: '您未开启位置服务',
                subTitle: '正在获取位置信息',
                buttons: [{text: '取消'},
                  {
                    text: '去开启',
                    handler: () => {
                      this.diagnostic.switchToLocationSettings();
                    }
                  }
                ]
              }).present();
              observer.error(false);
            }
          }).catch(err => {
            // this.logger.log(err, '调用diagnostic.isLocationEnabled方法失败');
            this.toast.msg(err+'调用diagnostic.isLocationEnabled方法失败');
            observer.error(false);
          });
        }
      });
    };
  })();

  // 检测app是否有定位权限,如果没有权限则会请求权限
  private assertLocationAuthorization = (() => {
    let locationAuthorization = false;
    return () => {
      return Observable.create(observer => {
        if (locationAuthorization) {
          observer.next(true);
        } else {
          this.diagnostic.isLocationAuthorized().then(res => {
            if (res) {
              locationAuthorization = true;
              observer.next(true);
            } else {
              locationAuthorization = false;
              this.diagnostic.requestLocationAuthorization('always').then(res => {// 请求定位权限
                if (res == 'DENIED_ALWAYS') {// 拒绝访问状态,必须手动开启
                  locationAuthorization = false;
                  this.alertCtrl.create({
                    title: '缺少定位权限',
                    subTitle: '请在手机设置或app权限管理中开启',
                    buttons: [{text: '取消'},
                      {
                        text: '去开启',
                        handler: () => {
                          this.diagnostic.switchToSettings();
                        }
                      }
                    ]
                  }).present();
                  observer.error(false);
                } else {
                  locationAuthorization = true;
                  observer.next(true);
                }
              }).catch(err => {
                // this.logger.log(err, '调用diagnostic.requestLocationAuthorization方法失败');
                this.toast.msg(err+'调用diagnostic.requestLocationAuthorization方法失败');
                observer.error(false);
              });
            }
          }).catch(err => {
            // this.logger.log(err, '调用diagnostic.isLocationAvailable方法失败');
            this.toast.msg(err+'调用diagnostic.isLocationAvailable方法失败');
            observer.error(false);
          });
        }
      });
    };
  })();


  /**
   * 热更新同步方法
   */
  sync() {
    if (this.isMobile()) {
      let deploymentKey = '';
      if (this.isAndroid() && !this.ENV.isProd) {
        deploymentKey = this.ENV.cordova.android.CodePushDeploymentKey;
      }
      if (this.isAndroid() && this.ENV.isProd) {
        deploymentKey = this.ENV.cordova.android.CodePushDeploymentKey;
      }
      if (this.isIos() && !this.ENV.isProd) {
        deploymentKey = this.ENV.cordova.ios.CodePushDeploymentKey;
      }
      if (this.isIos() && this.ENV.isProd) {
        deploymentKey = this.ENV.cordova.ios.CodePushDeploymentKey;
      }
      this.codePush.sync({
        deploymentKey
      }).subscribe(syncStatus => {
        if (syncStatus == 0) {
          console.log('[CodePush]:app已经是最新版本;syncStatus:' + syncStatus);
        } else if (syncStatus == 3) {
          console.log('[CodePush]:更新出错;syncStatus:' + syncStatus);
        } else if (syncStatus == 5) {
          console.log('[CodePush]:检查是否有更新;syncStatus:' + syncStatus);
        } else if (syncStatus == 7) {
          console.log('[CodePush]:准备下载安装包;syncStatus:' + syncStatus);
        } else if (syncStatus == 8) {
          console.log('[CodePush]:下载完成准备安装;syncStatus:' + syncStatus);
        } else {
          console.log('[CodePush]:syncStatus:' + syncStatus);
        }
      });
    }
  }





}

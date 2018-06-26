import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Component, ViewChild} from '@angular/core';
import {Nav, Platform,NavController} from 'ionic-angular';
import {HttpProvider} from "../http/http";
import {ConfigProvider} from "../config/config";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";


/*
  app 基本方法封装调用
*/
@Injectable()
export class BaseProvider {

  @ViewChild(Nav) nav: Nav;
  constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider,
             public nativePageTransitions: NativePageTransitions) {

  }

  /**
   * 跳转页面（加效果）
   * @param goPage
   */
  // openWin(goPage,params?) {
  //   let options: NativeTransitionOptions = {
  //     direction: 'left',
  //     duration: 400,
  //     slowdownfactor: -1,
  //     iosdelay: 50
  //   };
  //
  //   this.nativePageTransitions.slide(options);
  //   this.nav.push(goPage,params);
  // }





}

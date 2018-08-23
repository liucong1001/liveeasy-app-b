import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PropertyModel} from "../../../../model/property/property.model";
import {StatusBar} from "@ionic-native/status-bar";
import {PropertyProvider} from "../../../../providers/property/property";
import {ArryCodeValuePipe} from "../../../../pipes/arry-code-value/arry-code-value";
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
/**
 * Generated class for the HousmorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-housmore',
  templateUrl: 'housmore.html',
})
export class HousmorePage {
  data:PropertyModel;
  sensitiveData:any;
  localCode:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public statusBar: StatusBar,
    public propertyProvider: PropertyProvider,
    public localStorageProvider: LocalStorageProvider
  ) {
     this.data = navParams.get('item');
     // console.log('房源信息',this.data);
     this.propertyProvider.sensitiveInfo(this.data.propertyId).then(res=>{
       this.sensitiveData = res.success&&res.data.result[0];
       // console.log('敏感信息',this.sensitiveData);
     });
    this.localCode = this.localStorageProvider.get('codeData');


  }

  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad HousmorePage');
  }
  // 联系人
  contactPipe(data){
    return    data&&JSON.parse(data);
  }

}

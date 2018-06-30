import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PropertyModel} from "../../../../model/property/property.model";
import {StatusBar} from "@ionic-native/status-bar";

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public statusBar: StatusBar
  ) {
     this.data = navParams.get('item');
  }

  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HousmorePage');
  }

  jianzhuJ
  // <ion-option value="0">未知</ion-option>
  //   <ion-option value="1" >塔楼</ion-option>
  //   <ion-option value="2">板楼</ion-option>
  //   <ion-option value="3">板塔结合</ion-option>
  buildingTypeJson = [
    {name:'未知',val:'0'},
    {name:'塔楼',val:'1'},
    {name:'板楼',val:'2'},
    {name:'板塔结合',val:'3'},
  ]

  buildingTypePipe(data){
    for(var i in this.buildingTypeJson){
      if(data == this.buildingTypeJson[i].val){
        return this.buildingTypeJson[i].name;
      }
    }
  }

}

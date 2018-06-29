import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ClosehouseProvider} from '../../../providers/closehouse/closehouse'
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
/**
 * Generated class for the CheckhousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkhouse',
  templateUrl: 'checkhouse.html',
})
export class CheckhousePage {
  propertyid:any;
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public  closehouseProvider: ClosehouseProvider,
              public localStorageProvider:LocalStorageProvider) {
    //判断返回data.result是否显示处理申请信息
    this.propertyid=this.localStorageProvider.get('propertyid');
    this.data=this.localStorageProvider.get('data');
    console.log(this.propertyid)
    console.log(this.data)
    this.closehouseProvider.getShow(this.propertyid).then(res => {
      console.log(res);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckhousePage');
  }

}

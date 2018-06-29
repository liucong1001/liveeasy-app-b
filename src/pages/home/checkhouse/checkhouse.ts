import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ClosehouseProvider} from '../../../providers/closehouse/closehouse'
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {PropertyProvider} from "../../../providers/property/property";
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
  loginId:any;
  realtorId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public  closehouseProvider: ClosehouseProvider,
              public localStorageProvider:LocalStorageProvider,public propertyProvider: PropertyProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckhousePage');
  }

}

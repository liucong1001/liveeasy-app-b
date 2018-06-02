import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {PropertyProvider} from "../../providers/property/property";
/**
 * Generated class for the RolepeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rolepeople',
  templateUrl: 'rolepeople.html',
})
export class RolepeoplePage {
  person:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public localStorageProvider: LocalStorageProvider,public propertyProvider: PropertyProvider) {
    console.log(this.localStorageProvider.get('result'))
    this.person=this.localStorageProvider.get('result');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RolepeoplePage');
  }

}

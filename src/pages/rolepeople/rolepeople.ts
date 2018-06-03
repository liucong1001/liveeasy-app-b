import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {PropertyProvider} from "../../providers/property/property";
import {RoleModel} from "../../model/property/role.model";
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
  propertyid:any;
  data:RoleModel;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public localStorageProvider: LocalStorageProvider,public propertyProvider: PropertyProvider) {
    this.propertyid= navParams.get('propertyid');
    console.log(this.propertyid);
    this.propertyProvider.role(this.propertyid).then(res => {
      console.log(res)
      this.data = res.data;
      console.log('获取',this.data);
      console.log('校色人',this.data.initRealtorName)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RolepeoplePage');
  }

}

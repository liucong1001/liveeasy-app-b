import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, Navbar, NavController, NavParams} from 'ionic-angular';
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
import {PropertyProvider} from "../../../../providers/property/property";
import {RoleModel} from "../../../../model/property/role.model";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {NativeProvider} from "../../../../providers/native/native";
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
  @ViewChild(Navbar) navBar: Navbar;
  hasData :boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public nativePageTransitions: NativePageTransitions,
              public localStorageProvider: LocalStorageProvider,public propertyProvider: PropertyProvider,
              public loadingCtrl: LoadingController,public  nativeProvider:NativeProvider,) {
    this.propertyid= navParams.get('propertyid');
    this.propertyProvider.role(this.propertyid).then(res => {
      if(res.success){
        console.log(res);
        this.data = res.data;
        this.hasData = true;
        console.log('获取',this.data);
      }else {
        this.hasData = false;
      }

    });
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.nativeProvider.back(this.navCtrl);
  }
}

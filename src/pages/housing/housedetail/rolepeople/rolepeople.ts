import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, Navbar, NavController, NavParams} from 'ionic-angular';
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
import {PropertyProvider} from "../../../../providers/property/property";
import {RoleModel} from "../../../../model/property/role.model";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public nativePageTransitions: NativePageTransitions,
              public localStorageProvider: LocalStorageProvider,public propertyProvider: PropertyProvider,
              public loadingCtrl: LoadingController) {
    this.propertyid= navParams.get('propertyid');
    console.log(this.propertyid);

    // let loading = this.loadingCtrl.create({
    //   content: '数据加载中...'
    // });
    // loading.present();

    this.propertyProvider.role(this.propertyid).then(res => {
      // loading.dismiss();
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
    console.log('ionViewDidLoad RolepeoplePage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
//------返回处理--------//
  backButtonClick = (e: UIEvent) => {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: 3,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options)
      .then()
      .catch();
    this.navCtrl.pop({animate:false});
  }
}

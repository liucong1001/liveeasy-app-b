import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import { AddpassengerPage } from '../../../mypassenger/addpassenger/addpassenger';
import {ToastComponent} from "../../../../../components/toast/toast";
import {CustomerProvider} from "../../../../../providers/customer/customer";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {PassengerdetailPage} from "../passengerdetail";
/**
 * Generated class for the PfollowrecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pfollowrecord',
  templateUrl: 'pfollowrecord.html',
})
export class PfollowrecordPage {
  fRecord:any;
  params:any;
  customerid:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public statusBar: StatusBar,public navParams: NavParams,public nativePageTransitions: NativePageTransitions,
              public customerProvider:CustomerProvider,
              public toast:ToastComponent,) {
    this.customerid=navParams.get('id').customerId;
    console.log(this.customerid)
    this.params = {customerId:this.customerid}
    this.customerProvider.mfollow(1,{customer:this.params}).then(res => {
      console.log(res.data.result);
      this.fRecord=res.data.result
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PfollowrecordPage');
  }
  addHouse(){
    this.navCtrl.push(AddpassengerPage)
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
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
  //------跳转页面过渡--------//
  openWin(goPage, param = {}) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage, param, {animate:false});
  }
}

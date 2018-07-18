import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {CustomerProvider} from "../../../../providers/customer/customer";
import {ToastComponent} from "../../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {MypassengerPage} from "../mypassenger";
import {ErrorMessage} from "../../../../components/valid-error/valid-error";
import {StatusBar} from "@ionic-native/status-bar";
/**
 * Generated class for the PassengerfollowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passengerfollow',
  templateUrl: 'passengerfollow.html',
})
export class PassengerfollowPage {
  customerid:any;
  clientID:any;
  clientName:any;
  clientPhone:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,
              public statusBar: StatusBar, public navParams: NavParams,
  private fb:FormBuilder,public customerProvider:CustomerProvider,public nativePageTransitions: NativePageTransitions,
              public toast:ToastComponent,) {
    this.clientID=navParams.get('item').customerSn;
    this.clientName=navParams.get('item').customerName;
    this.clientPhone=navParams.get('item').customerPhone;
    this.customerid=navParams.get('item').customerId;
    console.log(this.customerid)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerfollowPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  form:FormGroup =this.fb.group({
    followupCode:['1',Validators.required],
    content:['',[Validators.required]],
  });
  // errors={
  //   content:[
  //     new ErrorMessage('pattern','不能输入特殊符号'),
  //   ],
  // };

  follows(){
    this.customerProvider.prfollow({
      followupCode:this.form.value.followupCode,
      content:this.form.value.content,
      customer:{customerId:this.customerid}
    }).then(res => {
      console.log(res);
      if(res.success){
        this.toast.msg('跟进成功!');
        this.openWin(MypassengerPage)
      }else{
        this.toast.error('跟进失败！');
      }
    });
    console.log(this.form.value)
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

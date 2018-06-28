import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {CustomerProvider} from "../../../../providers/customer/customer";
import {ToastComponent} from "../../../../components/toast/toast";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
/**
 * Generated class for the CloseprivateguestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-closeprivateguest',
  templateUrl: 'closeprivateguest.html',
})
export class CloseprivateguestPage {
  customerid:any;
  clientID:any;
  clientName:any;
  clientPhone:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,public nativePageTransitions: NativePageTransitions,
              private fb:FormBuilder,public customerProvider:CustomerProvider,
              public toast:ToastComponent,) {
    this.clientID=navParams.get('item').customerSn;
    this.clientName=navParams.get('item').customerName;
    this.clientPhone=navParams.get('item').customerPhone;
    this.customerid=navParams.get('item').customerId;
    console.log(this.customerid)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CloseprivateguestPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
  form:FormGroup =this.fb.group({
    content:['',Validators.required],
    customerStatus:['',Validators.required],
  });
  closes(){
    this.customerProvider.prclose({
      customerStatus:this.form.value.customerStatus,
      content:this.form.value.content,
      customerId:this.customerid
    }).then(res => {
      console.log(res);
      if(res.success){
        this.toast.msg('关闭成功!');
        this.navCtrl.pop()
      }else{
        this.toast.error('关闭失败！');
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
}

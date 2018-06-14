import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerProvider} from "../../../../providers/customer/customer";
import {ToastComponent} from "../../../../components/toast/toast";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
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

}

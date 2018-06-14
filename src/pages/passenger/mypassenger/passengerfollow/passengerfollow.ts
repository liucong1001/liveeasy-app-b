import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {CustomerProvider} from "../../../../providers/customer/customer";
import {ToastComponent} from "../../../../components/toast/toast";
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
    console.log('ionViewDidLoad PassengerfollowPage');
  }
  form:FormGroup =this.fb.group({
    followupCode:['1',Validators.required],
    content:['',Validators.required],
  });

  follows(){
    this.customerProvider.prfollow({
      followupCode:this.form.value.followupCode,
      content:this.form.value.content,
      customer:{customerId:this.customerid}
    }).then(res => {
      console.log(res);
      if(res.success){
        this.toast.msg('跟进成功!');
        this.navCtrl.pop()
      }else{
        this.toast.error('跟进失败！');
      }
    });
    console.log(this.form.value)
  }

}

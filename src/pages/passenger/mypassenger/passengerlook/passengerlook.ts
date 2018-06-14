import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerProvider} from "../../../../providers/customer/customer";
import {ToastComponent} from "../../../../components/toast/toast";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SearchPage} from "../search/search";
@IonicPage()
@Component({
  selector: 'page-passengerlook',
  templateUrl: 'passengerlook.html',
})
export class PassengerlookPage {
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
    console.log('ionViewDidLoad PassengerlookPage');
  }
  form:FormGroup =this.fb.group({
    propertyId:[''],
    appointmentTm:['',Validators.required],
  });

  fy(){
    this.navCtrl.push(SearchPage)
  }
  looks(){
    this.customerProvider.prlook({
      propertyId:this.form.value.propertyId,
      appointmentTm:new Date(this.form.value.appointmentTm).getTime(),
      customer:{customerId:this.customerid}
    }).then(res => {
      console.log(res);
      if(res.success){
        this.toast.msg('约看成功!');
        this.navCtrl.pop()
      }else{
        this.toast.error('约看失败！');
      }
    });
    console.log(this.form.value)
  }
}

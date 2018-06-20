import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CustomerProvider} from "../../../../../providers/customer/customer";
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {ToastComponent} from "../../../../../components/toast/toast";
import {PlookrecordPage} from "../plookrecord";
import {PassengerdetailPage} from "../../passengerdetail";
/**
 * Generated class for the ClosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-close',
  templateUrl: 'close.html',
})
export class ClosePage {
  followupId:any;
  customerid:any;
  constructor(public navCtrl: NavController,
              public toast:ToastComponent,
              private fb:FormBuilder, public navParams: NavParams,public customerProvider:CustomerProvider,) {
    this.customerid=navParams.get('item');
    console.log(this.customerid)
    this.followupId=navParams.get('item').followupId;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClosePage');
  }
  form:FormGroup =this.fb.group({
    content:['',Validators.required],//内容
  });
  sub(){
    this.customerProvider.mfinish(this.followupId,3,this.form.value.content).then(res => {
      console.log(res);
      if(res.success){
        this.toast.msg('关闭成功');
        // this.navCtrl.push(PlookrecordPage,{customerId:this.customerid})
        this.navCtrl.pop();
      }else {
        this.toast.error('关闭失败')
      }
    });
  }
}

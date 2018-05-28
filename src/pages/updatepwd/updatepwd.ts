import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {UpdatepwdProvider} from '../../providers/updatepwd/updatepwd'
import {HttpClient} from '@angular/common/http';
import {LocalStorageProvider} from  '../../providers/local-storage/local-storage'
import {ErrorMessage} from "../../components/valid-error/valid-error";
import {AccountPage} from "../account/account";
@IonicPage()
@Component({
  selector: 'page-updatepwd',
  templateUrl: 'updatepwd.html',
})
export class UpdatepwdPage {
  loginName:string;
  tips=false;
  pwd=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient,
              public  updprovider: UpdatepwdProvider,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,) {
    this.loginName = this.localStorageProvider.get('loginName');
    console.log(this.loginName)
  }
  form:FormGroup =this.fb.group({
    plainPassword:['',Validators.required], //旧密码
    newPassword:['',Validators.required],//新密码
    verifyPassword:[''],//确认新密码
  });
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatepwdPage');
  }
  update(){
    if (this.form.value.plainPassword != '') {
      this.updprovider.getoldPassword({plainPassword:this.form.value.plainPassword}).then(res => {
        console.log(res);
        if (res.data == true && this.form.value.newPassword == this.form.value.verifyPassword){
          // alert('密码正确');
          this.pwd=false;
          this.updprovider.postPassword({newPassword:this.form.value.newPassword,loginName:this.loginName}).then(res => {
            console.log(res)
            this.navCtrl.push(AccountPage)
          });
        }else {
          // alert('旧密码不正确');
          this.pwd=true;
        }
      })
    }
    if(this.form.value.newPassword != this.form.value.verifyPassword){
      this.tips=true;
    }else {
      this.tips = false;
    }
  }

}

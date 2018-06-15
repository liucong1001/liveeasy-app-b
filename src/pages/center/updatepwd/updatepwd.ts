import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {UpdatepwdProvider} from '../../../providers/updatepwd/updatepwd'
import {HttpClient} from '@angular/common/http';
import {LocalStorageProvider} from '../../../providers/local-storage/local-storage'
import {ErrorMessage} from "../../../components/valid-error/valid-error";
import {AccountPage} from "../../account/account";
import {tick} from "@angular/core/testing";
import {ToastComponent} from "../../../components/toast/toast";
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
              public http: HttpClient,public toast:ToastComponent,
              public  updprovider: UpdatepwdProvider,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,) {
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
        if (res.data == true){
          console.log('旧密码正确');
          this.pwd=false;
          this.updprovider.postPassword(this.form.value.plainPassword,this.form.value.newPassword).then(res => {
            if(res.success){
              console.log(this.form.value.plainPassword)
              console.log(res);
              this.localStorageProvider.del('ticket');
              this.navCtrl.push(AccountPage)
            }else {
              console.log(res)
              this.toast.error('新旧密码不一致，请重新填写')
            }
          });
        }else {
          this.pwd=true;
        }
      })
    }
    if(this.form.value.newPassword != ''){
      var reg = /^[\da-z]+$/i;
      if (!reg.test(this.form.value.newPassword)) {
        alert('请使用6-21字母和数字填写');
      }
    }
  }

}

import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {UpdatepwdProvider} from '../../../providers/updatepwd/updatepwd'
import {HttpClient} from '@angular/common/http';
import {LocalStorageProvider} from '../../../providers/local-storage/local-storage'
import {ErrorMessage} from "../../../components/valid-error/valid-error";
import {tick} from "@angular/core/testing";
import {ToastComponent} from "../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {LoginPage} from "../../login/login";
import {HousingPage} from "../../housing/housing";
@IonicPage()
@Component({
  selector: 'page-updatepwd',
  templateUrl: 'updatepwd.html',
})
export class UpdatepwdPage {
  loginName:string;
  tips=false;
  pwd=false;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient,public toast:ToastComponent,
              public  updprovider: UpdatepwdProvider,public nativePageTransitions: NativePageTransitions,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,) {
  }
  form:FormGroup =this.fb.group({
    plainPassword:['',Validators.required], //旧密码
    newPassword:['',[Validators.pattern(/^[A-Za-z0-9]+$/)]],//新密码
    // verifyPassword:[''],//确认新密码
  });
  errors= {
    newPassword: [
      new ErrorMessage('pattern', '请填写6-21位字母或数字'),
    ],
  };
  //表单验证消息
  ionViewDidLoad() {
    // console.log('ionViewDidLoad UpdatepwdPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }

  update(){
    if (this.form.value.plainPassword != '') {
      this.updprovider.postPassword(this.form.value.plainPassword,this.form.value.newPassword).then(res => {
              if(res.success){
                this.localStorageProvider.del('ticket');
                this.toast.msg('修改密码成功');
                setTimeout(()=>{
                  this.navCtrl.push(LoginPage)
                },500);

              }else {
                // console.log(res.msg)
                var reg=/^[\u4E00-\u9FA5]+$/;
                // if(!reg.test(res.msg)){
                //   this.toast.error('旧密码错误，请重新填写')
                // }else {
                  this.toast.error(res.msg)
                // }
              }
            });
    }

  }
  lengthTips=false;
  checkes(){
    if(this.form.value.newPassword != ''){
      if(this.form.value.newPassword.length >=21){
        this.lengthTips=true
      }else {
        this.lengthTips=false;
      }


    }
  }
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

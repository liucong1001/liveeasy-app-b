import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,App  } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {HttpClient} from '@angular/common/http';
import {TabsPage} from "../tabs/tabs";
import {LoginProvider} from '../../providers/login/login'
import {LocalStorageProvider} from  '../../providers/local-storage/local-storage'
import {ToastComponent} from "../../components/toast/toast";
import {BackButtonProvider} from "../../providers/common/backButton";
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {
    username:string = 'mylangyi';
    password:string = 'le123456';
    url:string = "/login";
    loginBtn:boolean = false ;
    constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
                public loginProvider:LoginProvider,public localStorageProvider:LocalStorageProvider,
               public toast:ToastComponent,public backButtonProvider:BackButtonProvider,private platform: Platform,
                private app: App) {

              // this.platform.ready().then(() => {
              //   this.backButtonProvider.registerBackButtonAction(null);
              // });
    }


    ionViewDidLoad() {
      // 存储系统中存在登录ticket记录直接跳转到主界面
      if(this.localStorageProvider.get('ticket')){
        this.navCtrl.push(TabsPage);
      }
    }
    goLogin(){
        this.navCtrl.setRoot(LoginPage);
    }

    login(){
        this.loginBtn = true;
        this.loginProvider.login(this.username,this.password).then(res=>{
            if(res.success){
              this.loginBtn = false;
              this.navCtrl.push(TabsPage);
              this.app.getRootNav().setRoot(TabsPage);
              this.localStorageProvider.set('loginInfo',res.data);
              //存相关信息
              this.localStorageProvider.set('loginName',res.data.loginName);
              this.localStorageProvider.set('ticket',res.ticket);
            }else{
              this.loginBtn = false;
              this.toast.defaultMsg('top','账号或密码有误!');
            }
        }).catch(err=>{
          this.loginBtn = false;
          this.toast.defaultMsg('top','登录失败');
            // alert('登录失败');
            // console.log('失败',err.error.msg);
        })
    }

}

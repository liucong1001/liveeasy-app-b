import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,App  } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {TabsPage} from "../tabs/tabs";
import {LoginProvider} from '../../providers/login/login'
import {LocalStorageProvider} from  '../../providers/local-storage/local-storage'
import {ToastComponent} from "../../components/toast/toast";
import {BackButtonProvider} from "../../providers/common/backButton";
import {StatusBar} from "@ionic-native/status-bar";
import {ConfigProvider} from "../../providers/config/config";
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string = '';
  password:string = '';
  url:string = "/login";
  loginBtn:boolean = false ;
  permissionList = []; //权限存储
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
              public loginProvider:LoginProvider,public localStorageProvider:LocalStorageProvider,
              public toast:ToastComponent,public backButtonProvider:BackButtonProvider,private statusBar: StatusBar,
              private app: App, private configProvider:ConfigProvider) {

    // this.platform.ready().then(() => {
    //   this.backButtonProvider.registerBackButtonAction(null);
    // });
  }

  ionViewWillEnter() {
    this.statusBar.styleDefault();
  }
  ionViewDidLoad() {
    // 存储系统中存在登录ticket记录直接跳转到主界面
    if(this.localStorageProvider.get('ticket')){
      this.app.getRootNavs()[0].setRoot(TabsPage);
    }
  }
  goLogin(){
    this.app.getRootNavs()[0].setRoot(LoginPage);
  }

  login(){
    this.loginBtn = true;
    this.loginProvider.login(this.username,this.password).then(res=>{
      if(res.success){
        this.loginBtn = false;

        this.localStorageProvider.set('loginInfo',res.data);
        //存相关信息
        this.localStorageProvider.set('loginName',res.data.loginName);
        this.localStorageProvider.set('ticket',res.data.ticket);


        //权限
        console.log('权限',res.data.menus);
        this.findPermission(res.data.menus);
        this.localStorageProvider.set('permissionArry',this.permissionArry);
        console.log('结果',this.permissionArry);

        // this.navCtrl.push(TabsPage);

        this.app.getRootNavs()[0].setRoot(TabsPage);


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
  permissionArry =[];
  // 遍历树
  findPermission(data){
    for(var i in data){
      if(data[i].permission){
        // console.log('权限值',data[i].permission);
        this.permissionArry.push(data[i].permission);
      }
      this.findPermission(data[i].childrens);
    }
  }


}


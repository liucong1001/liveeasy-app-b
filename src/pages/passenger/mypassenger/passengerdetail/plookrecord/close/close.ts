import {Component, ViewChild, Renderer} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams,Searchbar} from 'ionic-angular';
import {CustomerProvider} from "../../../../../../providers/customer/customer";
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {ToastComponent} from "../../../../../../components/toast/toast";
import {PlookrecordPage} from "../plookrecord";
import {PassengerdetailPage} from "../../passengerdetail";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
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
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('searchBar') searchBar:Searchbar;
  constructor(public navCtrl: NavController,private renderer:Renderer,
              public toast:ToastComponent,public nativePageTransitions: NativePageTransitions,public statusBar: StatusBar,
              private fb:FormBuilder, public navParams: NavParams,public customerProvider:CustomerProvider,) {
    this.customerid=navParams.get('item');
    console.log(this.customerid)
    this.followupId=navParams.get('item').followupId;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClosePage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
  form:FormGroup =this.fb.group({
    content:['',Validators.required],//内容
  });
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  sub(){
    this.customerProvider.mfinish(this.followupId,3,this.form.value.content).then(res => {
      console.log(res);
      if(res.success){
        this.toast.msg('关闭成功');
        setTimeout(()=>{
          this.openWin(PlookrecordPage);
        },200);
      }else {
        this.toast.error('关闭失败')
      }
    });
  }

  //禁用调出键盘
  ionViewDidEnter(){
    let input = this.searchBar.getElementRef().nativeElement.querySelector('input');
    this.renderer.setElementAttribute(input, 'disabled', 'true');

    this.navBar.backButtonClick = () => {
      // this.navCtrl.push(HomesearchPage);
      this.navCtrl.popToRoot();
    };

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
  //------跳转页面过渡--------//
  openWin(goPage, param = {}) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage, param, {animate:false});
  }
}

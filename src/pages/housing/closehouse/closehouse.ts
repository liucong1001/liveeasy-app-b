import {Component,Renderer, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, Navbar, Searchbar, Select} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {ClosehouseProvider} from '../../../providers/closehouse/closehouse'
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {HttpClient} from '@angular/common/http';
import {HousingPage} from "../../housing/housing";
import {PropertyProvider} from "../../../providers/property/property";
import {ToastComponent} from "../../../components/toast/toast";
import {BelongerPage} from "./belonger/belonger";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {ErrorMessage} from "../../../components/valid-error/valid-error";
/**
 * Generated class for the ClosehousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-closehouse',
  templateUrl: 'closehouse.html',
})
export class ClosehousePage {
  propertyid:any;
  closetime:any;
  estatename:any;
  convid:any;
  standardAddress:any;
  realtorId:any;
  loginId:any;
  subs=true;
  applic=false;
  pending=false;
  data:any;
  realtorSourceId:any;
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('searchBar') searchBar:Searchbar;
  @ViewChild('select') select: Select;
  result:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              public http: HttpClient,public toast:ToastComponent,private renderer:Renderer,
              public  closehouseProvider: ClosehouseProvider,public nativePageTransitions: NativePageTransitions,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,public propertyProvider: PropertyProvider) {
    this.propertyid = navParams.get('propertyid');
    this.loginId=this.localStorageProvider.get('loginInfo').user.id;
    this.data = navParams.get('item');

    this.propertyProvider.getRecord(this.propertyid).then(res=>{
      if(res.success){
        this.result=res.data;
        console.log(this.result);
        this.estatename = this.result.estateName;
        this.convid = this.result.convId;
        this.standardAddress = this.result.standardAddress;
        this.closetime=new Date().getTime();
        this.realtorId = this.data.realtorId;
        this.realtorSourceId=this.data.realtorSourceId;
        if(!(this.result.applyStatus&&this.result.closePropertyShow)){
           this.toast.delayToast('暂时不支持关闭');
        }
      }

    });



  }
  selectTitle(data){
    var title = {title:data};
    return title;
  }
  form:FormGroup =this.fb.group({
    propertyStatus:['',Validators.required],
    invalidReason:[''],
    closeDesc:['',[Validators.required]],
  });

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ClosehousePage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
  ionViewWillLeave(){
    this.select.close();
  }

  subClose(){
      var data = {
        propertyId:this.propertyid,
        propertyStatus:this.form.value.propertyStatus,
        closeDesc:this.form.value.closeDesc,
        invalidReason:this.form.value.invalidReason
      };
      if(this.form.value.propertyStatus!=128){
        delete  data.invalidReason;
      }

    this.closehouseProvider.getClose(data).then(res => {
        if(res.success){
          this.toast.msg('关闭成功!');
          this.navCtrl.pop();
        }else{
          this.toast.error('关闭失败！');
        }
      });

  }

  subApplic(){
    // console.log(this.propertyid)
    this.closehouseProvider.getClose({
      propertyId:this.propertyid,
      //当前操作人id
      propertyStatus:parseInt(this.form.value.propertyStatus),
      // closeTime:this.closetime,
      invalidReason:this.form.value.invalidReason,
      closeDesc:this.form.value.closeDesc,
      applyTime:new Date().getTime(),
      realtorId:this.realtorSourceId
    }).then(res => {
      // console.log(res);
      if(res.success){
        this.localStorageProvider.set('propertyid',this.propertyid);
        this.localStorageProvider.set('data',this.form.value);
        this.navCtrl.parent.select(1);
        this.toast.msg('提交成功，请等候归属人同意!');
      }
    });
  }
  pendings(){
    this.openWin(BelongerPage,{
      data:this.form.value,
    })
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

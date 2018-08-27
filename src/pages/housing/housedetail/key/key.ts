import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, Navbar} from 'ionic-angular';
import {PropertyProvider} from "../../../../providers/property/property";
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {HousedetailPage} from "../housedetail";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ConfigProvider} from "../../../../providers/config/config";
import {ToastComponent} from "../../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

/**
  钥匙页面
 auditStatus ：1 通过    2.不通过    3.审核中
 */

@IonicPage()
@Component({
  selector: 'page-key',
  templateUrl: 'key.html',
})
export class KeyPage {
  propertyid:any;
  attorneys:any;
  sub=true;
  update=false;
  data:any;
  keydelegateid:any;
  path: string;
  useDir:string;
  imgHeader: string;
  imgJson :any;
  edit = false;
  maxImagesCount = true;
  keyData:any;
  res:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public propertyProvider: PropertyProvider,private camera: Camera, public nativePageTransitions: NativePageTransitions,
              private fb:FormBuilder,public configProvider: ConfigProvider,public toast:ToastComponent,
              public localStorageProvider:LocalStorageProvider,public actionSheetCtrl: ActionSheetController,) {
    this.propertyid= navParams.get('propertyid');
    //钥匙信息
    this.propertyProvider.keydetail(this.propertyid).then(res=>{
      this.res=res;
      if(res.success&&res.data){
            this.data = res.data;
            this.keyData = JSON.parse(res.data.content.toString());
            this.form.patchValue({
              keySn: this.keyData.keysn,
              keyAddress: this.keyData.keyAddress,
              keyDlgtFilePics: this.keyData.keyDlgtFilePics,
            });
            this.imgJson=this.keyData.keyDlgtFilePics;
     }else {
        this.imgJson= [];
      }
      console.log('图片信息',this.imgJson);
    });

  }
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    this.attorneys=new Date().getTime();
    this.imgHeader = this.configProvider.set().img;
  }
//进入页面后执行
  ionViewDidEnter(){
  }

  form:FormGroup =this.fb.group({
    keySn:['',Validators.required],
    keyAddress:['',Validators.required],
    keyDlgtFilePics:[''],
  });
  isDisabled = false;
//上传钥匙信息
  goYc(){
    var data = {
      propertyId:this.propertyid,
      createTime:this.attorneys,
      keySn:this.form.value.keySn,
      keyAddress:this.form.value.keyAddress,
      keyDlgtFilePics:JSON.stringify(this.imgData),
    };
    // console.log('参数',data);
    this.isDisabled = true;
    this.propertyProvider.key({
      propertyId:this.propertyid,
      createTime:this.attorneys,
      keySn:this.form.value.keySn,
      keyAddress:this.form.value.keyAddress,
      keyDlgtFilePics:JSON.stringify(this.imgData),
    }).then(res => {
      // console.log(res);
      if(res.success){
        this.toast.msg('上传成功!');
        setTimeout(()=>{
           this.navCtrl.pop();
        },500)
      }else{
        this.toast.error('上传失败！');
        this.isDisabled = false;
      }
    });
    // console.log(this.form.value);
  }
  // JSON.stringify(this.imgData)
  imgData = [];

  yaoChi(event){
    this.imgData = event.data;
    if(this.imgData.length==1){
       this.maxImagesCount = false;
    }else {
      this.maxImagesCount = true;
    }
    // console.log('图片回调事件',this.imgData,this.imgData.length,event);
  }

  //修改钥匙信息
  updateYc(){

    var  data = {
      propertyId:this.propertyid,
      keySn:this.form.value.keySn,
      keyAddress:this.form.value.keyAddress,
      keyDlgtFilePics:JSON.stringify(this.imgData),
    };
    console.log('修改',data);
    this.isDisabled = true;
    this.propertyProvider.keyupdate({
      propertyId:this.propertyid,
      keySn:this.form.value.keySn,
      keyAddress:this.form.value.keyAddress,
      keyDlgtFilePics:JSON.stringify(this.imgData),
    }).then(res => {
      // console.log(res);
      if(res.success){
         this.toast.msg('修改成功!');
         setTimeout(()=>{
           this.navCtrl.pop();
         },500);
      }else{
        this.toast.error('修改失败！');
        this.isDisabled = false;
      }
    });
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

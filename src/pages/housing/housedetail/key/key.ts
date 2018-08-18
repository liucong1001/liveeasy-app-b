import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, Navbar} from 'ionic-angular';
import {PropertyProvider} from "../../../../providers/property/property";
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {HousedetailPage} from "../housedetail";
import {LetteratorneyPage} from "../letteratorney/letteratorney";
import {HousingPage} from "../../housing";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ConfigProvider} from "../../../../providers/config/config";
import {ToastComponent} from "../../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the KeyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public propertyProvider: PropertyProvider,private camera: Camera, public nativePageTransitions: NativePageTransitions,
              private fb:FormBuilder,public configProvider: ConfigProvider,public toast:ToastComponent,
              public localStorageProvider:LocalStorageProvider,public actionSheetCtrl: ActionSheetController,) {
    this.propertyid= navParams.get('propertyid');
    // this.data = navParams.get('item');
    // console.log('参数',this.propertyid,this.data);
    // this.propertyProvider.keydetail(this.propertyid).then(res => {
    //   if(res.hasOwnProperty('data')){
    //     this.keydelegateid= res.data.keyDelegateId;
    //     this.data = res.data;
    //     this.form.patchValue({
    //       keySn: res.data.keySn,
    //       keyAddress: res.data.keyAddress,
    //       keyDlgtFilePics: res.data.keyDlgtFilePics,
    //     });
    //     this.update=true;
    //     this.sub=false;
    //   }
    //   //钥匙图片显示
    //   if(res.hasOwnProperty('data')){
    //     this.imgJson = JSON.parse(this.data.keyDlgtFilePics); //默认展示有图片
    //     console.log(this.imgJson)
    //   }else{
    //     this.edit = true;
    //   }
    // });

    //钥匙信息
    this.propertyProvider.keydetail(this.propertyid).then(res=>{
      if(res.success&&res.data){
            this.data = res.data;
            this.keyData = JSON.parse(res.data.content.toString());
            // console.log('药匙详情',this.keyData,this.data);
            this.form.patchValue({
              keySn: this.keyData.keysn,
              keyAddress: this.keyData.keyAddress,
              keyDlgtFilePics: this.keyData.keyDlgtFilePics,
            });
            this.imgJson=this.keyData.keyDlgtFilePics;
            // console.log('图片',this.imgJson);
     }else {
        this.imgJson= [];
      }
    });

  }
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    this.attorneys=new Date().getTime();
    this.imgHeader = this.configProvider.set().img;
  }
//进入页面后执行
  ionViewDidEnter(){
    this.navBar.backButtonClick = () => {
      this.openWin(HousedetailPage,{propertyId:this.propertyid});
    };
  }

  form:FormGroup =this.fb.group({
    keySn:['',Validators.required],
    keyAddress:['',Validators.required],
    keyDlgtFilePics:[''],
  });
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
      }
      // alert('上传成功');
      // this.navCtrl.pop()
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
           this.navCtrl.push(HousedetailPage,{propertyId:this.propertyid});
         },500)
      }else{
        this.toast.error('修改失败！');
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

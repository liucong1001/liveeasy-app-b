 import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, Navbar} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {HousingPage} from "../../housing";
import {PropertyProvider} from "../../../../providers/property/property";
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
import {ErrorMessage} from "../../../../components/valid-error/valid-error";
import {HousedetailPage} from "../housedetail";
import {ConfigProvider} from "../../../../providers/config/config";
import {ToastComponent} from "../../../../components/toast/toast";
 import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

/**
  房源 -  业主委托书
 */

@IonicPage()
@Component({
  selector: 'page-letteratorney',
  templateUrl: 'letteratorney.html',
})
export class LetteratorneyPage {
  path: string;
  propertyid:any;
  attorneys:any;
  sub=true;
  upd=false;
  delegateDocId:any;
  data:any;
  timeCheck = false;
  useDir:string;
  imgHeader: string;
  imgJson :any;
  edit = false;
  noPermission=false;
  permission=true;
  agentname:any;
  maxImagesCount = true;
  @ViewChild(Navbar) navBar: Navbar;
  content:any;
  constructor(public navCtrl: NavController,public propertyProvider: PropertyProvider,
              public localStorageProvider:LocalStorageProvider, public nativePageTransitions: NativePageTransitions,
              private camera: Camera,public toast:ToastComponent,
              public navParams: NavParams,public configProvider: ConfigProvider,
              private fb:FormBuilder,public actionSheetCtrl: ActionSheetController) {
    this.propertyid = navParams.get('propertyid');
    this.useDir = navParams.get('estateId')+'/'+this.propertyid+'/';
    //委托书详情
    this.propertyProvider.adetail(this.propertyid).then(res => {
      if(res.success){
        this.data= res.data;
        this.content = JSON.parse(res.data.content) ;
        console.log('解释时间',  typeof (this.content.delegateEndTm));
        this.delegateDocId= res.data.delegateDocId;
        this.form.patchValue({
          delegateDocSn:this.content.delegateDocSn,
          delegateBeginTm:this.content.delegateBeginTm &&new Date(parseFloat(this.content.delegateBeginTm)).toISOString(),
          delegateEndTm: this.content.delegateEndTm&&this.content.delegateEndTm!='null'&&this.content.delegateEndTm!='-1'&&new Date(parseFloat(this.content.delegateEndTm)).toISOString(),
          delegateDocPics:this.content.delegateDocPics,
          delegateStyle:this.content.delegateStyle
        });
        this.sub=false;
        this.upd=true;
        this.imgJson = this.content.delegateDocPics; //默认展示有图片
        console.log('委托书详情',this.content.delegateDocPics);
      }else {
        this.imgJson = [];
      }
      console.log('图片',this.imgJson);
    });

  }


  //进入页面后执行
  ionViewDidEnter(){

  }
  ionViewDidLoad() {
    this.attorneys=new Date().getTime();
    this.imgHeader = this.configProvider.set().img;
  }

  form:FormGroup =this.fb.group({
    delegateDocSn:['',[Validators.required, Validators.pattern(/^[\da-zA-Z]+$/)]], //委托书编号
    delegateBeginTm:['',Validators.required],//起始时间
    delegateEndTm:[''],//结束时间
    delegateDocPics:[''],//委托书图片
    delegateStyle:[] //状态
  });

  //表单验证消息
  errors={
    delegateDocSn:[
      new ErrorMessage('required','委托书编号必须要填写！'),
      new ErrorMessage('pattern','只能输入数字和字母'),
    ],
    delegateBeginTm:[
      new ErrorMessage('required','起始时间必须要填写！'),
    ],
    delegateEndTm:[

    ],
  };

  isDisabled = false;

  //上传业主委托书
  go(){

    if(parseFloat(this.form.value.delegateStyle)==2){
       var endTime  = -1;
    }else {
       var endTime= new Date(this.form.value.delegateEndTm).getTime();
    }
   this.isDisabled = true;
   this.propertyProvider.attorney({
      delegateStyle:this.form.value.delegateStyle,
      propertyId:this.propertyid,
      createTime:this.attorneys,
      delegateDocSn:this.form.value.delegateDocSn,
      delegateBeginTm:new Date(this.form.value.delegateBeginTm).getTime(),
      delegateEndTm:endTime,
      delegateDocPics: JSON.stringify(this.imgData),
    }).then(res => {
      console.log(res);
      if(res.success){
        this.toast.msg('上传成功!');
        setTimeout(()=>{
          this.navCtrl.pop();
        },500);
        this.isDisabled = false;
      }else{
        this.toast.error('上传失败！');
        this.isDisabled = false;
      }
      // alert('上传成功！')
      // this.navCtrl.pop()
    });

    // console.log(new Date(this.form.value.delegateBeginTm).getTime());
    // console.log(new Date(this.form.value.delegateEndTm).getTime())
  }

  /**
   * 验证时间
   */
  timeCompare(){
     if(this.form.value.delegateBeginTm&&this.form.value.delegateEndTm){
       var startTime = new Date(Date.parse(this.form.value.delegateBeginTm.replace("-","/")));
       var endTime = new Date(Date.parse(this.form.value.delegateEndTm.replace("-","/")));
       if(startTime>endTime){
         console.log('开始时间必须小于结束时间');
         this.timeCheck = true;
       }else {
         this.timeCheck = false;
       }
       // console.log('表单',this.form.value,'开始时间',startTime,'结束时间',endTime);
     }


  }
  imgData = [];
  //委托书
  weiTuo(event){
    this.imgData = event.data;
    if(this.imgData.length==1){
      this.maxImagesCount = false;
    }else {
      this.maxImagesCount = true;
    }
    console.log('图片数据',this.imgData,this.imgData.length,this.maxImagesCount);
  }

  change(event){
    console.log('改变',event);
    if(event==2){
      this.form.value.delegateEndTm= -1;
    }
    if(event==1){
      console.log( this.form.value.delegateEndTm);
    }

  }

  //修改业主委托书
  upYz(){
    console.log('提交数据',JSON.stringify(this.imgData));

    if(parseFloat(this.form.value.delegateStyle)==2){
      var endTime  = -1;
    }else {
      var endTime= new Date(this.form.value.delegateEndTm).getTime();
    }
    if(parseFloat(this.form.value.delegateStyle)==1&&!this.form.value.delegateEndTm){
      this.toast.msg('请检查是否填写完整!');
      return  false;
    }
    this.isDisabled = true;
   this.propertyProvider.aupdate({
      delegateDocId:this.delegateDocId,
      delegateStyle:parseFloat(this.form.value.delegateStyle) ,
      propertyId:this.propertyid,
      createTime:this.attorneys,
      delegateDocSn:this.form.value.delegateDocSn,
      delegateBeginTm:new Date(this.form.value.delegateBeginTm).getTime(),
      delegateEndTm:endTime,
      delegateDocPics: JSON.stringify(this.imgData),
      delegateDocInfoEntity:this.data,
    }).then(res => {
      console.log(res);
      if(res.success){
        this.toast.msg('修改成功!');
        setTimeout(()=>{
          this.navCtrl.pop();
        });
        this.isDisabled = false;
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

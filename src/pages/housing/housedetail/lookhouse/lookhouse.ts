import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, Navbar} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {PropertyModel} from "../../../../model/property/property.model";
import {PropertyProvider} from "../../../../providers/property/property";
import {ConfigProvider} from "../../../../providers/config/config";
import {HousedetailPage} from "../housedetail";
import {ToastComponent} from "../../../../components/toast/toast";
import { PhotoViewer } from '@ionic-native/photo-viewer';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";



/**
  房源 - 实勘图
 */

@IonicPage()
@Component({
  selector: 'page-lookhouse',
  templateUrl: 'lookhouse.html',
})
export class LookhousePage {
  path: string;
  data:PropertyModel;
  useDir :string;
  formData = {
     arrPic:'',
     propertyId:'',
  };
  imgHeader: string; //线上图片默认头地址
  imgJson :any;
  edit = false;
  createdTime:any;
  nowTime:any;
  timer:any;
  wrap:any;
  showTip = false;
  @ViewChild(Navbar) navBar: Navbar;
  propertyId:any;
  lockhoseDetail:any;
  isCreater:boolean;
  constructor(public navCtrl: NavController, public nativePageTransitions: NativePageTransitions,
              private camera: Camera,public toast:ToastComponent, public navParams: NavParams
              ,public actionSheetCtrl: ActionSheetController,
              public propertyProvider:PropertyProvider, public configProvider: ConfigProvider,
              private photoViewer: PhotoViewer,public localStorageProvider:LocalStorageProvider) {
    this.data = navParams.get('item');
    this.propertyId = navParams.get('propertyId');


    this.propertyProvider.shikanDetail(this.propertyId).then(res=>{
      this.lockhoseDetail = res.data;
      console.log('房源详情',this.lockhoseDetail);
      if(this.lockhoseDetail.submitter==this.localStorageProvider.get('loginInfo').id&&this.lockhoseDetail.auditStatus==3){
        this.imgJson = JSON.parse(this.lockhoseDetail.content).propertyPics;
        console.log('房源图片', JSON.parse(this.lockhoseDetail.content).propertyPics);
      }else if(this.lockhoseDetail.pics) {
        this.imgJson = this.lockhoseDetail.pics&&JSON.parse(this.lockhoseDetail.pics);
      }
      /**
       * 判断是不是自己录入的房源  （24小时之内可以上传实勘图）
       */
      if(res.data&&res.data.creater ==this.localStorageProvider.get('loginInfo').id){
         this.isCreater = true;
      }else {
         this.isCreater = false;
      }

      if(!this.lockhoseDetail.content){
        this.imgJson =[];
      }



    });


    //获取时间
    function getOffsetDays(time1, time2) {
      var offsetTime = Math.abs(time1 - time2);
      return Math.floor(offsetTime / (3600 * 24 * 1e3));
    }

     this.wrap = getOffsetDays(Date.now(), (new Date(navParams.get('item').createdTime)).getTime());
      if(this.wrap==0){
      this.showTip = true;
     } else {
        this.showTip = false;
    }

    this.formData.propertyId = this.data.propertyId;
    this.useDir = this.data.estateId+'/'+this.data.propertyId+'/';

  }


 imgData = [];
  ionViewDidLoad() {

    this.imgHeader = this.configProvider.set().img;
  }


  menPaiImg = [];
  menPai(event){
    this.menPaiImg = event.data;
    // console.log('表单数据',this.menPaiImg);
  }
  huxinImg = [];
  huXin(event){
    // console.log('户型图',event);
    this.huxinImg = event.data;

  }
  keTinImg = [];
  keTin(event){
    // console.log('客厅图',event);
    // this.imgData.push(event.pic);
    this.keTinImg = event.data;
  }
  woShiImg = [];
  woShi(event){
    // console.log('卧室图',event);
    // this.imgData.push(event.pic);
    this.woShiImg = event.data;
  }
  chuFangImg = [];
  chuFang(event){
    // console.log('厨房图',event);
    // this.imgData.push(event.pic);
    this.chuFangImg = event.data;
  }
  woShenJianImg = [];
  woShenJian(event){
    // console.log('卫生间图',event);
    // this.imgData.push(event.pic);
    this.woShenJianImg = event.data;

  }
  otherImg = [];
  other(event){
    // console.log('其他图',event);
    // this.imgData.push(event.pic);
    this.otherImg = event.data;
  }

  addArry(item,data){
     for(var i in item){
        data.push(item[i]);
     }
  }

  //进入页面后执行
  ionViewDidEnter(){
    this.navBar.backButtonClick = () => {
      this.openWin(HousedetailPage,{propertyId:this.data.propertyId});
    };
  }

  save(){
    // this.imgData = [];
    // this.addArry(this.menPaiImg,this.imgData);
    // this.addArry(this.huxinImg,this.imgData);
    // this.addArry(this.keTinImg,this.imgData);
    // this.addArry(this.woShiImg,this.imgData);
    // this.addArry(this.chuFangImg,this.imgData);
    // this.addArry(this.woShenJianImg,this.imgData);
    // this.addArry(this.otherImg,this.imgData);
    this.formData.arrPic =  JSON.stringify(this.imgData);
     console.log('提交',this.imgData,this.formData);
     this.propertyProvider.shiKanSave(this.formData.arrPic,this.formData.propertyId).then(res=>{
        if(res.success){
          console.log('成功返回的数据',res);
          this.toast.msg('上传成功!');
          setTimeout(()=>{
            this.navCtrl.push('HousedetailPage',{propertyId:this.data.propertyId});
          },100);

        }else {
          this.toast.error('上传失败!');
        }
     },err=>{
       this.toast.error('上传失败!');
     })
  }

  update(){
      // this.edit = true;
    this.imgData = [];
    this.addArry(this.menPaiImg,this.imgData);
    this.addArry(this.huxinImg,this.imgData);
    this.addArry(this.keTinImg,this.imgData);
    this.addArry(this.woShiImg,this.imgData);
    this.addArry(this.chuFangImg,this.imgData);
    this.addArry(this.woShenJianImg,this.imgData);
    this.addArry(this.otherImg,this.imgData);
    this.formData.arrPic =  JSON.stringify(this.imgData);
    console.log('提交',this.imgData,this.formData);
    this.propertyProvider.shiKanSave(this.formData.arrPic,this.formData.propertyId).then(res=>{
      if(res.success){
        console.log('成功返回的数据',res);
        this.toast.msg('上传成功!');
        setTimeout(()=>{
          this.navCtrl.push('HousedetailPage',{propertyId:this.data.propertyId});
        });

      }else {
        this.toast.error('上传失败!');
      }
    },err=>{
      this.toast.error('上传失败!');
    })

  }

  textArrt =[];
  isShow(name){
    // var title = name;

    if(this.textArrt.indexOf(name) == -1){
      this.textArrt.push(name);
      console.log('名字',this.textArrt);
      return true;
    }else {
      return false;
    }
    // else if(this.isInArray(this.textArrt,name)){
    //   return false;
    // }

  }

   isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
      if(value === arr[i]){
        return true;
      }
    }
    return false;
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

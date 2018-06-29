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


/**
 * Generated class for the LookhousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public nativePageTransitions: NativePageTransitions,
              private camera: Camera,public toast:ToastComponent, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              public propertyProvider:PropertyProvider, public configProvider: ConfigProvider,
              private photoViewer: PhotoViewer,) {
    this.data = navParams.get('item');
    this.formData.propertyId = this.data.propertyId;
    this.useDir = this.data.estateId+'/'+this.data.propertyId+'/';
    // propertyPics
    if(this.data.propertyPics){
      this.imgJson = JSON.parse(this.data.propertyPics); //默认展示有图片
    }else{
      this.edit = true;
    }
    console.log('dir',this.useDir,'详情',this.data.propertyPics);
  }


 imgData = [];
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    this.imgHeader = this.configProvider.set().img;
  }


  menPaiImg = [];
  menPai(event){
    console.log('门牌号',event);
    // this.imgData.push(event.pic);
    this.menPaiImg = event.data;
    console.log('表单数据',this.menPaiImg);
  }
  huxinImg = [];
  huXin(event){
    console.log('户型图',event);
    // this.imgData.push(event.pic);
    this.huxinImg = event.data;

  }
  keTinImg = [];
  keTin(event){
    console.log('客厅图',event);
    this.imgData.push(event.pic);
    this.keTinImg = event.data;
  }
  woShiImg = [];
  woShi(event){
    console.log('卧室图',event);
    // this.imgData.push(event.pic);
    this.woShiImg = event.data;
  }
  chuFangImg = [];
  chuFang(event){
    console.log('厨房图',event);
    // this.imgData.push(event.pic);
    this.chuFangImg = event.data;
  }
  woShenJianImg = [];
  woShenJian(event){
    console.log('卫生间图',event);
    // this.imgData.push(event.pic);
    this.woShenJianImg = event.data;

  }
  otherImg = [];
  other(event){
    console.log('其他图',event);
    // this.imgData.push(event.pic);
    this.otherImg = event.data;
  }

  addArry(item,data){
     for(var i in item){
        data.push(item[i]);
     }
  }

  save(){
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

  update(){
      this.edit = true;
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
}

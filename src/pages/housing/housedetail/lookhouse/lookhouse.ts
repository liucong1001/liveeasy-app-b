import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ActionSheetController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {PropertyModel} from "../../../../model/property/property.model";
import {PropertyProvider} from "../../../../providers/property/property";
import {ConfigProvider} from "../../../../providers/config/config";
import {HousedetailPage} from "../housedetail";
import {ToastComponent} from "../../../../components/toast/toast";
import { PhotoViewer } from '@ionic-native/photo-viewer';


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
  constructor(public navCtrl: NavController,private camera: Camera,public toast:ToastComponent, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
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
    this.imgHeader = this.configProvider.set().img;
  }



  menPai(event){
    console.log('门牌号',event);
    this.imgData.push(event.pic);
    console.log('表单',this.formData);
  }
  huXin(event){
    console.log('户型图',event);
    this.imgData.push(event.pic);
  }
  keTin(event){
    console.log('客厅图',event);
    this.imgData.push(event.pic);
  }
  woShi(event){
    console.log('卧室图',event);
    this.imgData.push(event.pic);
  }
  chuFang(event){
    console.log('厨房图',event);
    this.imgData.push(event.pic);
  }
  woShenJian(event){
    console.log('卫生间图',event);
    this.imgData.push(event.pic);
  }
  other(event){
    console.log('其他图',event);
    this.imgData.push(event.pic);
  }
  save(){
    //
     this.formData.arrPic =  JSON.stringify(this.imgData);
     console.log('提交',this.formData);
     this.propertyProvider.shiKanSave(this.formData.arrPic,this.formData.propertyId).then(res=>{
        if(res.success){
          console.log('成功返回的数据',res);
          this.toast.msg('上传成功!');
          this.navCtrl.push('HousedetailPage',{propertyId:this.data.propertyId});
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


}

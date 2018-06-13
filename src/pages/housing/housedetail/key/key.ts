import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import {PropertyProvider} from "../../../../providers/property/property";
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {HousedetailPage} from "../housedetail";
import {LetteratorneyPage} from "../letteratorney/letteratorney";
import {HousingPage} from "../../housing";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ConfigProvider} from "../../../../providers/config/config";
import {ToastComponent} from "../../../../components/toast/toast";

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public propertyProvider: PropertyProvider,private camera: Camera,
              private fb:FormBuilder,public configProvider: ConfigProvider,public toast:ToastComponent,
              public localStorageProvider:LocalStorageProvider,public actionSheetCtrl: ActionSheetController,) {
    this.propertyid= navParams.get('propertyid');
    this.data = navParams.get('item');
    console.log(this.propertyid)
    this.propertyProvider.keydetail(this.propertyid).then(res => {
      console.log(res);

      if(res.hasOwnProperty('data')){
        this.keydelegateid= res.data.keyDelegateId;
        this.data = res.data;
        this.form.patchValue({
          keySn: res.data.keySn,
          keyAddress: res.data.keyAddress,
          keyDlgtFilePics: res.data.keyDlgtFilePics,
        });
        this.update=true;
        this.sub=false;
      }
      //钥匙图片显示
      if(res.hasOwnProperty('data')){
        this.imgJson = JSON.parse(this.data.keyDlgtFilePics); //默认展示有图片
        console.log(this.imgJson)
      }else{
        this.edit = true;
      }
      console.log('dir',this.useDir,'详情',this.data);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad KeyPage');
    this.attorneys=new Date().getTime();
    this.imgHeader = this.configProvider.set().img;
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: '更多',
      buttons: [
        {
          text: '选择图片',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.takePhoto(0);
          }
        },{
          text: '拍照',
          handler: () => {
            console.log('Archive clicked');
            this.takePhoto(1);
          }
        },{
          text: '关闭',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  //take Photo
  takePhoto(sourceType:number) {
    console.log('手机调试',sourceType);
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    };

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.path = base64Image;
    }, (err) => {
      // Handle error
    });
  }

  form:FormGroup =this.fb.group({
    keySn:['',Validators.required],
    keyAddress:['',Validators.required],
    keyDlgtFilePics:[''],
  });
//上传钥匙信息
  goYc(){
    this.propertyProvider.key({
      loginFlag:1,
      status:1,
      propertyId:this.propertyid,
      createTime:this.attorneys,
      keySn:this.form.value.keySn,
      keyAddress:this.form.value.keyAddress,
      keyDlgtFilePics:JSON.stringify(this.imgData),
      // keyDlgtFilePics:"[{\"imageId\":\"1527840041338\",\"bucketId\":\"liveeasydev\",\"imagePath\":\"liveeasy-erp/oss/a7d09309ee4542dba8601458c0c1604b/001f8754849f44b4bffee7799e4e21a7/1527840041338.jpg\",\"thumbnail\":\"liveeasy-erp/oss/a7d09309ee4542dba8601458c0c1604b/001f8754849f44b4bffee7799e4e21a7/1527840041338.jpg?x-oss-process=image/resize,m_lfit,h_110,w_110\",\"size\":\"476884\",\"position\":\"\",\"desc\":\"\"}]"
    }).then(res => {
      console.log(res);
      if(res.success){
        this.toast.msg('上传成功!');
        this.navCtrl.pop()
      }else{
        this.toast.error('上传失败！');
      }
      // alert('上传成功');
      // this.navCtrl.pop()
    });
    console.log(this.form.value);
  }
  // JSON.stringify(this.imgData)
  imgData = [];
  yaoChi(event){
    this.imgData.push(event.pic);
  }

  //修改钥匙信息
  updateYc(){
    this.propertyProvider.keyupdate({
      // loginFlag:1,
      keyDelegateId:this.keydelegateid,
      // propertyId:this.propertyid,
      // createTime:this.attorneys,
      keySn:this.form.value.keySn,
      keyAddress:this.form.value.keyAddress,
      keyDlgtFilePics:JSON.stringify(this.imgData),
      // keyDlgtFilePics:"[{\"desc\":\"\",\"size\":\"476884\",\"imageId\":\"1527840041338\",\"bucketId\":\"liveeasydev\",\"position\":\"\",\"imagePath\":\"liveeasy-erp/oss/a7d09309ee4542dba8601458c0c1604b/001f8754849f44b4bffee7799e4e21a7/1527840041338.jpg\",\"thumbnail\":\"liveeasy-erp/oss/a7d09309ee4542dba8601458c0c1604b/001f8754849f44b4bffee7799e4e21a7/1527840041338.jpg?x-oss-process=image/resize,m_lfit,h_110,w_110\"}]",
      propertyKeyInfoEntity:this.data,
    }).then(res => {
      console.log(res);
      if(res.success){
        this.toast.msg('修改成功!');
        this.navCtrl.push(HousedetailPage,{propertyId:this.propertyid});
      }else{
        this.toast.error('修改失败！');
      }
      // alert('修改成功');

    });
  }

}

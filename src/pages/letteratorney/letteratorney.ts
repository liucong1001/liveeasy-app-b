import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ActionSheetController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {HousingPage} from "../housing/housing";
import {PropertyProvider} from "../../providers/property/property";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
/**
 * Generated class for the LetteratorneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-letteratorney',
  templateUrl: 'letteratorney.html',
})
export class LetteratorneyPage {
  path: string;
  // delegateDdocSn:string; //委托书编号
  // delegateBeginTm:number; //起始时间
  // delegateEndTm:number; //结束时间
  // delegateDocPics:any; //委托书图片
  propertyid:any;
  attorneys:any;
  constructor(public navCtrl: NavController,public propertyProvider: PropertyProvider,
              public localStorageProvider:LocalStorageProvider,
              private camera: Camera,
              public navParams: NavParams,
              private fb:FormBuilder,public actionSheetCtrl: ActionSheetController) {
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
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.path = base64Image;
    }, (err) => {
      // Handle error
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LetteratorneyPage');
    this.attorneys=new Date().getTime();
  }

  form:FormGroup =this.fb.group({
    delegateDdocSn:['',Validators.required], //委托书编号
    delegateBeginTm:['',Validators.required],//起始时间
    delegateEndTm:['',Validators.required],//结束时间
    delegateDocPics:[''],//委托书图片
  });

  go(){
    this.propertyid=this.localStorageProvider.get('propertyid');
    this.propertyProvider.attorney({
      loginFlag:1,
      delegateStyle:1,
      status:1,
      propertyId:this.propertyid,
      createTime:this.attorneys,
      delegateDdocSn:this.form.value.delegateDdocSn,
      delegateBeginTm:new Date(this.form.value.delegateBeginTm).getTime(),
      delegateEndTm:new Date(this.form.value.delegateEndTm).getTime(),
      delegateDocPics:"[{\"imageId\":\"1527840041338\",\"bucketId\":\"liveeasydev\",\"imagePath\":\"liveeasy-erp/oss/a7d09309ee4542dba8601458c0c1604b/001f8754849f44b4bffee7799e4e21a7/1527840041338.jpg\",\"thumbnail\":\"liveeasy-erp/oss/a7d09309ee4542dba8601458c0c1604b/001f8754849f44b4bffee7799e4e21a7/1527840041338.jpg?x-oss-process=image/resize,m_lfit,h_110,w_110\",\"size\":\"476884\",\"position\":\"\",\"desc\":\"\"}]"
    }).then(res => {
      console.log(res);
      // alert('跟进成功！')
      // this.navCtrl.push(HousingPage)
    });
    console.log(this.form.value);
    console.log(new Date(this.form.value.delegateBeginTm).getTime())
    console.log(new Date(this.form.value.delegateEndTm).getTime())
  }
}

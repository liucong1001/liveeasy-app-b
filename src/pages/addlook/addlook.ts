import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {FileTransfer,FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";
import {FileProvider} from "../../providers/file/file";
import {PropertyModel} from "../../model/property/property.model";
import {PropertyProvider} from "../../providers/property/property";
import {AddhousePage} from "../addhouse/addhouse";
import {HousingPage} from "../housing/housing";
/**
 * Generated class for the AddlookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addlook',
  templateUrl: 'addlook.html',
})
export class AddlookPage {

  path: string;
  data:PropertyModel;
  followup_time:any;  //时间
  content:any; //内容
  followup_pics:any;//图片
  imagePathHead = 'liveeasy-erp/oss/';
  imagePath = '';
  nowDateFile :any;
  formData:any;
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private camera: Camera,public actionSheetCtrl: ActionSheetController,
              private transfer:FileTransfer,private fileProvider:FileProvider,private propertyProvider:PropertyProvider) {
    this.data = navParams.get('item');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddlookPage',);
    // this.data = this.navParams.get('item');
    console.log('带看',this.data,this.data.convId);

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

    //打开摄像头
    takePhoto(sourceType:number) {
      // console.log('手机调试',sourceType);
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType:sourceType,
        };

        this.camera.getPicture(options).then((imageData,) => {
          console.log('图片data',options);
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.path = base64Image;
            // console.log('图片信息64位',this.path,'图片信息',imageData);
            this.upload(this.data.estateId+'/'+this.data.propertyId+'/');
        }, (err) => {
            // Handle error
        });
    }


    //文件上传
    upload(useDir){

        this.fileProvider.getTicker(useDir).then(res=>{
          var apiPath = res.data.host ;
          var data = res.data;
          // console.log('获取签证成功',res,apiPath);
          this.nowDateFile = new Date().getTime();   //这里没有共用部分
          let options:FileUploadOptions = {
            fileKey:'file',
            fileName:new Date().getTime()+'.jpg',
            headers:{},
            params:{
              'key' : data.dir,
              'policy': data.policy,
              'OSSAccessKeyId': data.accessid,
              'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
              'signature': data.signature
            }
          };

          // console.log('上传参数',this.path,this.apiPath,options);
          this.fileTransfer.upload(this.path,apiPath,options).then((data) => {


             this.imagePath = this.imagePathHead +useDir +options.fileName;
            console.log('upload成功',data,'图片地址',this.imagePath);

          }, (err) => {
            console.log('upload失败',err);
          });

        });
    }

    //   最终图片地址：
    // "imagePath":"liveeasy-erp/oss/712574180d7d4dfe98c027b5d41f6bcc/002fc81cd07040b7bf766ee8a4df79c6/1527244583739.jpg"

    save(){
      var followupPics = [{
        imageId:this.nowDateFile,
        bucketId:'liveeasydev',
        imagePath:this.imagePath,
        thumbnail:this.imagePath+'?x-oss-process=image/resize,m_lfit,h_110,w_110',
        position:'',
        desc:'',
      }];

      this.formData = {
        bucketId:'liveeasydev',
        content:this.content,
        followupCode:'3', //  区别空看和跟近
        followupPics:JSON.stringify(followupPics),
        followupTime: Date.parse(this.followup_time) ,
        imageId:this.nowDateFile,
        imagePath:this.imagePath,
        propertyId:this.data.propertyId,
        recordTime:new Date().getTime(),
        size:'',
        thumbnail:this.imagePath+'?x-oss-process=image/resize,m_lfit,h_110,w_110',
      };

      console.log('表单内容',this.formData);


      this.propertyProvider.insertEmptyLook(this.formData).then(res=>{
         alert('添加成功');
        this.navCtrl.push(HousingPage);
      }).catch(err=>{
         alert('添加失败'+err);
      })
    }
}

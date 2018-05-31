import { Component ,Input,Output,EventEmitter } from '@angular/core';
import {ActionSheetController, NavController, NavParams} from "ionic-angular";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";
import {FileProvider} from "../../providers/file/file";
import {PropertyProvider} from "../../providers/property/property";
import {PropertyModel} from "../../model/property/property.model";
// import { ImagePicker } from '@ionic-native/image-picker';

/**
  多图片上传组件
 */
@Component({
  selector: 'upload',
  templateUrl: 'upload.html'
})
export class UploadComponent {


  @Input() useDir: string;  //图片地址（id比值 例如："楼盘id/房源id/"）
  @Input() position: string; //（例如：add）
  @Input() desc: string; //描述（例如：“门牌图”）
  @Output() successEvent = new EventEmitter<any>();

  path: string;
  imagePathHead = 'liveeasy-erp/oss/';
  imagePath = '';
  nowDateFile :any;
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private camera: Camera,public actionSheetCtrl: ActionSheetController,
              private transfer:FileTransfer,private fileProvider:FileProvider,private propertyProvider:PropertyProvider,
              // private imagePicker:ImagePicker
  ) {

  }
  //触发调用事件
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


    if(sourceType==0){
     // this.imagePicker.getPictures(options).then(results=>{
     //     for(var i=0;i<results.length;i++){
     //       console.log('图片'+i,results[i]);
     //     }
     // })


    }else if(sourceType==1){

      this.camera.getPicture(options).then((imageData,) => {
        console.log('图片data',options);
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.path = base64Image;
        // console.log('图片信息64位',this.path,'图片信息',imageData);
        this.upload(this.useDir);
      }, (err) => {
        // Handle error
      });

    }

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

      console.log('公上传参数',this.path,apiPath,options);
      this.fileTransfer.upload(this.path,apiPath,options).then((data) => {

        this.imagePath = this.imagePathHead +useDir +options.fileName;
        let imagePath = this.imagePath;
        // let thumbnail =
        var pic = {
          imageId:this.nowDateFile,
          bucketId:'liveeasydev',
          imagePath:this.imagePath,
          thumbnail:this.imagePath+'?x-oss-process=image/resize,m_lfit,h_110,w_110',
          position:this.position,
          desc:this.desc,
        };
        console.log('upload成功',data,'图片地址',this.imagePath);
        this.successEvent.emit({pic});
      }, (err) => {
        console.log('upload失败',err);
      });

    });
  }


}

import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, Navbar} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {FileTransfer,FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";
import {FileProvider} from "../../../providers/file/file";
import {PropertyModel} from "../../../model/property/property.model";
import {PropertyProvider} from "../../../providers/property/property";
import {AddhousePage} from "../addhouse/addhouse";
import {HousingPage} from "../housing";
import {ConfigProvider} from "../../../providers/config/config";
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {ToastComponent} from "../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "../../../components/valid-error/valid-error";
/**
  添加带看页面
 */

@IonicPage()
@Component({
  selector: 'page-addlook',
  templateUrl: 'addlook.html',
})
export class AddlookPage {

  path: any;
  data:PropertyModel;
  followup_time:any;  //时间
  content:any; //内容
  followup_pics:any;//图片
  imagePathHead = 'liveeasy-erp/oss/';
  imagePath = '';
  nowDateFile :any;
  formData:any;
  standardAddress:any;
  fileTransfer: FileTransferObject = this.transfer.create();
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, private fb:FormBuilder, public navParams: NavParams,public localStorageProvider:LocalStorageProvider,
              private camera: Camera,
              public nativePageTransitions: NativePageTransitions,public actionSheetCtrl: ActionSheetController,public toast:ToastComponent,
              private transfer:FileTransfer,private fileProvider:FileProvider,private propertyProvider:PropertyProvider,
              public configProvider: ConfigProvider) {
    this.data = navParams.get('item');
    this.standardAddress = navParams.get('standardAddress');
  }

  ionViewDidLoad() {
    console.log('带看',this.data,this.data.convId);
    this.imgHeader = this.configProvider.set().img;
    this.navBar.backButtonClick = this.backButtonClick;
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

   convertBase64UrlToBlob(urlData) {
    const bytes = window.atob(urlData.split(',')[1]);        // 去掉url的头，并转换为byte
    // 处理异常,将ascii码小于0的转换为大于0
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  }

    //打开摄像头
    takePhoto(sourceType:number) {
      // console.log('手机调试',sourceType);
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType:sourceType,
        };

        this.camera.getPicture(options).then((imageData,) => {
          console.log('图片data',options);
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.path = imageData ;
            console.log('图片信息imageData位',this.path,'图片信息',imageData);
            // this.upload(this.data.+'/'+this.data.propertyId+'/');
          this.upload(this.data.propertyId+'/'+this.data.estateId+'/');
        }, (err) => {
            // Handle error
        });
    }

  imgHeader='';
  imgSrc = '';
    //文件上传
    upload(useDir){
        console.log('上传的useDir',useDir);
        this.fileProvider.getTicker(useDir).then(res=>{
          var apiPath = res.data.host ;
          var data = res.data;
          console.log('获取签证成功',res,apiPath);
          let newFileName = this.nowDateFile = new Date().getTime();   //这里没有共用部分
          let options:FileUploadOptions = {
            fileKey:'file',
            fileName: newFileName +'.jpg',
            headers:{},
            params:{
              'key' : data.dir + newFileName +'.jpg',
              'policy': data.policy,
              'OSSAccessKeyId': data.accessid,
              'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
              'signature': data.signature
            }
          };
          console.log('上传参数',this.path,apiPath,options);
          this.fileTransfer.upload(this.path,apiPath,options).then((data) => {
             this.imagePath = this.imagePathHead +useDir +options.fileName;
             this.imgSrc = this.imgHeader+ this.imagePath;
            console.log('upload成功',data,'图片地址',this.imagePath,'全地址',this.imgSrc);

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
        agentId:this.localStorageProvider.get('loginInfo').id,
      };

      console.log('表单内容',this.formData);


      this.propertyProvider.insertEmptyLook(this.formData).then(res=>{
        if(res.success){
          this.toast.msg('添加成功!');
          this.navCtrl.pop();
        }else {
          this.toast.error('添加失败!');
          console.log('失败',res);
        }
      }).catch(err=>{
         alert('添加失败'+err);
      })
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

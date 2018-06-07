import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ActionSheetController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {HousingPage} from "../housing/housing";
import {PropertyProvider} from "../../providers/property/property";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {ErrorMessage} from "../../components/valid-error/valid-error";
import {HousedetailPage} from "../housedetail/housedetail";
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
  propertyid:any;
  attorneys:any;
  sub=true;
  upd=false;
  delegateDocId:any;
  data:any;
  timeCheck = false;
  useDir:string;
  constructor(public navCtrl: NavController,public propertyProvider: PropertyProvider,
              public localStorageProvider:LocalStorageProvider,
              private camera: Camera,
              public navParams: NavParams,
              private fb:FormBuilder,public actionSheetCtrl: ActionSheetController) {
    this.propertyid = navParams.get('propertyid');
    this.useDir = navParams.get('estateId')+'/'+this.propertyid+'/';
    // this.useDir = this.propertyid+'/'+navParams.get('estateId')+'/';
    // console.log('propertyid的值',this.propertyid);
    //委托书详情
    this.propertyProvider.adetail(this.propertyid).then(res => {
      console.log('委托书详情',res);
      if(res.data != undefined){
        this.data = res.data;
        this.delegateDocId= res.data.delegateDocId;
        this.form.patchValue({
          delegateDocSn:res.data.delegateDocSn,
          delegateBeginTm:new Date(res.data.delegateBeginTm).toISOString(),
          delegateEndTm:new Date(res.data.delegateEndTm).toISOString(),
          delegateDocPics:res.data.delegateDocPics,
        })
        this.sub=false;
        this.upd=true;
      }else {
        // alert(2);
      }
    });
  }
  // presentActionSheet() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     // title: '更多',
  //     buttons: [
  //       {
  //         text: '选择图片',
  //         role: 'destructive',
  //         handler: () => {
  //           console.log('Destructive clicked');
  //           this.takePhoto(0);
  //         }
  //       },{
  //         text: '拍照',
  //         handler: () => {
  //           console.log('Archive clicked');
  //           this.takePhoto(1);
  //         }
  //       },{
  //         text: '关闭',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }
  // //take Photo
  // takePhoto(sourceType:number) {
  //   console.log('手机调试',sourceType);
  //   const options: CameraOptions = {
  //     quality: 50,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     correctOrientation: true,
  //     sourceType:sourceType,
  //   };
  //
  //   this.camera.getPicture(options).then((imageData) => {
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     this.path = base64Image;
  //   }, (err) => {
  //     // Handle error
  //   });
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LetteratorneyPage');
    this.attorneys=new Date().getTime();
  }

  form:FormGroup =this.fb.group({
    delegateDocSn:['',[Validators.required, Validators.pattern(/^[0-9a-zA-Z]*$/g)]], //委托书编号
    delegateBeginTm:['',Validators.required],//起始时间
    delegateEndTm:['',Validators.required],//结束时间
    delegateDocPics:[''],//委托书图片
    delegateStyle:['',Validators.required] //状态
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
      new ErrorMessage('required','结束时间必须要填写！'),
    ],
  };

  //上传业主委托书
  go(){
    this.propertyProvider.attorney({
      // loginFlag:1,
      delegateStyle:1,
      // status:1,
      propertyId:this.propertyid,
      createTime:this.attorneys,
      delegateDocSn:this.form.value.delegateDocSn,
      delegateBeginTm:new Date(this.form.value.delegateBeginTm).getTime(),
      delegateEndTm:new Date(this.form.value.delegateEndTm).getTime(),
      delegateDocPics:"[{\"imageId\":\"1527840041338\",\"bucketId\":\"liveeasydev\",\"imagePath\":\"liveeasy-erp/oss/a7d09309ee4542dba8601458c0c1604b/001f8754849f44b4bffee7799e4e21a7/1527840041338.jpg\",\"thumbnail\":\"liveeasy-erp/oss/a7d09309ee4542dba8601458c0c1604b/001f8754849f44b4bffee7799e4e21a7/1527840041338.jpg?x-oss-process=image/resize,m_lfit,h_110,w_110\",\"size\":\"476884\",\"position\":\"\",\"desc\":\"\"}]"
    }).then(res => {
      console.log(res);
      alert('上传成功！')
      this.navCtrl.push(HousedetailPage)
    });
    console.log(this.form.value);
    console.log(new Date(this.form.value.delegateBeginTm).getTime())
    console.log(new Date(this.form.value.delegateEndTm).getTime())
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
       console.log('表单',this.form.value,'开始时间',startTime,'结束时间',endTime);
     }
  }
  imgData = [];
  //委托书
  weiTuo(event){
    this.imgData.push(event.pic);
    console.log('图片数据',this.imgData);
  }

  //修改业主委托书
  upYz(){
    console.log('提交数据',JSON.stringify(this.imgData));
    this.propertyProvider.aupdate({
      delegateDocId:this.delegateDocId,
      delegateStyle:1,
      propertyId:this.propertyid,
      createTime:this.attorneys,
      delegateDocSn:this.form.value.delegateDocSn,
      delegateBeginTm:new Date(this.form.value.delegateBeginTm).getTime(),
      delegateEndTm:new Date(this.form.value.delegateEndTm).getTime(),
      delegateDocPics: JSON.stringify(this.imgData),
      // delegateDocPics:"[{\"desc\":\"\",\"size\":\"476884\",\"imageId\":\"1527845042587\",\"bucketId\":\"liveeasydev\",\"position\":\"\",\"imagePath\":\"liveeasy-erp/oss/ee2d0683ed3a4e9e8762c4ed1f0bf516/00a7bd4bc2084070a8ccd8da0d3aa4df/1527845042587.jpg\",\"thumbnail\":\"liveeasy-erp/oss/ee2d0683ed3a4e9e8762c4ed1f0bf516/00a7bd4bc2084070a8ccd8da0d3aa4df/1527845042587.jpg?x-oss-process=image/resize,m_lfit,h_110,w_110\"}]",
      delegateDocInfoEntity:this.data,
    }).then(res => {
      console.log(res);
      alert('修改成功！');
      this.navCtrl.push(HousedetailPage)
    });
  }
}

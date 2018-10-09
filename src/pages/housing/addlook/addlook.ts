import {Component, ViewChild, Renderer} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, Navbar,Searchbar} from 'ionic-angular';
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
import {NativeProvider} from "../../../providers/native/native";
/**
  添加空看页面
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
  @ViewChild('searchBar') searchBar:Searchbar;
  fileTransfer: FileTransferObject = this.transfer.create();
  @ViewChild(Navbar) navBar: Navbar;
  result:any;
  propertyid:any;
  convId:any;
  estateName:any;
  useDir :string;
  hasPermisson:any;
  startDate: String = new Date(new Date().getTime()+8*60*60*1000+60*1000).toISOString();
  constructor(public navCtrl: NavController, private fb:FormBuilder, public navParams: NavParams,public localStorageProvider:LocalStorageProvider,
              private camera: Camera,private renderer:Renderer,
              public nativePageTransitions: NativePageTransitions,public actionSheetCtrl: ActionSheetController,
              public toast:ToastComponent,public  nativeProvider:NativeProvider,
              private transfer:FileTransfer,private fileProvider:FileProvider,private propertyProvider:PropertyProvider,
              public configProvider: ConfigProvider) {
    this.propertyid = navParams.get('item').propertyId;
    console.log(this.propertyid);
    this.hasPermisson = true;
    this.propertyProvider.getRecord(this.propertyid).then(res=>{
      if(res.success){
        this.result=res.data;
        console.log(this.result);
        this.convId=this.result.convId;
        this.estateName=this.result.estateName;
        this.standardAddress=this.result.standardAddress;

        this.useDir = this.result.estateId+'/'+this.result.propertyId+'/';
        console.log('带看',this.result);
        if(this.result['closePropertyShow']&&this.result['propertyStatus']!=512&&this.result['propertyStatus']!=32){
          this.hasPermisson = true;
        }else {
          this.hasPermisson = false;
          this.toast.delayToast('暂无权限操作!');
        }
      }

    });

  }

  ionViewDidLoad() {
    // console.log('带看',this.convId);
    this.imgHeader = this.configProvider.set().img;
    this.navBar.backButtonClick = this.nativeProvider.back(this.navCtrl);
  }
  imgData = [];
  maxImagesCount = true;
  addPic(event){
    this.imgData = event.data;
    if(this.imgData.length==1){
      this.maxImagesCount = false;
    }else {
      this.maxImagesCount = true;
    }
    // console.log('图片回调事件',this.imgData,this.imgData.length,event);
  }

  imgHeader='';
  imgSrc = '';
  isDisabled:any;
    save(){
      this.formData = {
        bucketId:this.localStorageProvider.get('loginInfo')['props']['oss-bucket'],
        content:this.content,
        followupCode:'3', //  区别空看和跟近
        followupPics:JSON.stringify(this.imgData),
        followupTime: Date.parse(this.followup_time) ,
        imageId:this.nowDateFile,
        imagePath:this.imagePath,
        propertyId:this.propertyid,
        recordTime:new Date().getTime(),
        size:'',
        thumbnail:this.imagePath,
        agentId:this.localStorageProvider.get('loginInfo').user.id,
      };
      this.isDisabled = true;
      this.propertyProvider.insertEmptyLook(this.formData).then(res=>{
        if(res.success){
          this.toast.msg('添加成功!');
          setTimeout(()=>{
            this.navCtrl.pop();
          },200);
        }else {
          this.toast.error('添加失败!');
          this.isDisabled = false;
          // console.log('失败',res);
        }
      }).catch(err=>{
         this.isDisabled = false;
         this.toast.error('添加失败!');
      })
    }


}

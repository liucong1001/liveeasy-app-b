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
  constructor(public navCtrl: NavController, private fb:FormBuilder, public navParams: NavParams,public localStorageProvider:LocalStorageProvider,
              private camera: Camera,private renderer:Renderer,
              public nativePageTransitions: NativePageTransitions,public actionSheetCtrl: ActionSheetController,public toast:ToastComponent,
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
          this.toast.delayToast('暂时不支持空看');
        }
      }

    });

  }

  ionViewDidLoad() {
    // console.log('带看',this.convId);
    this.imgHeader = this.configProvider.set().img;
    this.navBar.backButtonClick = this.backButtonClick;
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

    save(){
      // var followupPics = [{
      //   imageId:this.nowDateFile,
      //   bucketId:this.localStorageProvider.get('loginInfo')['props']['oss-bucket'],
      //   imagePath:this.imagePath,
      //   thumbnail:this.imagePath+'?x-oss-process=image/resize,m_lfit,h_110,w_110',
      //   position:'',
      //   desc:'',
      // }];
      // var followupPics = this.imgData;

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



      this.propertyProvider.insertEmptyLook(this.formData).then(res=>{
        if(res.success){
          this.toast.msg('添加成功!');
          setTimeout(()=>{
            this.navCtrl.pop();
          },200);
        }else {
          this.toast.error('添加失败!');
          // console.log('失败',res);
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

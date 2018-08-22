import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, Navbar, Content} from 'ionic-angular';
import {SearchhousePage} from "./searchhouse/searchhouse";
import {RecordPage} from "./record/record";
import { LookhousePage } from './lookhouse/lookhouse';
import { LetteratorneyPage } from './letteratorney/letteratorney';
import { RolepeoplePage } from './rolepeople/rolepeople';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "../../../components/valid-error/valid-error";
import {PropertyModel} from "../../../model/property/property.model";
import {LocalStorageProvider} from '../../../providers/local-storage/local-storage'
import {PropertyProvider} from "../../../providers/property/property";
import {HousingPage} from "../housing";
import {FollowPage} from "../follow/follow";
import {KeyPage} from "./key/key";
import {DescPage} from "./desc/desc";
import { Events } from 'ionic-angular';
import {AddhouseProvider} from "../../../providers/addhouse/addhouse";
import {ToastComponent} from "../../../components/toast/toast";
import { LoadingController, Loading } from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {HousinfoPage} from "../housinfo/housinfo";

/**
 房源修改页面
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-housedetail',
  templateUrl: 'housedetail.html',
})
export class HousedetailPage {
  sensitiveInfo =true;
  follow=false;
  data:PropertyModel;
  //更多
  showIntention=false;
  right=true;
  down=false;
  //户型
  showHx=false;
  HxRight=true;
  HxDown=false;
  //编辑房源
  propertyid:any;
  buildingNo:any; //栋号
  unitNo:any; //单元
  floorNo:any; //楼层
  houseNo:any; //房间号
  spaceSize:any; //建筑面积
  innerSpaceSize:any; //套内面积
  propertyPrice:any; //价格
  orientation:any; //朝向
  decoration:any; //装修
//房源标签
  houLabel:any;
  estateList:any;
  lockStatus:any;
  @ViewChild('navbar') navBar: Navbar;
  localCode:any;
  constructor(public navCtrl: NavController, public nativePageTransitions: NativePageTransitions,public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,public propertyProvider: PropertyProvider,
              public events: Events,public addhouseProvider: AddhouseProvider,public toast:ToastComponent,
              public statusBar: StatusBar,
              public loadingCtrl: LoadingController) {

    this.localCode = this.localStorageProvider.get('codeData');
    //获取房源标签
    this.houLabel=this.localStorageProvider.get('tagsList');
  }
  selectTitle(data){
    var title = {title:data};
    return title;
  }
  //房源标签处理
  tagsSum(data){
    var str =  data.toString();
    var result = str.split(",");
    var sum = 0;
    for(var i in result){
      sum+=parseInt(result[i])

    }
    return sum ;
  };

  tagsSelect(value){
    this.form.value.tags= this.tagsSum(value);
  };
  ionViewWillEnter() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.push(HousinfoPage,{propertyId:this.propertyid,notReloadPage:true});
    };
    this.statusBar.styleLightContent();
  }
  ionViewDidLoad() {
    // this.navBar.backButtonClick = this.backButtonClick;
    let loading = this.loadingCtrl.create({
      content: '数据加载中...'
    });
    loading.present();

    this.propertyProvider.getRecord(this.navParams.data.propertyId).then(res=>{
      this.data = res&&res.data;
      if( this.data&&res.success){
        loading.dismiss();
        var jsonData = JSON.parse(this.data.contacts);
         console.log('联系人',jsonData,jsonData[0].contactInfo,jsonData[1].contactInfo,jsonData[2].contactInfo);
        this.form.patchValue({
          adminDivisionCode:this.data.adminDivisionCode,
          buzzType:this.data.buzzType,
          buildingNo: this.data.buildingNo,
          estateName:this.data.estateName,
          estateId:this.data.estateId,
          unitNo: this.data.unitNo,
          floorNo: this.data.floorNo,
          houseNo: this.data.houseNo,
          spaceSize: this.data.spaceSize,
          innerSpaceSize: this.data.innerSpaceSize,
          propertyPrice: this.data.propertyPrice,
          bedrooms: this.data.bedrooms,
          halls: this.data.halls,
          bathrooms: this.data.bathrooms,
          kitchens: this.data.kitchens,
          balconies: this.data.balconies,
          orientation: this.data.orientation,
          decoration: this.data.decoration,
          contact:jsonData[0].contact,
          sex:jsonData[0].sex,
          // contactInfo:jsonData[0].contactInfo,
          contactInfo:jsonData.length>1?jsonData[0].contactInfo:'',
          contactInfo2:jsonData.length>=1?jsonData[1].contactInfo:'',
          contactInfo3:jsonData.length>=2?jsonData[2].contactInfo:'',
          //更多
          buildingType:this.data.buildingType,
          hasElevator:this.data.hasElevator,
          elevators:this.data.elevators,
          apartments:this.data.apartments,
          propertyDesc:this.data.propertyDesc,//描述
        });
        //判断存在tagsStr
        if(this.data.tagsStr){
          var tagsStr =  this.data.tagsStr.toString();
          var tagsArry = tagsStr.split(',');
          var arry = [];
          for(var i in tagsArry){
            arry[i] = tagsArry[i].toString().replace(/\s/g, "");
            //判断锁定状态
            if(tagsArry[i]==256){
              this.lockStatus=true;
            }
          }

          this.form.patchValue({
            tagsStr:arry
          });
          // console.log('标签赋值',arry,this.houLabel);
        }
        this.propertyid=this.data.propertyId;
        this.localStorageProvider.set('propertyid',this.data.propertyId);

        //敏感信息
        if(this.data.notShow){
          this.sensitiveInfo = false;
        }
        // adminDivisionCode
        // console.log('adminDivisionCode');
      }else {
        this.toast.msg('获取详情失败!');
        loading.dismiss();
      }
    });
    this.propertyid =  this.navParams.data.propertyId;
    var propertyId= this.localStorageProvider.get('propertyIdDetail)');
  }

  // tradingAreaId
  form:FormGroup =this.fb.group({
    adminDivisionCode:[''],//楼盘相对应区域
    estate:[''],//楼盘
    estateName:[''],
    estateId:[''],
    buildingNo:['',Validators.required], //楼栋号
    unitNo:['',Validators.required],//单元号
    // floorNo:['',[Validators.required,Validators.maxLength(5)]],//楼层
    floorNo:['',[Validators.required]],//楼层
    houseNo:['',Validators.required],//房间号
    spaceSize:['',Validators.required],//建筑面积
    innerSpaceSize:['',Validators.required],//套内面积
    propertyPrice:['',Validators.required],//价格
    bedrooms:['1'],//室
    halls:['1'],
    bathrooms:['1'],
    kitchens:['1'],
    balconies:['1'],//阳
    orientation:[null,Validators.required],//房屋朝向
    decoration:[null],//装修水平
    contacts:this.fb.array([
      this.fb.group({
        contact:[''],
        contactType:['mobile'],
        contactInfo:[''],
        sex:[''],
        desc:[''],
      })
    ]),//业主信息
    contact:['',Validators.required],
    contactInfo:['',[Validators.required, Validators.pattern(/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/)]],
    contactInfo2:['',Validators.pattern(/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/)],
    contactInfo3:['',Validators.pattern(/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/)],
    sex:['male',Validators.required],
    tags:['0'],//房源标签
    tagsStr:[],//列表
    infoOwnerId:[this.localStorageProvider.get('loginInfo')['user']['company']['id']],//加盟商id 根据登录人判断他的加盟商id
    buildingType:['0',Validators.required],//建筑类型
    buzzOwnerType:['0'],//交易权属
    buzzType:['1',Validators.required], //房屋用途
    hasElevator:['0',Validators.required],//配备电梯
    positionInBuilding:['2'],
    propertyLife:['1'], //房屋年限
    propertyMortgage:['0'],
    propertyPriceUnit:['1'],
    propertyType:['1'],
    propertyDesc:[''],//房源描述
    //楼号比例
    elevators:[''],//梯
    apartments:[''],//户
  });
  //表单验证消息
  errors={
    buildingNo:[
      new ErrorMessage('required','楼栋号必须要填写！'),
      new ErrorMessage('maxLength','这个长度太长了'),
      new ErrorMessage('pattern', '请填写英文或数字'),
    ],
    unitNo:[
      new ErrorMessage('required','单元号必须要填写！'),
      new ErrorMessage('pattern', '请填写数字'),
    ],
    floorNo:[
      new ErrorMessage('required','楼层必须要填写！'),
      // new ErrorMessage('maxLength','楼层名称太长了'),
      new ErrorMessage('pattern', '请填写数字'),
    ],
    houseNo:[
      new ErrorMessage('pattern', '请填写数字'),
    ],
    contact:[
      new ErrorMessage('required','业主姓名必须要填写！'),
    ],
    sex:[
      new ErrorMessage('required','业主性别必须要填写！'),
    ],
    contactInfo:[
      new ErrorMessage('required','业主电话必须要填写！'),
      new ErrorMessage('pattern', '手机号码格式不正确！'),
    ],
    contactInfo2:[
      new ErrorMessage('pattern', '手机号码格式不正确！'),
    ],
    contactInfo3:[
      new ErrorMessage('pattern', '手机号码格式不正确！'),
    ],
    spaceSize:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    innerSpaceSize:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    propertyPrice:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    elevators:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    apartments:[
      new ErrorMessage('pattern','请填写数字'),
    ],
  };

  /**
   * 验证面积
   */
  sizeCheck=false;
  sizes(){
    if(this.form.value.spaceSize&&this.form.value.innerSpaceSize){

      if(parseInt(this.form.value.spaceSize) < parseInt(this.form.value.innerSpaceSize)){
        // console.log('室内面积不能大于建筑面积');
        this.sizeCheck = true;
      }else {
        this.sizeCheck = false;
      }
      // console.log('建筑面积',this.form.value.spaceSize,'室内面积',this.form.value.innerSpaceSize,);
    }
  }

    presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '更多',
      buttons: [
        {
          text: '内容',
          role: 'destructive',
          handler: () => {
            // console.log('Destructive clicked');
          }
        },{
          text: '内容',
          handler: () => {
            // console.log('Archive clicked');
          }
        },{
          text: '关闭',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
    record(){
      this.openWin(RecordPage,{
        propertyid:this.propertyid,
      });
    }



  //楼盘搜索页面
  goserach(){
    this.events.subscribe('bevents', (params) => {
      // 接收B页面发布的数据
      // console.log('接收数据为: ', params);
      this.estateChange(params);
      // 取消订阅
      this.events.unsubscribe('bevents');
    });
    this.openWin(SearchhousePage);
  };

  estateChange(Value){
    // this.form.controls['adminDivisionCode'].setValue(Value.adminDivisionCode);
    // this.form.controls['estateName'].setValue(Value.estateName);
    // this.form.controls['estateId'].setValue(Value.estateId);
    this.form.controls['adminDivisionCode'].setValue(Value.site);
    this.form.controls['estateName'].setValue(Value.keyword);
    this.form.controls['estateId'].setValue(Value.id);
    // console.log('表单',this.form.value);
  }




  letterOfAttorney(){
    this.openWin(LetteratorneyPage,{
      propertyid:this.propertyid,
      estateId:this.data.estateId,
    })
  }

  /**
   * 房源实勘
   */

  lookHouse(){
    this.openWin(LookhousePage,{propertyId:this.propertyid,item:this.data});
  }

  rolepeople(){
    this.openWin(RolepeoplePage,{
      propertyid:this.propertyid,
    })
  }

  turn(){
    // console.log('表单',this.form);
  }

  addContactBolean = true;
  isClick:boolean = false ;
  errBtnHttp:boolean;
  //表单提交
  save(){
    this.isClick = true;
    this.errBtnHttp = true;
    if(this.form.value.tagsStr){
      this.form.patchValue({
        tags:this.tagsSum(this.form.value.tagsStr)
      });
      delete this.form.value.tagsStr;
    }
    if(isNaN(this.form.value.tags)){
      this.form.patchValue({
        tags:0
      });
      delete this.form.value.tagsStr;
    }
    // console.log('修改之后',this.form.value);

      if(this.addContactBolean){
     // 联系人
     this.form.value.contacts[0].contact = this.form.value.contact;
     this.form.value.contacts[0].contactInfo = this.form.value.contactInfo;
     this.form.value.contacts[0].sex = this.form.value.sex;
     var man2 ={
       contact:this.form.value.contact,
       contactInfo:this.form.value.contactInfo2,
       sex:this.form.value.sex,
       contactType:'mobile',
       desc:'',
     };
    var man3 ={
         contact:this.form.value.contact,
         contactInfo:this.form.value.contactInfo3,
         sex:this.form.value.sex,
         contactType:'mobile',
         desc:'',
     };
     this.form.value.contacts.push(man2);
     this.form.value.contacts.push(man3);
     this.addContactBolean = false;
   }

    this.form.value.contacts = JSON.stringify(this.form.value.contacts);
    var formData = {
      propertyId:this.propertyid,
      ...this.form.value
    };

    // formData.propertyDesc = formData.propertyDesc.replace(/\n/ig, '\\n');
   // console.log('提交',formData);

    this.propertyProvider.updates(formData).then(res=>{
        if(res.success){
          this.isClick = false;
        this.toast.msg('修改成功!');
         this.errBtnHttp =true;
        setTimeout(()=>{
          // this.navCtrl.setRoot(HousingPage);
          this.navCtrl.push(HousinfoPage,{propertyId:this.propertyid});
        },100);
      }else{
          this.isClick = true;
        this.toast.error('修改失败！');
          this.errBtnHttp =false;

      }
    })

  }


  //跟进
  goFollow(){
    this.openWin(FollowPage,{
      propertyid: this.data.propertyId,
      estatename: this.data.estateName,
      convid: this.data.convId,
      standardAddress:this.data.standardAddress
    })
  }

  //钥匙
  goKey(){
    this.openWin(KeyPage,{
      propertyid:this.propertyid,
      item:this.data,
    })
  }

  //更多
  clickIntention(){
    if(this.showIntention==false ){
      this.showIntention=true;
      this.right=false;
      this.down=true;
    }else{
      this.showIntention=false;
      this.right=true;
      this.down=false;
    }
  }
  //房源描述
  godesc(){
    // this.navCtrl.push(DescPage)
    this.events.subscribe('content', (params) => {
      // 接收B页面发布的数据
      // console.log('接收数据为: ', params);
      this.form.patchValue({propertyDesc:params});
      // console.log('表单的描述',this.form.value.propertyDesc);
      // 取消订阅
      this.events.unsubscribe('content');
    });
    this.openWin(DescPage,{content:this.form.value.propertyDesc});
  }

  //户型
  clickHx(){
    if(this.showHx==false ){
      this.showHx=true;
      this.HxRight=false;
      this.HxDown=true;
    }else{
      this.showHx=false;
      this.HxRight=true;
      this.HxDown=false;
    }
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

  //------跳转页面过渡--------//
  openWin(goPage, param = {}) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage, param, {animate:false});
  }
}

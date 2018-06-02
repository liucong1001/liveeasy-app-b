import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { RedacthousePage } from '../redacthouse/redacthouse';
import {SearchhousePage} from "../searchhouse/searchhouse";
import {RecordPage} from "../record/record";
import { LookhousePage } from './../lookhouse/lookhouse';
import { LetteratorneyPage } from '../letteratorney/letteratorney';
import { RolepeoplePage } from '../rolepeople/rolepeople';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "../../components/valid-error/valid-error";
import {PropertyModel} from "../../model/property/property.model";
import {LocalStorageProvider} from  '../../providers/local-storage/local-storage'
import {PropertyProvider} from "../../providers/property/property";
import {HousingPage} from "../housing/housing";
import {FollowPage} from "../follow/follow";
import {KeyPage} from "../key/key";
import {DescPage} from "../desc/desc";
/**
 * Generated class for the HousedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-housedetail',
  templateUrl: 'housedetail.html',
})
export class HousedetailPage {
  sensitiveInfo =false;
  showInfos=true;
  follow=false;
  data:PropertyModel;
  //更多
  showIntention=false;
  right=true;
  down=false;
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,public propertyProvider: PropertyProvider) {
    this.data = navParams.get('item');
    this.form.patchValue({
      buildingNo: this.data.buildingNo,
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
    });
    console.log('参数', this.data, '东浩', this.data.buildingNo);
    console.log(this.data.propertyId);
    this.propertyid=this.data.propertyId;
    this.localStorageProvider.set('propertyid',this.data.propertyId);
    //获取房源标签
    this.houLabel=this.localStorageProvider.get('labels');
    console.log(this.houLabel)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HousedetailPage');
  }

  form:FormGroup =this.fb.group({
    estate:[''],//楼盘
    estateName:[''],
    estateId:[''],
    buildingNo:['',Validators.required], //楼栋号
    unitNo:['',Validators.required],//单元号
    floorNo:['',[Validators.required,Validators.maxLength(5)]],//楼层
    houseNo:[''],//房间号
    spaceSize:[''],//建筑面积
    innerSpaceSize:[''],//套内面积
    propertyPrice:[''],//价格
    bedrooms:['1'],//室
    halls:['1'],
    bathrooms:['1'],
    kitchens:['1'],
    balconies:['1'],//阳
    orientation:[null],//房屋朝向
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
    contact:[],
    contactInfo:[],
    contactInfo2:[],
    sex:[],
    tags:[''],//房源标签

  });
  //表单验证消息
  errors={
    buildingNo:[
      new ErrorMessage('required','楼栋号必须要填写！'),
      new ErrorMessage('maxLength','这个长度太长了'),
    ],
    unitNo:[
      new ErrorMessage('required','单元号必须要填写！'),
    ],
    floorNo:[
      new ErrorMessage('required','楼层必须要填写！'),
      new ErrorMessage('maxLength','楼层名称太长了'),
    ]
  };


    presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '更多',
      buttons: [
        {
          text: '内容',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: '内容',
          handler: () => {
            console.log('Archive clicked');
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
  record(){
    this.navCtrl.push(RecordPage);
  }
  goRedact(){
    this.navCtrl.push(RedacthousePage);
  }
  showInfo(){
    this.sensitiveInfo =true;
    this.showInfos=false;
    this.follow=true;
  }
  goserach(){
    this.navCtrl.push(SearchhousePage)
  }
  letterOfAttorney(){
    this.navCtrl.push(LetteratorneyPage,{
      propertyid:this.propertyid,
    })
  }

  /**
   * 房源实勘
   */

  lookHouse(){
    this.navCtrl.push(LookhousePage,{item:this.navParams.get('item')});
  }
  rolepeople(){
    this.navCtrl.push(RolepeoplePage)
  }
  //表单提交
  save(){
    this.propertyProvider.updates({
      propertyId:this.propertyid,buildingNo:this.form.value.buildingNo,
      unitNo:this.form.value.unitNo,floorNo:this.form.value.floorNo,
      houseNo:this.form.value.houseNo,spaceSize:this.form.value.spaceSize,
      innerSpaceSize:this.form.value.innerSpaceSize,
      propertyPrice:this.form.value.propertyPrice,
      orientation:this.form.value.orientation,decoration:this.form.value.decoration,
    }).then(res=>{
      console.log(this.form.value);
      console.log(res);
      this.navCtrl.push(HousingPage)

    })
  }
  //跟进
  goFollow(){
    this.navCtrl.push(FollowPage,{
      propertyid: this.data.propertyId,
      estatename: this.data.estateName,
      convid: this.data.convId,
    })
  }

  //钥匙
  goKey(){
    this.navCtrl.push(KeyPage,{
      propertyid:this.propertyid,
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
    this.navCtrl.push(DescPage)
  }
}

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
  classFlag = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider) {
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
    this.localStorageProvider.set('propertyid',this.data.propertyId)
  }
public  id:any;


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
    this.navCtrl.push(LetteratorneyPage)
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

  }
  // 动态控制样式
  changeClass() {
    this.classFlag = !this.classFlag;
  }
}

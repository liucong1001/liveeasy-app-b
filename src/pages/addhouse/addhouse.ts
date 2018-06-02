import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorMessage} from '../../components/valid-error/valid-error';
import {AddhouseProvider} from "../../providers/addhouse/addhouse";
import {SearchhousePage} from "../searchhouse/searchhouse";
import {LocalStorageProvider} from  '../../providers/local-storage/local-storage'
import {HousingPage} from "../housing/housing";
import {DescPage} from "../desc/desc";
/**
 * Generated class for the AddhousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addhouse',
  templateUrl: 'addhouse.html',
})
export class AddhousePage {
  estateList:[any];
  classFlag = true;
  houLabel:any;
  //更多
  showIntention=false;
  right=true;
  down=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              private fb:FormBuilder,private addhouseProvider:AddhouseProvider,
              public localStorageProvider:LocalStorageProvider) {
       //楼盘列表
        this.addhouseProvider.estateListSelect().then(res=>{
           this.estateList = res.data.result;
        });

    //房源标签
    this.addhouseProvider.estateTagsSelect().then(res=>{
      console.log(res);
      this.houLabel=res.data;
      this.localStorageProvider.set('labels',res.data);
    })
  }

  form:FormGroup =this.fb.group({
      adminDivisionCode:[''],//楼盘相对应区域
      estate:['',Validators.required],//楼盘
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
      tags:['0'],//房源标签
     infoOwnerId:[1],//加盟商id 根据登录人判断他的加盟商id
     buildingType:['0'],
     buzzOwnerType:['0'],//交易权属
     buzzType:['0'],
    hasElevator:['0'],
    positionInBuilding:['2'],
    propertyLife:['1'],
    propertyMortgage:['0'],
    propertyPriceUnit:['1'],
    propertyType:['1'],

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


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddhousePage');
  }

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

  goserach(){
    this.navCtrl.push(SearchhousePage)
  }

  estateChange(Value){
    this.form.controls['adminDivisionCode'].setValue(Value.adminDivisionCode);
    this.form.controls['estateName'].setValue(Value.estateName);
    this.form.controls['estateId'].setValue(Value.estateId);
      console.log('表单',this.form.value);
  }

  save(){
    // this.form.controls['contacts'].valu
     this.form.value.contacts[0].contact = this.form.value.contact;
     this.form.value.contacts[0].contactInfo = this.form.value.contactInfo;
     this.form.value.contacts[0].sex = this.form.value.sex;

     this.form.value.contacts.push(this.form.value.contacts[0]);
     var tel=  this.form.value.contactInfo2;
     this.form.value.contacts[1].contactInfo  = tel;
     this.form.value.contacts = JSON.stringify(this.form.value.contacts);



    if(this.form.invalid){
      return false;
    }

    console.log('房源录入表单',this.form.value);
    this.addhouseProvider.save(this.form.value).then(res=>{
      if(res.success){
        alert('录入成功！');
        this.navCtrl.push(HousingPage);
      }

    },err=>{
      alert('录入失败');
    })
  }
// 动态控制样式
  changeClass() {
    this.classFlag = !this.classFlag;
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

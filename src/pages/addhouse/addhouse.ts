import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorMessage} from '../../components/valid-error/valid-error';
import {AddhouseProvider} from "../../providers/addhouse/addhouse";
import {SearchhousePage} from "../searchhouse/searchhouse";
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              private fb:FormBuilder,private addhouseProvider:AddhouseProvider) {
       //楼盘列表
        this.addhouseProvider.estateListSelect().then(res=>{
           this.estateList = res.data.result;
        });
        //房源标签
       this.addhouseProvider.estateTagsSelect().then(res=>{

       })
  }

  form:FormGroup =this.fb.group({
      estate:['',Validators.required],//楼盘
      estateName:[''],
      estateId:[''],
      building_no:['',Validators.required], //楼栋号
      unit_no:['',Validators.required],//单元号
      floor_no:['',[Validators.required,Validators.maxLength(5)]],//楼层
      house_no:[''],//房间号
      space_size:[''],//建筑面积
      inner_space_size:[''],//套内面积
      property_price:[''],//价格
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
        building_no:[
            new ErrorMessage('required','楼栋号必须要填写！'),
            new ErrorMessage('maxLength','这个长度太长了'),
        ],
        unit_no:[
            new ErrorMessage('required','单元号必须要填写！'),
        ],
        floor_no:[
            new ErrorMessage('required','楼层必须要填写！'),
            new ErrorMessage('maxLength','楼层名称太长了'),
        ]
    }


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

      // this.form.setValue({estateName:Value.estateName});
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

    if(this.form.invalid){
      return false;
    }

    console.log('房源录入表单',this.form.value);
    this.addhouseProvider.save(this.form.value).then(res=>{
      alert('录入成功！');
    })
  }

}

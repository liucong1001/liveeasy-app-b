import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {ErrorMessage} from '../../components/valid-error/valid-error';
import {AddhouseProvider} from "../../providers/addhouse/addhouse";
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              private fb:FormBuilder,private addhouseProvider:AddhouseProvider) {
       //楼盘列表
        this.addhouseProvider.estateListSelect().then(res=>{

        });
        //房源标签
       this.addhouseProvider.estateTagsSelect().then(res=>{

       })
  }

  form:FormGroup =this.fb.group({
      building_no:['',Validators.required], //楼栋号
      unit_no:['',Validators.required],//单元号
      floor_no:['',[Validators.required,Validators.maxLength(5)]],//楼层
      house_no:[''],//房间号
      space_size:[''],//建筑面积
      inner_space_size:[''],//套内面积
      property_price:[''],//价格
      orientation:[null],//房屋朝向
      decoration:[null],//装修水平
      contact:[''],//业主姓名
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
    
  }

  save(){
    if(this.form.invalid){
      return false;
    }
    console.log('房源录入表单',this.form.value);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController} from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorMessage} from '../../components/valid-error/valid-error';
import {AddhouseProvider} from "../../providers/addhouse/addhouse";
import {SearchhousePage} from "../searchhouse/searchhouse";
import {LocalStorageProvider} from  '../../providers/local-storage/local-storage'
import {HousingPage} from "../housing/housing";
import {DescPage} from "../desc/desc";
import { Events } from 'ionic-angular';
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
              public localStorageProvider:LocalStorageProvider,public events: Events) {
       //楼盘列表
        this.addhouseProvider.estateListSelect().then(res=>{
           this.estateList = res.data.result;
           console.log('楼盘列表',this.estateList);
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
      estate:[''],//楼盘
      estateName:[''],
      estateId:[''],
      buildingNo:['',Validators.required], //楼栋号
      unitNo:['',Validators.required],//单元号
      floorNo:['',[Validators.required,Validators.maxLength(5)]],//楼层
      houseNo:['',Validators.required],//房间号
      spaceSize:['',Validators.required],//建筑面积
      innerSpaceSize:['',Validators.required],//套内面积
      propertyPrice:['',Validators.required],//价格
      bedrooms:['1'],//室
      halls:['1'],
      bathrooms:['1'],
      kitchens:['1'],
      balconies:['1'],//阳
      orientation:['1',Validators.required],//房屋朝向
      decoration:['1'],//装修水平
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
     contactInfo:['',[Validators.required, Validators.pattern(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/)]],
     contactInfo2:['',Validators.pattern(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/)],
     sex:['male',Validators.required],
      tags:['0'],//房源标签
     infoOwnerId:[1],//加盟商id 根据登录人判断他的加盟商id
     buildingType:['0'],//建筑类型
     buzzOwnerType:['0'],//交易权属
     buzzType:['0'],
    hasElevator:['0'],//配备电梯
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
        ],
        unitNo:[
            new ErrorMessage('required','单元号必须要填写！'),
        ],
        floorNo:[
            new ErrorMessage('required','楼层必须要填写！'),
            new ErrorMessage('maxLength','楼层名称太长了'),
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
    this.events.subscribe('bevents', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据为: ', params);
      // this.form.value.estateName = params.estateName;
      // this.form.value.estateId =  params.estateId;
      this.estateChange(params);
      // 取消订阅
      this.events.unsubscribe('bevents');
    });
    this.navCtrl.push(SearchhousePage);
  }

  estateChange(Value){
    console.log('value',Value);
    // this.form.controls['adminDivisionCode'].setValue(Value.adminDivisionCode);
    // this.form.controls['estateName'].setValue(Value.estateName);
    // this.form.controls['estateId'].setValue(Value.estateId);
    //   console.log('表单',this.form.value);
    //哥
    this.form.controls['adminDivisionCode'].setValue(Value.site);
    this.form.controls['estateName'].setValue(Value.keyword);
    this.form.controls['estateId'].setValue(Value.id);
    console.log('表单',this.form.value);
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
   }
  tagsSelect(value){
    this.form.value.tags = this.tagsSum(value);
    console.log('标签',this.form.value.tags,this.form.value);
  }

  save(){
    this.tagsSelect(this.form.value.tags);
    console.log('触发save方法',this.form.value.contacts);
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

    this.form.value.contacts.push(man2);
     console.log('第二个人',man2,'联系人',this.form.value.contacts);
     this.form.value.contacts = JSON.stringify(this.form.value.contacts);

    if(this.form.invalid){
      return false;
    }

    console.log('房源录入表单',this.form.value,'联系人',this.form.value.contacts);

    this.addhouseProvider.save(this.form.value).then(res=>{
      if(res.success){
        alert('录入成功！');
        this.navCtrl.push(HousingPage);
      }else {
        alert('录入失败！');
      }

    },err=>{
      alert('录入失败');
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
    this.events.subscribe('content', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据为: ', params);
      this.form.patchValue({propertyDesc:params});
      console.log('表单的描述',this.form.value.propertyDesc);
      // 取消订阅
      this.events.unsubscribe('content');
    });
    this.navCtrl.push(DescPage,{content:this.form.value.propertyDesc});
  }

  menPai(event){
    console.log('门牌号',event);
  }

}

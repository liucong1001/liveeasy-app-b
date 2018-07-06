import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, App, Navbar} from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorMessage} from '../../../components/valid-error/valid-error';
import {AddhouseProvider} from "../../../providers/addhouse/addhouse";
import {SearchhousePage} from "../housedetail/searchhouse/searchhouse";
import {LocalStorageProvider} from '../../../providers/local-storage/local-storage'
import {HousingPage} from "../housing";
import {DescPage} from "../housedetail/desc/desc";
import { Events } from 'ionic-angular';
import {ToastComponent} from "../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import { Keyboard } from '@ionic-native/keyboard';
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
  // estateList:[any];
  classFlag = true;
  houLabel:any;
  //更多
  showIntention=false;
  right=true;
  down=false;
  //户型
  showHx=false;
  HxRight=true;
  HxDown=false;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,private keyboard: Keyboard,
              public actionSheetCtrl: ActionSheetController,
              private fb:FormBuilder,public nativePageTransitions: NativePageTransitions,
              private addhouseProvider:AddhouseProvider,
              public localStorageProvider:LocalStorageProvider,public events: Events ,public toast:ToastComponent,
              public app: App,public statusBar: StatusBar
  ) {
     //楼盘列表

    //房源标签
    this.houLabel = this.localStorageProvider.get('tagsList');

  }


  form:FormGroup =this.fb.group({
      adminDivisionCode:[''],//楼盘相对应区域
      estate:[''],//楼盘
      estateName:[''],
      estateId:[''],
      buildingNo:['',Validators.required], //楼栋号
      unitNo:['',Validators.required],//单元号
      floorNo:['',[Validators.required]],//楼层
      houseNo:['',Validators.required],//房间号
      spaceSize:['',Validators.required],//建筑面积
      innerSpaceSize:[''],//套内面积
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
     contactInfo:['',[Validators.required, Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)]],
     contactInfo2:['',Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)],
     sex:['male',Validators.required],
      tags:['0'],//房源标签
     infoOwnerId:[1],//加盟商id 根据登录人判断他的加盟商id
     buildingType:['0',Validators.required],//建筑类型
     buzzOwnerType:['0'],//交易权属
     buzzType:['1',Validators.required],//房屋用途
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

    tip(){
      this.toast.alert('alert默认消息');
      this.toast.msg('成功操作');
      this.toast.error('失败操作');
    }

  test(){
      console.log('测试',this.form.value);
   }

 //表单验证消息
    errors={
        buildingNo:[
            new ErrorMessage('required','楼栋号必须要填写！'),
            // new ErrorMessage('maxLength','这个长度太长了'),
            new ErrorMessage('pattern','请填写数字'),
        ],
        unitNo:[
            new ErrorMessage('required','单元号必须要填写！'),
            new ErrorMessage('pattern','请填写数字'),
        ],
        floorNo:[
            new ErrorMessage('required','楼层必须要填写！'),
            // new ErrorMessage('maxLength','楼层名称太长了'),
            new ErrorMessage('pattern','请填写数字'),
        ],
      houseNo:[
        new ErrorMessage('pattern','请填写英文或数字'),
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
      buildingType:[
        new ErrorMessage('required','建筑类型必须要填写！'),
      ],
      buzzType:[
        new ErrorMessage('required','房屋用途必须要填写！'),
      ],
      hasElevator:[
        new ErrorMessage('required','是否配备电梯必须要填写！'),
      ],
    };

  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddhousePage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
   //房屋用途
  buzzTypeJson = [
    {name:'出售',val:'1'},
    {name:'售租',val:'2'},
    {name:'租售',val:'3'},
  ];

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
     console.log(this.form,'表单不合法性',this.form.invalid,'内容',this.form.value);
    if(this.form.invalid){
      return false;
    }

    console.log('房源录入表单',this.form.value,'联系人',this.form.value.contacts);

    this.addhouseProvider.save(this.form.value).then(res=>{
      if(res.success){
       this.toast.msg('录入成功!');

        // this.app.getActiveNavs()[0].setRoot("HousingPage");
        setTimeout(()=>{
          this.navCtrl.setRoot(HousingPage);
        });

      }else {
        this.toast.error('录入失败！');
      }

    },err=>{
      this.toast.error('录入失败！');
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

}

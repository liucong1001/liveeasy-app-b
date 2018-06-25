import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerProvider} from "../../../../providers/customer/customer";
import {MypassengerPage} from "../mypassenger";
import {AddhouseProvider} from "../../../../providers/addhouse/addhouse";
import {SearchhousePage} from "../../../housing/housedetail/searchhouse/searchhouse";
import {ErrorMessage} from "../../../../components/valid-error/valid-error";
import {ToastComponent} from "../../../../components/toast/toast";
/**
 * Generated class for the AddpassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpassenger',
  templateUrl: 'addpassenger.html',
})
export class AddpassengerPage {
  showIntention=false;
  right=true;
  down=false;
  rest=false;
  restRight=true;
  restDown=false;
  customerSrcList = [];
  agentList = [];
  customeroGrageInfoList = [];
  //意向
  area = [];
  estateList = []; //楼盘列表
  district:any;
  tradingArea = [];//商圈数组
  shangQuan = [];//保存商圈
  intentionTradeCodeId:string;  //用于转换商圈

  constructor(public navCtrl: NavController, public navParams: NavParams,private fb:FormBuilder,public toast:ToastComponent,
              private customerProvider:CustomerProvider,private addhouseProvider:AddhouseProvider,
              public events: Events) {
    //客户来源
    this.customerProvider.customerSrcInfo().then(res=>{
       this.customerSrcList = res;
    });
    //客户归属
    this.customerProvider.agentList().then(res=>{
       this.agentList = res;
    });
    //客户等级
    this.customerProvider.customeroGrageInfo().then(res=>{
       this.customeroGrageInfoList = res;
    });
    //区域
    this.customerProvider.area().then(res=>{
      this.area = res.data.distrs;
    });
    //商圈
    this.customerProvider.tradingArea().then(res=>{
     this.shangQuan = this.tradingArea = res;
    });
    //楼盘列表
    this.addhouseProvider.estateListSelect().then(res=>{
      this.estateList = res.data.result;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpassengerPage');
  }


  form:FormGroup =this.fb.group({
    customerName:['',Validators.required],//客户名称
    customerGender :['1',Validators.required],//客户性别
    customerPhone:['',[Validators.required, Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)]],//客户电话
    customerSrc:['',Validators.required], //客户来源
    agentId:['',Validators.required],//归属人id
     customerGrade:['',],//客户等级
     intentionDiviCode :[''],//意向区域
    intentionTradeCode :[''],//意向商圈
    intentionEstate :[''],//意向楼盘
     minSpaceSize:[''],//最小面积
     maxSpaceSize:[''],//最大面积
     minPrice :[''],//最低价格
     maxPrice:[''],//最高价格
     minFloor:[''],//最低楼层
     maxFloor:[''],//最高楼层
     minBedroom:[''],//最少居室
     maxBedroom:[''],//最多居室
    minHall:[''],//最少厅
    maxHall:[''],//最多厅
    decorations:[],//装修要求
    requiredDemands:[''],//核心要求
    againstDemands:[''],//核心抵触点
    comments:[''],//备注
  });

  //表单验证消息
  errors={
    customerName:[
      new ErrorMessage('required','客户名称必须要填写！'),
    ],
    customerPhone:[
      new ErrorMessage('required','电话必须要填写！'),
      new ErrorMessage('pattern', '手机号码格式不正确！'),
    ],
    customerSrc:[
      new ErrorMessage('required','客户来源必须要填写！'),
    ],
    agentId:[
      new ErrorMessage('required','客户归属必须要填写！'),
    ],

  };

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
  rests(){
    if(this.rest==false ){
      this.rest=true;
      this.restRight=false;
      this.restDown=true;
    }else{
      this.rest=false;
      this.restRight=true;
      this.restDown=false;
    }
  }

  areaChange(event){

    this.tradingArea = [];
    if(this.shangQuan){
      for(var i in this.shangQuan){
        if(this.shangQuan[i].code.substring(0,6)==event){
          this.tradingArea.push(this.shangQuan[i]);
        }
      }
    }


  }
  estateName='';
  goserach(){
    this.events.subscribe('bevents', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据为: ', params);
      // this.form.value.estateName = params.estateName;
      // this.form.value.estateId =  params.estateId;
      this.estateName = params.keyword;
      this.form.controls['intentionEstate'].setValue(params.id);

      // 取消订阅
      this.events.unsubscribe('bevents');
    });
    this.navCtrl.push(SearchhousePage);
  }

  estateChange(Value){
    console.log('value',Value);
    //哥
    // this.form.controls['adminDivisionCode'].setValue(Value.site);
    // this.form.controls['estateName'].setValue(Value.keyword);
    if(Value){
      this.estateName = Value.keyword;
      this.form.controls['intentionEstate'].setValue(Value.id);
      console.log('表单',this.form.value);
    }

  }


  save(){
    console.log('表单客户',this.form.value);
    this.customerProvider.add(this.form.value).then(res=>{
      if (res.success){
        this.toast.msg('录入成功!');
        this.navCtrl.push(MypassengerPage);
      }
    },err=>{
       alert('录入失败！');
    })

  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerProvider} from "../../../providers/customer/customer";
import {MypassengerPage} from "../mypassenger/mypassenger";
import {AddhouseProvider} from "../../../providers/addhouse/addhouse";
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
  customerSrcList = [];
  agentList = [];
  customeroGrageInfoList = [];
  //意向
  area: any;
  estateList = []; //楼盘列表
  district:any;
  tradingArea = [];//商圈数组
  intentionTradeCodeId:string;  //用于转换商圈

  constructor(public navCtrl: NavController, public navParams: NavParams,private fb:FormBuilder,
              private customerProvider:CustomerProvider,private addhouseProvider:AddhouseProvider) {
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
      this.area = res;
    });
    //商圈
    this.customerProvider.tradingArea().then(res=>{
      this.tradingArea = res;
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
    customerGender :['',Validators.required],//客户性别
    customerPhone:['',Validators.required],//客户电话
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
    requiredDemands:[''],//核心要求
    againstDemands:[''],//核心抵触点
    comments:[''],//备注
  });

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


  save(){
    console.log('表单客户',this.form.value);
    var body = null;
    for(var key in this.form.value){
      body = body+'&'+key+'='+this.form.value[key]+'';
    }
    this.customerProvider.add(body).then(res=>{
      if (res.success){
        alert('录入成功!');
        this.navCtrl.push(MypassengerPage);
      }
    },err=>{
       alert('录入失败！');
    })
  }
}

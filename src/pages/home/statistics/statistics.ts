import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {StatusBar} from "@ionic-native/status-bar";
import {HomeProvider} from "../../../providers/home/home";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {PersonPage} from "./person/person";
import {el} from "@angular/platform-browser/testing/src/browser_util";

/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  pet: string = "house";
  selected :any;
  name:any;
  data:any;
  department = [];
  personal=[];
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,public homeProvider:HomeProvider,private fb:FormBuilder,
              public statusBar: StatusBar, public navParams: NavParams,public nativePageTransitions: NativePageTransitions,) {
    this.homeProvider.statis({
      startTime:'20180717',
      endTime:'20180717',
    }).then(res=>{
      this.data=res.data;
      let sorted = this.groupBy(res.data, function(item){
        if(item.storeCode){
          return [item.storeCode];
        }else {
          return [item.deptId];
        }
      });
      console.log('部门',sorted);
      for (var i in sorted) {
        this.department.push(sorted[i][0]);
      }
    });

  }

  // 分组
  groupBy( array , f ) {
    let groups = {};
    array.forEach( function( o ) {
      let group = JSON.stringify( f(o) );
      groups[group] = groups[group] || [];
      groups[group].push( o );
    });
    return Object.keys(groups).map( function( group ) {
      return groups[group];
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
    this.navBar.backButtonClick = this.backButtonClick;
  }
  form:FormGroup =this.fb.group({
    startTime:[''],
    endTime:[''],
  });

  startTime:any;
  endTime:any;
  getcontactFreeTm1(event){
    this.startTime=event.year+'0'+ event.month+event.day;
    console.log('时间',event,this.startTime);

  }
  getcontactFreeTm2(event){
    this.department=[];
    this.endTime=event.year+'0'+ event.month +event.day;
    this.homeProvider.statis({
      startTime:this.startTime,
      endTime:this.endTime,
    }).then(res=>{
      console.log(res);
      this.data=res.data;
      let sorted = this.groupBy(res.data, function(item){
        if(item.storeCode){
          return [item.storeCode];
        }else {
          return [item.deptId];
        }
      });
      console.log('部门',sorted);
      for (var i in sorted) {
        this.department.push(sorted[i][0]);
      }
    });
    console.log('表单',event);
  }


  id:any;
  xzNum=0;
  skNum=0;
  kkNum=0;
  flNum=0;
  jhNum=0;

  searchs(item){
    this.department=[];
    this.homeProvider.statis({
      startTime:item.start,
      endTime:item.end,
    }).then(res=>{
      // console.log(res.data)
      this.data=res.data;
      let sorted = this.groupBy(res.data, function(item){
        if(item.storeCode){
          return [item.storeCode];
        }else {
          return [item.deptId];
        }
      });
      console.log('部门',sorted);
      for (var i in sorted) {
        this.department.push(sorted[i][0]);
      }
    });
  }


  go(i){
    this.selected = i;
    if(this.selected.storeName){
      this.name=this.selected.storeName;
    }else {
      this.name=this.selected.deptName;
    }
    console.log(i.deptId);
    this.id=i.deptId;
    let sorted = this.groupBy(this.data, function(item){
      if(item.storeCode){
        return [item.storeCode];
      }else {
        return [item.deptId==i.deptId];
      }
      });

    //循环前置空所属对象
    this.personal=[];
    this.xzNum=0;
    this.skNum=0;
    this.kkNum=0;
    this.flNum=0;
    this.jhNum=0;
    //通过部门ID分组，循环数据
    for (var j in sorted){
      for(var h=0;h<sorted[j].length;h++){

        if (sorted[j][h].deptId==i.deptId || sorted[j][h].storeCode==i.deptId){
          if(sorted[j][h].statItem == 3001){
            // console.log('3001',sorted[j][h]);
            this.xzNum+=sorted[j][h].stateValue;
          }
          if(sorted[j][h].statItem == 3025){
            // console.log('3025',sorted[j][h]);
            this.skNum+=sorted[j][h].stateValue;
          }
          if(sorted[j][h].statItem == 3011){
            // console.log('3011',sorted[j][h]);
            this.kkNum+=sorted[j][h].stateValue;
          }
          if(sorted[j][h].statItem == 3012){
            // console.log('3012',sorted[j][h]);
            this.flNum+=sorted[j][h].stateValue;
          }
          if(sorted[j][h].statItem == 3007){
            // console.log('3007',sorted[j][h]);
            this.jhNum+=sorted[j][h].stateValue;
          }
        }
      }
      this.personal.push(sorted[j])
    }
    console.log('3001',this.xzNum +'/' + '3025',this.skNum +'/' + '3011',this.kkNum +'/'+
      '3012',this.flNum +'/' +'3007',this.jhNum )
    console.log('员工',this.personal)
  }




  titleJSON=[
    {name:'昨天',start:'20180717',end:'20180717',val:0},
    {name:'前天',start:'20180716',end:'20180716',val:1},
    {name:'本周',start:'20180716',end:'20180722',val:2},
    {name:'上周',start:'20180709',end:'20180715',val:3},
    {name:'本月',start:'20180701',end:'20180731',val:4},
  ]
  tipipe(val){
    for(var i in this.titleJSON){
      if(val == this.titleJSON[i].val){
        return this.titleJSON[i].name;
      }
    }
  }

  persons(){
    this.openWin(PersonPage,{
      data:this.personal,
      id:this.id,
    })
  }

  isActive(i) {
    return this.selected === i;
  };

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

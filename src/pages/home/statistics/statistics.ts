import {Component, ViewChild} from '@angular/core';
import {IonicPage, Item, Navbar, NavController, NavParams} from 'ionic-angular';
import {StatusBar} from "@ionic-native/status-bar";
import {HomeProvider} from "../../../providers/home/home";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {PersonPage} from "./person/person";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {ToastComponent} from "../../../components/toast/toast";

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
  full=false;
  all=true;
  yesterday:any;
  beforeDay:any;
  firstWeek:any;
  lastWeek:any;
  lastMonday:any;
  lastweekend:any;
  firstDay:any;
  lastDay:any;
  titleJSON:Array<any>;
  // start:any;
  // end:any;
  statItem:any;
  @ViewChild(Navbar) navBar: Navbar;
  errStatus :boolean;
  constructor(public navCtrl: NavController,public homeProvider:HomeProvider,private fb:FormBuilder,public toast:ToastComponent,
              public statusBar: StatusBar, public navParams: NavParams,public nativePageTransitions: NativePageTransitions,) {

    //本周
    var now = new Date();
    var nowTime = now.getTime() ;
    var day = now.getDay();
    var oneDayTime = 24*60*60*1000 ;
    //显示周一
    this.firstWeek = (((new Date(nowTime - (day-1)*oneDayTime)).toLocaleDateString()).replace('/','0')) ;
    //显示周日
    this.lastWeek =  (((new Date(nowTime + (7-day)*oneDayTime)).toLocaleDateString()).replace('/','0'))

    //上周
    var nows = new Date(); //当前日期
    var nowDayOfWeek = nows.getDay(); //今天本周的第几天
    var nowDay = now.getDate(); //当前日
    var nowMonth = now.getMonth(); //当前月
    var nowYear = now.getFullYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0; //
    //获得上周的开始日期
    function getLastWeekStartDate() {
      var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6);
      return weekStartDate;
    }
    //获得上周的结束日期
    function getLastWeekEndDate() {
      var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 0);
      return weekEndDate;
    }
    this.lastMonday=((getLastWeekStartDate().toLocaleDateString()).replace('/','0'))
    this.lastweekend=((getLastWeekEndDate().toLocaleDateString()).replace('/','0'))


    //本月
    var date = new Date();
    this.firstDay = (((new Date(date.getFullYear(), date.getMonth(), 1)).toLocaleDateString()).replace('/','0'))
    this.lastDay = (((new Date(date.getFullYear(), date.getMonth() + 1, 0)).toLocaleDateString()).replace('/','0'))

    var result = (new Date(date.getTime() - 24*60*60*1000)).toLocaleDateString();  //昨天
    this.yesterday=(result.replace('/','0')).replace(/\//g,'');
    console.log((new Date(date.getTime() - 24*60*60*1000)).toLocaleDateString());
    //前天
    this.beforeDay=(((new Date(date.getTime() - 48*60*60*1000)).toLocaleDateString()).replace('/','0'));
console.log(this.beforeDay)
    //判断时间格式
    this.homeProvider.statis({
      startTime:parseInt(this.yesterday),
      endTime:parseInt(this.yesterday),
    }).then(res=>{
      if(res.success){
        if(res.hasOwnProperty('data')){
          console.log(res.data)
          this.data=res.data
          alert(this.data)
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
          for (var all in sorted){
            for (var aa=0;aa<sorted[all].length;aa++){
              if(sorted[all][aa].statItem == 3001){
                this.tableJSON[0].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 3025){
                // console.log('3025',sorted[j][h]);
                this.tableJSON[1].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 3011){
                // console.log('3011',sorted[j][h]);
                this.tableJSON[2].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 3012){
                // console.log('3012',sorted[j][h]);
                this.tableJSON[3].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 3007){
                // console.log('3007',sorted[j][h]);
                this.tableJSON[4].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 4018){
                // console.log('3007',sorted[j][h]);
                this.tableJSON[5].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 4019){
                // console.log('3007',sorted[j][h]);
                this.tableJSON[6].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 4020){
                // console.log('3007',sorted[j][h]);
                this.tableJSON[7].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 4021){
                // console.log('3007',sorted[j][h]);
                this.tableJSON[8].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 4022){
                // console.log('3007',sorted[j][h]);
                this.tableJSON[9].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 4023){
                // console.log('3007',sorted[j][h]);
                this.tableJSON[10].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 5018){
                // console.log('3007',sorted[j][h]);
                this.tableJSON[11].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 5019){
                // console.log('3007',sorted[j][h]);
                this.tableJSON[12].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 5020){
                // console.log('3007',sorted[j][h]);
                this.tableJSON[13].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 5021){
                // console.log('3007',sorted[j][h]);
                this.tableJSON[14].result+=sorted[all][aa].stateValue;
              }
              if(sorted[all][aa].statItem == 5022){
                // console.log('3007',sorted[j][h]);
                this.tableJSON[15].result+=sorted[all][aa].stateValue;
              }
            }
            console.log(this.tableJSON);
            this.errStatus = false;
          }
          }else {
          // this.toast.error('暂无数据');
          // this.errStatus = true;
        }
      }else {
        this.toast.error('暂无数据');
        this.errStatus = true;
      }

    });

    //时间查询
    this.titleJSON=[
      {name:'昨天',start:this.yesterday,end:this.yesterday,val:0},
      {name:'前天',start:this.beforeDay,end:this.beforeDay,val:1},
      {name:'本周',start:this.firstWeek,end:this.lastWeek,val:2},
      {name:'上周',start:this.lastMonday,end:this.lastweekend,val:3},
      {name:'本月',start:this.firstDay,end:this.lastDay,val:4},
    ];
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



  //循环前置空所属对象
  getClear(){
    for(var t in this.tableJSON){
      this.tableJSON[t].result=0;
    }
  }
  //时间弹窗刷新
  goTime(){
    this.getClear();
    console.log(this.startTime,this.endTime)
    this.homeProvider.statis({
      startTime:this.startTime,
      endTime:this.endTime,
      statItem:this.statItem,
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
      for (var all in sorted){
        for (var aa=0;aa<sorted[all].length;aa++){
          if(sorted[all][aa].statItem == 3001){
            this.tableJSON[0].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 3025){
            // console.log('3025',sorted[j][h]);
            this.tableJSON[1].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 3011){
            // console.log('3011',sorted[j][h]);
            this.tableJSON[2].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 3012){
            // console.log('3012',sorted[j][h]);
            this.tableJSON[3].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 3007){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[4].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4018){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[5].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4019){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[6].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4020){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[7].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4021){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[8].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4022){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[9].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4023){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[10].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5018){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[11].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5019){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[12].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5020){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[13].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5021){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[14].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5022){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[15].result+=sorted[all][aa].stateValue;
          }
        }
      }
      console.log(this.tableJSON)
    });
    console.log('表单',event);

    this.clear();
    if(this.times ==1){
      this.times=2;
    }
  }
  startTime:any;
  endTime:any;
  tm1:any;
  tm2:any;
  getcontactFreeTm1(event){
    this.startTime=event.year+'0'+ event.month+event.day;

    if(this.startTime.length <8){
      this.startTime=event.year+'0'+ event.month+ '0'+event.day;
    }
    this.tm1=event.year +'/' + event.month+ '/' + event.day;
  }
  getcontactFreeTm2(event){
    this.endTime=event.year+'0'+ event.month +event.day;
    this.tm2=event.year +'/' + event.month+ '/' + event.day;
    if(this.endTime.length <8){
      this.endTime=event.year+'0'+ event.month+ '0'+event.day;
    }
  }

  //时间查询
  times=1;
  timeName:any;
  timer(item){
    this.getClear();
    this.department=[];
    this.timeName=item.name;
    this.startTime=item.start;
    this.endTime=item.end;
    if(item.start.length<9 || item.start.length <9){
      item.start=item.start.replace('/','0');
      item.end=item.end.replace('/','');
      console.log(item.start,item.end)
    }else if(item.start.length==9 || item.end.length == 9){
      item.start=item.start.replace('/','');
      item.end=item.end.replace('/','');
      console.log(item.start,item.end)
    }
    // console.log(item.start,item.end)
    this.homeProvider.statis({
      startTime:item.start,
      endTime:item.end,
      statItem:this.statItem,
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
      for (var all in sorted){
        for (var aa=0;aa<sorted[all].length;aa++){
          if(sorted[all][aa].statItem == 3001){
            this.tableJSON[0].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 3025){
            // console.log('3025',sorted[j][h]);
            this.tableJSON[1].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 3011){
            // console.log('3011',sorted[j][h]);
            this.tableJSON[2].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 3012){
            // console.log('3012',sorted[j][h]);
            this.tableJSON[3].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 3007){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[4].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4018){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[5].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4019){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[6].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4020){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[7].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4021){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[8].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4022){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[9].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4023){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[10].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5018){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[11].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5019){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[12].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5020){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[13].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5021){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[14].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5022){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[15].result+=sorted[all][aa].stateValue;
          }
        }
      }
      console.log(this.tableJSON)
    });
    console.log('表单',event);

    this.clear();
    if(this.times ==1){
      this.times=2;
    }
  }

  //快速查询
  fast=1;
  fastName:any;
  fasttips(item){
    this.getClear();
    this.department=[];
    this.statItem=item.statItem;
    this.fastName=item.name;
   if(this.startTime || this.endTime){
     if(this.startTime.length < 8 || this.endTime.length < 8 ){
       this.startTime=this.startTime.replace('/','0');
       this.endTime=this.endTime.replace('/','');
     }else if(this.startTime.length==9 || this.endTime.length == 9){
       this.startTime=this.startTime.replace('/','');
       this.endTime=this.endTime.replace('/','');
     }
   }else {
     if(item.name != '全部'){
       this.startTime =parseInt(this.yesterday);
       this.endTime =parseInt(this.yesterday)
     }
   }
   console.log(this.startTime,this.endTime)
    this.homeProvider.statis({
      startTime:this.startTime,
      endTime:this.endTime,
      statItem:item.statItem,
    }).then(res=>{
        console.log(res)
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
      for (var all in sorted){
        for (var aa=0;aa<sorted[all].length;aa++){
          if(sorted[all][aa].statItem == 3001){
            this.tableJSON[0].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 3025){
            // console.log('3025',sorted[j][h]);
            this.tableJSON[1].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 3011){
            // console.log('3011',sorted[j][h]);
            this.tableJSON[2].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 3012){
            // console.log('3012',sorted[j][h]);
            this.tableJSON[3].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 3007){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[4].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4018){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[5].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4019){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[6].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4020){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[7].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4021){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[8].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4022){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[9].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 4023){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[10].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5018){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[11].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5019){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[12].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5020){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[13].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5021){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[14].result+=sorted[all][aa].stateValue;
          }
          if(sorted[all][aa].statItem == 5022){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[15].result+=sorted[all][aa].stateValue;
          }
        }
      }
      console.log(this.tableJSON)
    })
    this.clear();
    if(this.fast ==1){
      this.fast=2;
    }
  }

  //获取员工
  allPersonal=[];
  person=[];
  go(item){
    this.all=false;
    this.full=true;
    this.selected = item;
    if(this.selected.storeName){
      this.name=this.selected.storeName;
    }else {
      this.name=this.selected.deptName;
    }
    console.log(item.deptId);
    this.id=item.deptId;
    let sorted = this.groupBy(this.data, function(item){
      if(item.storeCode){
        return [item.storeCode];
      }else {
        return [item.deptId==item.deptId];
      }
    });
    this.allPersonal=[];
    //通过部门ID分组
    for (var j in sorted){
      // this.personal.push(sorted[j]);
      //员工分组
      for (var i in sorted[j]){
        if (sorted[j][i].deptId==item.deptId || sorted[j][i].storeCode ==item.deptId){
          // console.log(sorted[j][i])
          this.allPersonal.push(sorted[j][i])
        }
      }
    }
    this.person=[];
    //所有员工分组，获取每组第一条数据
    let person = this.groupBy(this.allPersonal, function(item){
      return [item.personId];
    });
    for(var p in person){
      this.person.push(person[p][0]);
    }
    // console.log('所有员工', this.allPersonal,'单个员工',person)
    this.person.unshift({personName:'不限',personId:''});
  }
  id:any;
  rigthPerson=[];
  personName:any;
  staff=1;
  searchs(item){
    this.getClear();
    this.personName=item.personName;
    if(item.personName == '不限'){
      for (var i in this.allPersonal){
        console.log(this.allPersonal[i])
        if(this.allPersonal[i].statItem == 3001){
          this.tableJSON[0].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 3025){
          // console.log('3025',sorted[j][h]);
          this.tableJSON[1].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 3011){
          // console.log('3011',sorted[j][h]);
          this.tableJSON[2].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 3012){
          // console.log('3012',sorted[j][h]);
          this.tableJSON[3].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 3007){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[4].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 4018){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[5].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 4019){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[6].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 4020){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[7].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 4021){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[8].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 4022){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[9].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 4023){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[10].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 5018){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[11].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 5019){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[12].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 5020){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[13].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 5021){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[14].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 5022){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[15].result+=this.allPersonal[i].stateValue;
        }
      }

    }else {
      let perInfo = this.groupBy(this.allPersonal, function(item){
        return [item.personId == item.personId];
      });
      console.log(item.personId)
      //通过员工ID分组，循环数据
      for (var j in perInfo){
        for(var h=0;h<perInfo[j].length;h++){
          if (perInfo[j][h].personId==item.personId){
            // console.log(perInfo[j][h]);
            if(perInfo[j][h].statItem == 3001){
              console.log(perInfo[j][h])
              this.tableJSON[0].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 3025){
              // console.log('3025',sorted[j][h]);
              this.tableJSON[1].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 3011){
              // console.log('3011',sorted[j][h]);
              this.tableJSON[2].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 3012){
              // console.log('3012',sorted[j][h]);
              this.tableJSON[3].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 3007){
              // console.log('3007',sorted[j][h]);
              this.tableJSON[4].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 4018){
              // console.log('3007',sorted[j][h]);
              this.tableJSON[5].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 4019){
              // console.log('3007',sorted[j][h]);
              this.tableJSON[6].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 4020){
              // console.log('3007',sorted[j][h]);
              this.tableJSON[7].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 4021){
              // console.log('3007',sorted[j][h]);
              this.tableJSON[8].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 4022){
              // console.log('3007',sorted[j][h]);
              this.tableJSON[9].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 4023){
              // console.log('3007',sorted[j][h]);
              this.tableJSON[10].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 5018){
              // console.log('3007',sorted[j][h]);
              this.tableJSON[11].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 5019){
              // console.log('3007',sorted[j][h]);
              this.tableJSON[12].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 5020){
              // console.log('3007',sorted[j][h]);
              this.tableJSON[13].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 5021){
              // console.log('3007',sorted[j][h]);
              this.tableJSON[14].result+=perInfo[j][h].stateValue;
            }
            if(perInfo[j][h].statItem == 5022){
              // console.log('3007',sorted[j][h]);
              this.tableJSON[15].result+=perInfo[j][h].stateValue;
            }
          }
        }
      }

    }

    console.log(this.tableJSON);
    this.clear();
    if(this.staff ==1){
      this.staff=2;
    }
  }

  //table title
  tableJSON=[
    {name:'新增房源',val:0,result:0},
    {name:'实勘房源',val:1,result:0},
    {name:'空看次数',val:2,result:0},
    {name:'房源跟进次数',val:3,result:0},
    {name:'激活房源',val:4,result:0},
    {name:'录入客户',val:5,result:0},
    {name:'客户跟进次数',val:6,result:0},
    {name:'约看客户次数',val:7,result:0},
    {name:'带看次数',val:8,result:0},
    {name:'领取公客数',val:9,result:0},
    {name:'查看公客电话数',val:10,result:0},
    {name:'报单成交业绩（万）',val:11,result:0},
    {name:'报单房源归属业绩',val:12,result:0},
    {name:'报单实勘业绩',val:13,result:0},
    {name:'报单钥匙业绩',val:14,result:0},
    {name:'其他角色业绩',val:15,result:0},
  ]

  //快速查询
  fastJSON=[
    {name:'全部',val:0,statItem:''},
    {name:'房源',val:1,statItem:'30'},
    {name:'客户',val:2,statItem:'40'},
    {name:'报单',val:3,statItem:'50'},
  ]


  isActive(item) {
    return this.selected === item;
  };


  //menu
  show=false;
  time=false;
  fastSearch=false;
  pop=false;
  showMenu1() {
    if (this.show == false || this.time == true || this.fastSearch == true ) {
      this.show = true;
      this.pop = true;
      this.time = false;
      this.fastSearch = false;
    } else {
      this.show = false;
      this.pop = false;
    }
  }
  showMenu2() {
    if (this.time == false || this.show == true || this.fastSearch == true) {
      this.time = true;
      this.show = false;
      this.pop = true;
      this.fastSearch = false;
    } else {
      this.time = false;
      this.pop = false;
    }
  }
  showMenu3() {
    if (this.fastSearch == false || this.show == true || this.time == true) {
      this.fastSearch = true;
      this.show = false;
      this.pop = true;
      this.time = false;
    } else {
      this.fastSearch = false;
      this.pop = false;
    }
  }
  pops() {
    if (this.fastSearch == true || this.show == true || this.time == true) {
      this.fastSearch = false;
      this.show = false;
      this.pop = false;
      this.time = false;
    }
  }
  clear(){
    if (this.fastSearch == true || this.show == true || this.time == true) {
      this.fastSearch = false;
      this.show = false;
      this.pop = false;
      this.time = false;
    }
  }

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

// /**
//  * 定义搜索条件类
//  */
// class  seaParams {
//   startTime:string;
//   endTime:string; //商圈
//   statItem?:string;//户室
// }

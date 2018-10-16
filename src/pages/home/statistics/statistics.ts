import {Component, ViewChild} from '@angular/core';
import {IonicPage, Item, LoadingController, Navbar, NavController, NavParams} from 'ionic-angular';
import {StatusBar} from "@ionic-native/status-bar";
import {HomeProvider} from "../../../providers/home/home";
import {FormBuilder,FormsModule , FormGroup, Validators} from "@angular/forms";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {PersonPage} from "./person/person";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {ToastComponent} from "../../../components/toast/toast";
import {NativeProvider} from "../../../providers/native/native";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
  animations: [
    trigger('animation', [
      state('open', style({ opacity: 1,  height: '*'})),
      state('close', style({ opacity: 0, height: '0'})),
      transition('open => close', animate('.3s ease-in')),
      transition('close => open', animate('.3s ease-out')),
    ])
  ]
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
  endDate: String = new Date(new Date().getTime()-24 *60*60*1000).toISOString();
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,
              public homeProvider:HomeProvider,private fb:FormBuilder,public toast:ToastComponent,
              public statusBar: StatusBar, public navParams: NavParams,public nativePageTransitions: NativePageTransitions,
              public  nativeProvider:NativeProvider,) {

    var date = new Date();
    var year=(new Date(date.getTime() - 24*60*60*1000)).getFullYear();
    //昨天
    var yesMonth=(new Date(date.getTime() - 24*60*60*1000).getMonth())+1;
    var yesDd=(new Date(date.getTime() - 24*60*60*1000)).getDate();
    this.yesterday=year + ""+this.Appendzero(yesMonth) + this.Appendzero(yesDd);
    //前天
    var beforeMonth=(new Date(date.getTime() - 48*60*60*1000).getMonth())+1;
    var beforeDd=(new Date(date.getTime() - 48*60*60*1000)).getDate();
    this.beforeDay=year + ""+this.Appendzero(beforeMonth) + this.Appendzero(beforeDd);

    //本周
    var nowTime = date.getTime() ;
    var day = date.getDay();
    var oneDayTime = 24*60*60*1000 ;
    //显示周一
    var firstMonth=(new Date(nowTime - (day)*oneDayTime)).getMonth()+1;
    var firstDd=(new Date(nowTime - (day)*oneDayTime)).getDate();
    //显示周日
    var lastMonth=(new Date(nowTime + (7-day)*oneDayTime)).getMonth()+1;
    var lastDd=(new Date(nowTime + (7-day)*oneDayTime)).getDate();
    this.firstWeek=year + ""+this.Appendzero(firstMonth) + this.Appendzero(firstDd);
    // this.lastWeek=year + ""+this.Appendzero(lastMonth) + this.Appendzero(lastDd);
    this.lastWeek=this.yesterday;
    // console.log(this.firstWeek,this.lastWeek);
    //上周
    var nowDayOfWeek = date.getDay(); //今天本周的第几天
    var nowDay = date.getDate(); //当前日
    var nowMonth = date.getMonth(); //当前月
    var nowYear = date.getFullYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0; //
    //获得上周的开始日期
    function getLastWeekStartDate() {
      var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
      return weekStartDate;
    }
    //获得上周的结束日期
    function getLastWeekEndDate() {
      var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
      return weekEndDate;
    }
    //显示周一
    var lastMon=(getLastWeekStartDate()).getMonth()+1;
    var lastMDd=(getLastWeekStartDate()).getDate();
    //显示周日

    var lastWm=(getLastWeekEndDate()).getMonth()+1;
    var lastWd=(getLastWeekEndDate()).getDate();
    this.lastMonday=year + ""+this.Appendzero(lastMon) + this.Appendzero(lastMDd);
    this.lastweekend=year + ""+this.Appendzero(lastWm) + this.Appendzero(lastWd);
// console.log(this.lastMonday,lastMDd,this.lastweekend)
    //本月
    //显示月初
    //显示月初
    var firstMon=((new Date(date.getFullYear(), date.getMonth(), 1))).getMonth()+1;
    var firstMDd=((new Date(date.getFullYear(), date.getMonth(), 1))).getDate();
    //显示月末
    var lastMonEnd=((new Date(date.getFullYear(), date.getMonth()+1, 0))).getMonth()+1;
    var lastDdEnd=((new Date(date.getFullYear(), date.getMonth()+1, 0))).getDate();
    this.firstDay=year + ""+this.Appendzero(firstMon) + this.Appendzero(firstMDd);
    var distance=lastDdEnd-nowDay+1;
    this.lastDay=year + ""+this.Appendzero(lastMonEnd) + this.Appendzero(lastDdEnd-distance);

    let loading = this.loadingCtrl.create({
      content: '数据加载中...'
    });
    this.homeProvider.statis({
      startTime:parseInt(this.yesterday),
      endTime:parseInt(this.yesterday),
      // statItem:"",
    }).then(res=>{
      if(res.success){
        if(res.hasOwnProperty('data')){
          // console.log(res.data)
          this.data=res.data;
          this.metheod();
        }else {
          // this.toast.error('暂无数据');
          // this.errStatus = true;
        }
        loading.dismiss();
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

  Appendzero(obj) {
    if (obj < 10) return "0" + "" + obj;
    else return obj;
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
    // console.log('ionViewDidLoad StatisticsPage');
    //动画初始化
    for(var i = 1 ;i<4;i++){
      this.states[i]='close'
    }
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
    // this.navBar.backButtonClick = this.backButtonClick;
    this.navBar.backButtonClick = this.nativeProvider.back(this.navCtrl);

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

  jms=[];
  //public Menthod
  metheod(){
    let sorted = this.groupBy(this.data, function(item){
      if(item.storeCode){
        return [item.storeCode];
      }else {
        return [item.deptId];
      }
    });
    for (var all in sorted){
      this.department.push(sorted[all][0]);
      for (var aa=0;aa<sorted[all].length;aa++){
        if(sorted[all][aa].deptId.length==11){
          this.jms.push(sorted[all][aa]);
        }
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
        if(sorted[all][aa].statItem == 4026){
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
        if(sorted[all][aa].statItem == 5017){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[11].result+=sorted[all][aa].stateValue;
        }
        if(sorted[all][aa].statItem == 5018){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[12].result+=sorted[all][aa].stateValue;
        }
        if(sorted[all][aa].statItem == 5019){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[13].result+=sorted[all][aa].stateValue;
        }
        if(sorted[all][aa].statItem == 5020){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[14].result+=sorted[all][aa].stateValue;
        }
        if(sorted[all][aa].statItem == 5021){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[15].result+=sorted[all][aa].stateValue;
        }
        if(sorted[all][aa].statItem == 5022){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[16].result+=sorted[all][aa].stateValue;
        }
      }
    }
    // console.log(this.tableJSON)
  }

  //判断部门员工有无数据显示
  showen(){
    this.person=[];
    this.staff=1;
    this.personName='';
  }


  //时间弹窗刷新
  goTime(){
    this.department=[];
    let loading = this.loadingCtrl.create({
      content: '数据加载中...'
    });
    loading.present();
    this.getClear();
    if(this.form.value.startTime=='' || this.form.value.endTime==''){
      this.toast.error('请选择时间');
      loading.dismiss();
    }else if(this.form.value.startTime!=''&&this.form.value.endTime!=''){
      if(this.form.value.startTime > this.form.value.endTime){
        this.toast.error('开始日期不得大于结束日期');
      }else {
        if(this.times ==2 || this.times ==1){
          if(this.times==2){
            for(var i in this.sausage){
              this.sausage[i]=false;
            }
          }
          this.times=3;
        }
        // console.log(this.startTime,this.endTime)
        this.homeProvider.statis({
          startTime:this.startTime,
          endTime:this.endTime,
          statItem:this.statItem,
        }).then(res=>{
          if(res.success){
            if(res.hasOwnProperty('data')){
              this.data=res.data;
              this.metheod();
              this.showen();
            }else {
              this.department=[];
              this.showen();
            }
          }else {
            this.toast.error('暂无数据');
            this.errStatus = true;
          }
        });
        // console.log('表单',event);
        this.allClose();

      }
      loading.dismiss();
    }else if(this.form.value.startTime==''&&this.form.value.endTime==''){
      this.times =1;
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
  falsees=false;
  timer(item,index){
    let loading = this.loadingCtrl.create({
      content: '数据加载中...'
    });
    loading.present();
    this.getClear();
    var date=new Date().toLocaleDateString();

    // debugger;
    if(date.length<9){
      date=date.replace('/','0');
    }else if(date.length==9){
      date=date.replace('/','0');
      date=date.replace('/','');
    }
    // console.log(date,this.firstWeek)
    if(date==this.firstWeek&&item.val==2){
      this.toast.error('每周第一天无统计数据!');
      this.showen();
      this.allClose();
      this.reset();
    }else {
      this.department=[];
      this.timeName=item.name;
      this.startTime=item.start;
      this.endTime=item.end;
      if(item.start.length<9 || item.end.length <9){
        item.start=item.start.replace('/','0');
        item.end=item.end.replace('/','');
      }else if(item.start.length==9 || item.end.length == 9){
        item.start=item.start.replace('/','');
        item.end=item.end.replace('/','');
      }
      this.homeProvider.statis({
        startTime:parseInt(item.start),
        endTime:parseInt(item.end),
        statItem:this.statItem,
      }).then(res=>{
        if(res.success){
          if(res.hasOwnProperty('data')) {
            this.data=res.data;
            this.metheod();
            this.showen();
            // this.falsees=true;
          }else {
            this.department=[];
            this.showen();
          }

        }else {
          this.toast.error('暂无数据');
          this.errStatus = true;
        }
      });

      this.allClose();
      if(this.times ==1 || this.times ==3){
        if (this.times==3){
          this.form.setValue({
            startTime:'',
            endTime:''
          })
          this.form.value.endTime='';
        }
        this.times=2;
      }
    }
    loading.dismiss();

  }
  //重置
  sausage=[];
  reset(){
    // console.log('清除',this.sausage);
    for(var i in this.sausage){
      this.sausage[i]=false;
    }
    this.form.setValue({
      startTime:'',
      endTime:''
    });
    // this.pop=false;
    // this.time=false;
    this.allClose();
    this.times=1;
    this.staff=1;
    this.department=[];
    this.person=[];
    this.personName='';
    for(var i in this.tableJSON){
      this.tableJSON[i].result=0;
    }
  }

  //快速查询
  fast=1;
  fastName:any;
  fasttips(item){
    let loading = this.loadingCtrl.create({
      content: '数据加载中...'
    });
    loading.present();
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
    // console.log(this.startTime,this.endTime)
    this.homeProvider.statis({
      startTime:parseInt(this.startTime),
      endTime:parseInt(this.endTime),
      statItem:item.statItem,
    }).then(res=>{
      if(res.success){
        if(res.hasOwnProperty('data')){
          // console.log(res)
          this.data=res.data;
          this.metheod();
        }
        loading.dismiss();
      }else {
        this.toast.error('暂无数据');
        this.errStatus = true;
      }
    });
    this.allClose();
    if(this.fast ==1){
      this.fast=2;
    }
  }

  //获取员工
  allPersonal=[];
  person=[];
  go(item){
    let loading = this.loadingCtrl.create({
      content: '数据加载中...'
    });
    this.all=false;
    this.full=true;
    this.selected = item;
    if(item.deptId.length==11){
      this.name=this.selected.personName;
    }else if(this.selected.storeName){
        this.name=this.selected.storeName;
    }else {
      this.name=this.selected.deptName;
    }
    if(item.deptId.length!=11){
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
          if(item.deptId.length>14){
            item.deptId=item.deptId.substring(0,14);
          }
          if (sorted[j][i].deptId==item.deptId || sorted[j][i].storeCode ==item.deptId){
            // console.log(sorted[j],item.deptId,item.deptId.length)
            this.allPersonal.push(sorted[j][i])
          }
        }
      }
      // console.log(this.allPersonal,sorted[j][i].storeCode)
      this.person=[];
      //所有员工分组，获取每组第一条数据
      let person = this.groupBy(this.allPersonal, function(item){
        return [item.personId];
      });

      for(var p in person){
        if(person[p][0].personName!=undefined){
          this.person.push(person[p][0]);
        }
      }
      // console.log('所有员工', this.allPersonal,'单个员工',person)
      this.person.unshift({personName:'不限',personId:''});
    }else {
      this.all=true;
      this.full=false;
      this.searchs(item);
    }

    loading.dismiss();
  }

  //定义变量分别获取及蒙上
  getPerson(item){

    let perInfo = this.groupBy(this.allPersonal, function(item){
      return [item.personId == item.personId];
    });
    for (var j in perInfo){
      for(var h=0;h<perInfo[j].length;h++){
        if (perInfo[j][h].personId==item.personId){
          // console.log(perInfo[j][h]);
          if(perInfo[j][h].statItem == 3001){
            // console.log(perInfo[j][h])
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
          if(perInfo[j][h].statItem == 4026){
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
          if(perInfo[j][h].statItem == 5017){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[11].result+=perInfo[j][h].stateValue;

          }
          if(perInfo[j][h].statItem == 5018){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[12].result+=perInfo[j][h].stateValue;
          }
          if(perInfo[j][h].statItem == 5019){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[13].result+=perInfo[j][h].stateValue;
          }
          if(perInfo[j][h].statItem == 5020){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[14].result+=perInfo[j][h].stateValue;
          }
          if(perInfo[j][h].statItem == 5021){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[15].result+=perInfo[j][h].stateValue;
          }
          if(perInfo[j][h].statItem == 5022){
            // console.log('3007',sorted[j][h]);
            this.tableJSON[16].result+=perInfo[j][h].stateValue;
          }
        }
      }
    }
  }

  id:any;
  personName:any;
  staff=1;
  searchs(item){
    let loading = this.loadingCtrl.create({
      content: '数据加载中...'
    });
    loading.present();
    this.getClear();
    this.personName=item.personName;

    if(item.personName == '不限'){
      for (var i in this.allPersonal){
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
        if(this.allPersonal[i].statItem == 4026){
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
        if(this.allPersonal[i].statItem == 5017){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[11].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 5018){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[12].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 5019){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[13].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 5020){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[14].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 5021){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[15].result+=this.allPersonal[i].stateValue;
        }
        if(this.allPersonal[i].statItem == 5022){
          // console.log('3007',sorted[j][h]);
          this.tableJSON[16].result+=this.allPersonal[i].stateValue;
        }
      }
    }else if(item.deptId.length==11) {
      this.allPersonal=[];
      for(var i in this.jms){
        this.allPersonal.push(this.jms[i]);
      }
      this.getPerson(item);
    }else {
      this.getPerson(item);
    }
    // console.log(this.allPersonal);
    this.allClose();
    if(this.staff ==1){
      this.staff=2;
    }
    loading.dismiss();
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
    {name:'报单作废',val:11,result:0},
    {name:'报单成交业绩（万）',val:12,result:0},
    {name:'报单房源归属业绩',val:13,result:0},
    {name:'报单实勘业绩',val:14,result:0},
    {name:'报单钥匙业绩',val:15,result:0},
    {name:'其他角色业绩',val:16,result:0},
  ];

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
  states=[];
  toggleNum:any;
  pop=false;
  toggleSta(num){
    // debugger;
    this.toggleNum=num;
    if(this.states[num]=='close'){
      for(var i=1;i<4;i++){
        if(i!=num){
          this.states[i] = this.states[i] === 'open' ? 'close' : 'close';
        }
      }
      this.states[num] = this.states[num] === 'close' ? 'open' : 'close';
      this.pop=true;
    }else  {
      this.states[num] = this.states[num] === 'open' ? 'close' : 'close';
      this.pop=false;
    }
  }
  allClose(){
    this.states[this.toggleNum] = this.states[this.toggleNum] === 'open' ? 'close' : 'close';
    this.pop=false;
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

}

// /**
//  * 定义搜索条件类
//  */
// class  seaParams {
//   startTime:string;
//   endTime:string; //商圈
//   statItem?:string;//户室
// }

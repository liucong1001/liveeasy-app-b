import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StatusBar} from "@ionic-native/status-bar";
import {HomeProvider} from "../../../providers/home/home";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  status=[];
  constructor(public navCtrl: NavController,public homeProvider:HomeProvider,private fb:FormBuilder,
              public statusBar: StatusBar, public navParams: NavParams) {
    function unique4(array){
      array.sort();
      var re=[array[0]];
      for(var i = 1; i < array.length; i++){
        if( array[i] !== re[re.length-1])
        {
          re.push(array[i]);
        }
      }
      return re;
    }
    this.homeProvider.statis({
      startTime:this.startTime,
      endTime:this.endTime,
    }).then(res=>{
      // console.log(res.data)
      this.data=res.data;
      let sorted = this.groupBy(res.data, function(item){
        return [item.deptId];
      });
      // console.log('部门',sorted);
      for (var i in sorted) {
        this.department.push(sorted[i][0]);
        // let person = this.groupBy(sorted[i], function (item) {
        //   return [item.personId];
        // });
        // for(var j in person){
        //   this.personal.push(person[j]);
        //
        //   let status = this.groupBy(person[j], function(item){
        //     return [item.statItem];
        //   });
        //   for(var h in status){
        //     this.status.push(status[h]);
        //   }
        // }
      }
      // console.log("部门",this.department);
      // console.log("员工",this.personal);
      // console.log("状态",this.status);

    });

  }

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
  }
  form:FormGroup =this.fb.group({
    startTime:[''],
    endTime:[''],
  });

  startTime:any;
  endTime:any;
  getcontactFreeTm1(event){
    this.startTime=event.year+'0'+ event.month +'0'+event.day;
    console.log('时间',event,this.startTime);
  }
  getcontactFreeTm2(event){
    this.endTime=event.year+'0'+ event.month +'0'+event.day;
    this.homeProvider.statis({
      startTime:this.startTime,
      endTime:this.endTime,
    }).then(res=>{
      console.log(res)
    });
    console.log('表单',event);
  }
  id:any;
  xzNum=0;
  skNum=0;
  kkNum=0;
  flNum=0;
  jhNum=0;
  go(i){
    this.selected = i;
    if(this.selected.storeName){
      this.name=this.selected.storeName;
    }else {
      this.name=this.selected.deptName;
    }
    console.log(i.deptId)
    let sorted = this.groupBy(this.data, function(item){
        return [item.deptId==i.deptId];
      });
    for (var j in sorted){

      for(var h=0;h<sorted[j].length;h++){
        if (sorted[j][h].deptId==i.deptId){

            this.personal.push(sorted[j][h])
          if(sorted[j][h].statItem == 3001){
              debugger;

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
    }
    console.log('3001',this.xzNum +'/' + '3025',this.skNum +'/' + '3011',this.kkNum +'/'+
      '3012',this.flNum +'/' +'3007',this.jhNum )
  }
  titleJSON=[
    {name:'新增房源',val:'3001'},
    {name:'实勘房源',val:'3025'},
    {name:'空看次数',val:'3011'},
    {name:'房源跟进次数',val:'3012'},
    {name:'激活房源',val:'3007'}
  ]
  tipipe(val){
    for(var i in this.titleJSON){
      if(val == this.titleJSON[i].val){
        return this.titleJSON[i].name;
      }
    }
  }

  isActive(i) {
    return this.selected === i;
  };
}

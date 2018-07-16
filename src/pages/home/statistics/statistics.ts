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
  pet: string = "puppies";
  selected :any;
  name:any;
  constructor(public navCtrl: NavController,public homeProvider:HomeProvider,private fb:FormBuilder,
              public statusBar: StatusBar, public navParams: NavParams) {

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

  go(i){
    this.selected = i;
    this.name=this.selected.name;
    console.log(this.name)
  }
  aa:any;
  isActive(i) {

    return this.selected === i;
  };

  storeJSON=[
    {name:'武昌一店',val:1},
    {name:'武昌二店',val:2},
    {name:'武昌三店',val:3},
    {name:'武昌四店',val:4},
  ]

}

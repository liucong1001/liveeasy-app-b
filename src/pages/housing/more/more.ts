import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {TabsPage} from "../../tabs/tabs";
import {HousingPage} from "../housing";
import {MyApp} from "../../../app/app.component";
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  @ViewChild('content') nav: Nav;
  tagsList:any;
  selected:any;
  rootPage:any = MyApp ;
  constructor(public navCtrl: NavController, public navParams: NavParams,public localStorageProvider: LocalStorageProvider,) {
    //标签
    this.tagsList=this.localStorageProvider.get('tagsList');
    console.log(this.tagsList)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  go(item){
    this.selected = item;
  }
  isActive(item) {
    // return this.selected == item;
  };
  //更多
  //其他
  qtJSON = [
    {name:'只看我的房源',val:0},
    {name:'待处理关闭申请房源',val:1},
    {name:'待审核实勘房源',val:2},
    {name:'待确认钥匙房源',val:3},
  ];
  //朝向
  cxJSON = [
    {name:'全部',val:0},
    {name:'东',val:1},
    {name:'南',val:2},
    {name:'西',val:3},
    {name:'北',val:4},
    {name:'南北',val:5},
    {name:'双南',val:6},
    {name:'东西',val:7},
    {name:'东南',val:8},
    {name:'西南',val:9},
    {name:'东北',val:10},
    {name:'西北',val:11},
  ];

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddhouseProvider} from "../../providers/addhouse/addhouse";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from '@angular/common/http';
import { Events } from 'ionic-angular';
import {PropertyProvider} from "../../providers/property/property";
import {HousingPage} from "../housing/housing";
import {HomePage} from "../home/home";
/**
 * Generated class for the AllsearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allsearch',
  templateUrl: 'allsearch.html',
})
export class AllsearchPage {
  estateList:[any];//楼盘
  callback:any;
  search:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public addhouseProvider:AddhouseProvider,
              public localStorageProvider:LocalStorageProvider, public events: Events,public propertyProvider:PropertyProvider,
              private http:HttpClient) {
    this.search = navParams.get('floorName');


  }

  getData(data){
    var path = 'http://47.75.151.57:7077/live/search?keyword='+data+'&site=4201';
    return  this.http.get(path).toPromise().then(res=>{
      return res as any;
    });
  }
  floor = [];
  edit = false;
  getFloorKey(event){
    console.log('值',this.search);
    this.getData(event._value).then(res=>{
      this.floor = res.result;
      this.edit = true;

      if(this.search==''){
        this.edit =false;
      }

    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AllsearchPage');
  }

  select(item){
    console.log('idnex的值',this.navParams.get('index'),'item的值',item);
    if(this.navParams.get('index')==1&&item==null){
      this.navCtrl.setRoot(HomePage,{item:item});
      // alert('主页');
    }
    else  {
      // alert('列表页');
      this.navCtrl.setRoot(HousingPage,{item:item});
      // this.navCtrl.setRoot()HousingPage,{item:item});
      // this.navCtrl.popTo(HousingPage,{item:item})
      this.navCtrl.parent.select(1);
    }
  }

  back(){
    this.navCtrl.pop()
  }
}

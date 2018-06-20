import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlookrecordPage } from '../../passengerdetail/plookrecord/plookrecord';
import { PfollowrecordPage } from '../../passengerdetail/pfollowrecord/pfollowrecord';
import { AddpublicguestPage } from './addpublicguest/addpublicguest';
import {CustomerProvider} from "../../../../providers/customer/customer";

/**
 * Generated class for the PublicpdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicpdetail',
  templateUrl: 'publicpdetail.html',
})
export class PublicpdetailPage {
  showIntention=false;
  right=true;
  down=false;
  customerId:any;
  data:object;
  datas:any;
  customeroGrageInfoList = [];//客户等级
  constructor(public navCtrl: NavController, public navParams: NavParams,public customerProvider:CustomerProvider) {
    this.customerId=navParams.get('customerId');
    console.log(navParams.data);

    this.customerProvider.getPublicDetail(this.customerId).then(res=>{
      this.data = res.data;
      this.datas=res.data.entity;
       // console.log('公客详情',res);
    });
    //
    this.customerProvider.customeroGrageInfo().then(res=>{
      this.customeroGrageInfoList = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicpdetailPage');
  }
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
  addPublicGuest(){
    this.navCtrl.push(AddpublicguestPage)
  }
  passengerLook(){
    this.navCtrl.push(PlookrecordPage,{
      id:this.datas,
    })
  }
  passengerFollow(){
    this.navCtrl.push(PfollowrecordPage,{
      id:this.datas,
    })
  }
  //客户等级转换
  customerGrade(val){
    if(val){
      for(var i in this.customeroGrageInfoList){
           if(this.customeroGrageInfoList[i].value==val){
             return this.customeroGrageInfoList[i].label;
           }
      }
    }
  }

}

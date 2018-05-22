import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpassengerPage } from '../addpassenger/addpassenger';
import { PassengerdetailPage } from '../passengerdetail/passengerdetail';
import { PassengerlookPage } from './../passengerlook/passengerlook';
import { PassengerfollowPage } from './../passengerfollow/passengerfollow';
import { CloseprivateguestPage } from '../closeprivateguest/closeprivateguest';
/**
 * Generated class for the MypassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mypassenger',
  templateUrl: 'mypassenger.html',
})
export class MypassengerPage {
  show=false;
  houseType=false;
  more=false;
  pop=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypassengerPage');
  }
  //menu
  showMenu1(){
    if(this.show==false || this.houseType == true || this.more == true ){
      this.show=true;
      this.pop=true;
      this.houseType = false;
      this.more=false;
    }else{
      this.show=false;
      this.pop=false;
    }
  }
  showMenu2(){
    if(this.houseType==false || this.show == true || this.more == true ){
      this.houseType=true;
      this.show=false;
      this.pop=true;
      this.more = false;
    }else{
      this.houseType = false;
      this.pop=false;
    }
  }
  showMenu3(){
    if(this.more==false || this.show == true || this.houseType == true){
      this.more=true;
      this.show=false;
      this.pop=true;
      this.houseType = false;
    }else{
      this.more = false;
      this.pop=false;
    }
  }
  addpassenger(){
    this.navCtrl.push(AddpassengerPage)
  }
  gopassengerDetail(){
    this.navCtrl.push(PassengerdetailPage);
  }
  gopFollow(){
    this.navCtrl.push(PassengerfollowPage)
  }
  golook(){
    this.navCtrl.push(PassengerlookPage)
  }
  closePrivateGuest(){
    this.navCtrl.push(CloseprivateguestPage)
  }
}

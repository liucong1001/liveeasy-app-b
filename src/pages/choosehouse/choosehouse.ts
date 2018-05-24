import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PublicpassengerPage } from '../publicpassenger/publicpassenger';

/**
 * Generated class for the ChoosehousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choosehouse',
  templateUrl: 'choosehouse.html',
})
export class ChoosehousePage {
  show=false;
  houseType=false;
  more=false;
  pop=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosehousePage');
  }
  //menu
  showMenu1(){
    if(this.show==false || this.houseType == true || this.more == true){
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
    if(this.show == true || this.more == true){
      this.show=false;
      this.pop=true;
      this.more = false;
      this.houseType = false;
    }else{
      this.pop=false;
    }
  }
  gopublicpasger(){
    this.navCtrl.push(PublicpassengerPage)
  }
}

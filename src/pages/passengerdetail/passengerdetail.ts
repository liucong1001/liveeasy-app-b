import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PfollowrecordPage } from './../pfollowrecord/pfollowrecord';
import { PlookrecordPage } from './../plookrecord/plookrecord';
/**
 * Generated class for the PassengerdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passengerdetail',
  templateUrl: 'passengerdetail.html',
})
export class PassengerdetailPage {
  showIntention=false;
  right=true;
  down=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerdetailPage');
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
  passengerLook(){
    this.navCtrl.push(PlookrecordPage)
  }
  passengerFollow(){
    this.navCtrl.push(PfollowrecordPage)
  }

}

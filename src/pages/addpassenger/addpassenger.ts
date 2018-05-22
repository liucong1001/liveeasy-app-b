import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddpassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpassenger',
  templateUrl: 'addpassenger.html',
})
export class AddpassengerPage {
  showIntention=false;
  right=true;
  down=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpassengerPage');
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
}

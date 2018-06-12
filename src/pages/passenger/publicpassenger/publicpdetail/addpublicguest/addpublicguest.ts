import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeclarationPage } from '../../../../home/declaration/declaration';

/**
 * Generated class for the AddpublicguestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpublicguest',
  templateUrl: 'addpublicguest.html',
})
export class AddpublicguestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpublicguestPage');
  }
  goDeclaration(){
    this.navCtrl.push(DeclarationPage)
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { RedacthousePage } from '../redacthouse/redacthouse';
import {SearchhousePage} from "../searchhouse/searchhouse";

/**
 * Generated class for the HousedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-housedetail',
  templateUrl: 'housedetail.html',
})
export class HousedetailPage {
  sensitiveInfo =false;
  showInfos=true;
  follow=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HousedetailPage');
  }

    presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '更多',
      buttons: [
        {
          text: '内容',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: '内容',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: '关闭',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  goRedact(){
    this.navCtrl.push(RedacthousePage);
  }
  showInfo(){
    this.sensitiveInfo =true;
    this.showInfos=false;
    this.follow=true;
  }
  goserach(){
    this.navCtrl.push(SearchhousePage)
  }
}

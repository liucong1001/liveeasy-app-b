import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
  }
  go(i){
    this.selected = i;
    this.name=this.selected.name
  }
  isActive(i) {
    return this.selected === i;
  };

  storeJSON=[
    {name:'武昌一店'},
    {name:'武昌二店'},
    {name:'武昌三店'},
    {name:'武昌四店'},
  ]

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchhousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchhouse',
  templateUrl: 'searchhouse.html',
})
export class SearchhousePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchhousePage');
  }

  items;
  initializeItems(){
      this.items=[
          'Amsterdam',
          'Bogota',
          'Buenos Aires',
          'Cairo',
          'Dhaka',
          'Edinburgh',
          'Uelzen',
          'Washington'
      ]
  }
  getItems(ev){
      this.initializeItems();
      var val=ev.target.value;
      if(val&&val.trim()!=''){
          this.items=this.items.filter((item)=>{
              return (item.toLowerCase().indexOf(val.toLowerCase())>-1)
          })
      }
  }
}

import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";

/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {
  @ViewChild(Navbar) navBar: Navbar;
  data:any;
  id:any;
  allPersonal=[];
  person=[];
  selected:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public nativePageTransitions: NativePageTransitions,) {
    this.data=navParams.get('data');
    this.id=navParams.get('id')
    // console.log('员工',this.data,'id',this.id);
    for (var i in this.data){
      for(var h=0;h<this.data[i].length;h++){
        // console.log(this.data[i][h])
        if (this.data[i][h].deptId==this.id || this.data[i][h].storeCode ==this.id){
          // console.log(this.data[i][h])
          this.allPersonal.push(this.data[i][h])
        }
      }
    }
    // console.log('员工', this.allPersonal)
    let person = this.groupBy(this.allPersonal, function(item){
      return [item.personId];
    });
    for(var p in person){
      this.person.push(person[p][0])
    }
    // console.log(person)
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PersonPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
// 分组
  groupBy( array , f ) {
    let groups = {};
    array.forEach( function( o ) {
      let group = JSON.stringify( f(o) );
      groups[group] = groups[group] || [];
      groups[group].push( o );
    });
    return Object.keys(groups).map( function( group ) {
      return groups[group];
    });
  }
  xzNum=0;
  skNum=0;
  kkNum=0;
  flNum=0;
  jhNum=0;
  name:any;
  go(i){
    this.selected = i;
    this.name=this.selected.personName;
    let perInfo = this.groupBy(this.allPersonal, function(item){
      return [item.personId == i.personId];
    });
    // console.log(i.personId)
    //循环前置空所属对象
    this.xzNum=0;
    this.skNum=0;
    this.kkNum=0;
    this.flNum=0;
    this.jhNum=0;
    //通过员工ID分组，循环数据
    for (var j in perInfo){
      for(var h=0;h<perInfo[j].length;h++){
        if (perInfo[j][h].personId==i.personId){
          // console.log(perInfo[j][h]);
          if(perInfo[j][h].statItem == 3001){
            this.xzNum+=perInfo[j][h].stateValue;
          }
          if(perInfo[j][h].statItem == 3025){
            // console.log('3025',sorted[j][h]);
            this.skNum+=perInfo[j][h].stateValue;
          }
          if(perInfo[j][h].statItem == 3011){
            // console.log('3011',sorted[j][h]);
            this.kkNum+=perInfo[j][h].stateValue;
          }
          if(perInfo[j][h].statItem == 3012){
            // console.log('3012',sorted[j][h]);
            this.flNum+=perInfo[j][h].stateValue;
          }
          if(perInfo[j][h].statItem == 3007){
            // console.log('3007',sorted[j][h]);
            this.jhNum+=perInfo[j][h].stateValue;
          }
        }
      }
    }
    // console.log('3001',this.xzNum +'/' + '3025',this.skNum +'/' + '3011',this.kkNum +'/'+
    //   '3012',this.flNum +'/' +'3007',this.jhNum)
  }

  isActive(i) {
    // console.log(i)
    return this.selected === i;

  };
  //------返回处理--------//
  backButtonClick = (e: UIEvent) => {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: 3,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options)
      .then()
      .catch();
    this.navCtrl.pop({animate:false});
  }

}

import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { CenterPage } from '../center/center';
import { PassengerPage } from '../passenger/passenger';
import { HousingPage } from '../housing/housing';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HousingPage;
  tab3Root = PassengerPage;
  tab4Root = CenterPage;

  constructor() {

  }
}

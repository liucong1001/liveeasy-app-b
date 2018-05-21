import { Component } from '@angular/core';

/**
 * Generated class for the ComponentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'components',
  templateUrl: 'components.html'
})
export class ComponentsComponent {

  text: string;

  constructor() {
    console.log('Hello ComponentsComponent Component');
    this.text = 'Hello World';
  }

}

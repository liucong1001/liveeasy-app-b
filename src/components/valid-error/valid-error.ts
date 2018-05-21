import {Component, Input,OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
/**
 * Generated class for the ValidErrorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'valid-error',
  templateUrl: 'valid-error.html'
})
export class ValidErrorComponent {

    text: string;
    @Input() control: FormControl;
    @Input() errors: ErrorMessage[];

  constructor() {
    console.log('Hello ValidErrorComponent Component');
    this.text = 'Hello World';
  }

    ngOnInit() {
        if (this.control == null || this.control === undefined) {
            throw new Error('缺少control属性！');
        }
        if (this.errors == null || this.errors === undefined) {
            throw new Error('缺少error属性！');
        }
    }

}
/**
 * 消息定义
 */
export class ErrorMessage {
    /**
     * 初始化
     * @param {string} _type 错误类型
     * @param {string} _message 错误提示
     */
    constructor(private _type: string, private _message: string) {
    }


    /**
     * 错误类型
     * @returns {string}
     */
    public get type(){
        return this._type;
    }

    /**
     * 错误提示
     * @return {string}
     */
    public get message(){
        return this._message;
    }
}

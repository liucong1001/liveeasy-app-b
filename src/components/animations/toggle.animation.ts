import {animate, state, style, transition, trigger} from '@angular/animations';

export const visibilityToggle = trigger('visibilityChanged', [
    // state 控制不同的状态下对应的不同的样式 height: 'auto', height: '0px',
    state('shown' , style({ height: 'auto',opacity: 1,})),
    state('hidden', style({height: 0, opacity: 0,})),
    // transition 控制状态到状态以什么样的方式来进行转换
    transition('shown <=> hidden', [animate('500ms linear'), animate('500ms linear')] ),
    // transition('shown <=> hidden', animate(300)),

  ])
;

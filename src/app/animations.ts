import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

export let slideToDown = trigger('fade', [
  state('void', style({ transform: 'translateY(-20px)', opacity: 0 })),
  transition(':enter', animate(1000)),
  transition(':leave', animate(1000)),
]);

export const showHide = trigger('showHide', [
  state('hide', style({ left: '500em' })),
  transition('hide => show', [
    animate('2s 0s ease-out'),
    style({ left: '0em' }),
  ]),
  transition('show => hide', [
    animate('2s 0s ease-out'),
    style({ left: '500em' }),
  ]),
]);
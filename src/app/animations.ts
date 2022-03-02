import { animate, state, style, transition, trigger } from "@angular/animations";

export let slideToDown = trigger('fade', [
  state('void', style({ transform: 'translateY(-20px)', opacity: 0 })),
  transition(':enter', animate(1000)),
  transition(':leave', animate(1000)),
]);
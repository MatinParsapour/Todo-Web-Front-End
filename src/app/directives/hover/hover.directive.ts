import { Directive } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  @HostBinding('style.backgroundColor') backgroundColor!: string;

  constructor() { }

}

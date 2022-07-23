import { Directive, HostBinding, HostListener, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor!: string;
  @Input('default') default: string = '#a1d3d5';
  @Input('highlight') highlight: string = '#526f70';

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {}
  ngOnInit(): void {
    this.backgroundColor = this.default;
  }

  @HostListener('mouseenter') mouseEnter(){
    this.backgroundColor = this.highlight;
  }

  @HostListener('mouseleave') mouseLeave(){
    this.backgroundColor = this.default
  }
}

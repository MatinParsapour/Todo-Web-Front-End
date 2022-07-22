import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {
  @Input('selectedClass') class: any

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) { }

  @HostListener('document:click', ['$event']) click(event: Event) {
    var bindClass = this.elementRef.nativeElement.contains(event.target) ? this.class : ''
    if (bindClass) {
      this.renderer.addClass(this.elementRef.nativeElement, bindClass)
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, this.class)
    }
  }
}

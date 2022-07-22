import { Directive, HostBinding, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {
  @Input('selectedClass') class: any

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event']) click(event: Event) {
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false
  }
}

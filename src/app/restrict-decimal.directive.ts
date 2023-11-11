// restrict-decimals.directive.ts
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appRestrictDecimals]' 
})
export class RestrictDecimalsDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event:any) {
    const initialValue = this.el.nativeElement.value;
    const regex = new RegExp(/^\d*\.?\d{0,4}$/);
    if (regex.test(initialValue)) {
      return;
    } else {
      event.preventDefault();
      const lastValidValue = initialValue.slice(0, -1);
      this.el.nativeElement.value = lastValidValue;
    }
  }
}

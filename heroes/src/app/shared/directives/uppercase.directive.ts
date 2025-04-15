import { Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Directive({
  selector: '[appUppercase]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UppercaseDirective),
      multi: true
    }
  ]
})
export class UppercaseDirective implements ControlValueAccessor {
  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  writeValue(value: string): void {
    this.el.nativeElement.value = value ? value.toUpperCase() : '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const upper = value.toUpperCase();
    this.el.nativeElement.value = upper;
    this.onChange(upper);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }
}

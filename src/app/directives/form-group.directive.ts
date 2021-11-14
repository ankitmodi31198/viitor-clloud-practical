import { Directive, InjectionToken, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export const APP_FORM_GROUP = new InjectionToken<FormGroupDirective>('FormGroupDirective');

@Directive({
  selector: '[appFormGroup]',
  providers: [
    { provide: APP_FORM_GROUP, useExisting: FormGroupDirective }
  ]
})
export class FormGroupDirective implements OnChanges {

  @Input()
  formGroup: FormGroup;

  formGroupChanges: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if ('formGroup' in changes) {
      this.formGroupChanges.next(this.formGroup);
    }
  }

}

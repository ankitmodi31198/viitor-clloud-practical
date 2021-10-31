import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss'],
  animations: [
    trigger('animation', [
      transition(':increment', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-1rem)' }),
        animate('200ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(-1rem)' }))
      ])])
  ],
  encapsulation: ViewEncapsulation.None
})
export class FormFieldErrorComponent {

  /**
   * Error message which will be shown with form field according to its validation type.
   *
   * @type {string}
   * @memberof FormFieldErrorComponent
   */
  private _errorMessage: string = '';

  /**
   * Variable to run animation every time when validation message change for selected form field.
   *
   * @type {number}
   * @memberof FormFieldErrorComponent
   */
  increment: number = 0;

  /**
   * Setter / Getter method for form field's error message.
   *
   * @memberof FormFieldErrorComponent
   */
  @Input()
  set errorMessage (value: string) {
    if (value) {
      if (this._errorMessage != value)
        this.increment++;
    }
    this._errorMessage = value;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

}

import { AfterViewInit, ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, NgControl } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { FormFieldErrorType } from '../form-field-error/form-field-error-constants';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';
import { FormGroupDirective } from './form-group.directive';

@Directive({
  selector: '[appFormField]'
})
export class FormFieldDirective implements OnInit, AfterViewInit {

  /**
   * Selected form field's form control.
   *
   * @private
   * @type {NgControl}
   * @memberof FormFieldDirective
   */
  private formControl: NgControl;

  /**
   * Form field error component's instance.
   *
   * @private
   * @type {ComponentRef<FormFieldErrorComponent>}
   * @memberof FormFieldDirective
   */
  private errorComponentRef: ComponentRef<FormFieldErrorComponent>;

  /**
   * Selected form field's entity name.
   *
   * @type {string}
   * @memberof FormFieldDirective
   */
  @Input('appFormField')
  entityName: string;

  /**
   * Object which contains the custom error message for any type of form field error.
   *
   * @type {{ [key: string]: string }}
   * @memberof FormFieldDirective
   */
  @Input()
  errorMessages: { [key: string]: string };

  /**
   * Instance of parent form group of selected form control.
   *
   * @private
   * @type {FormGroup}
   * @memberof FormFieldDirective
   */
  private parentFormGroup: FormGroup;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private formField: MatFormField,
    private elementRef: ElementRef,
    private formGroupDirective: FormGroupDirective
  ) { }

  ngOnInit() {
    this.formGroupDirective.formGroupChanges.subscribe((formGroup: FormGroup) => {
      this.parentFormGroup = formGroup;
      this.parentFormGroupChangeHandler();
    })
  }

  ngAfterViewInit() {
    const formControlElement = this.elementRef.nativeElement.querySelector('[formControlName], .mat-input-element');
    if (formControlElement) {
      formControlElement.addEventListener('focus', () => this.setErrorMessage());
    }
  }

  /**
   * Parent form group input property change handler.
   *
   * @private
   * @memberof FormFieldDirective
   */
  private parentFormGroupChangeHandler() {
    this.setErrorComponentReference();
    this.setFormControl();
    this.setFormControlStatusChangesSubscription();
  }

  /**
   * Function to create the instance of error component and set the default empty string as error message.
   *
   * @private
   * @memberof FormFieldDirective
   */
  private setErrorComponentReference() {
    if (!this.errorComponentRef) {
      const componentFactory:  ComponentFactory<FormFieldErrorComponent> = this.componentFactoryResolver.resolveComponentFactory(FormFieldErrorComponent);
      this.errorComponentRef = this.viewContainerRef.createComponent(componentFactory);
    }
    this.errorComponentRef.instance.errorMessage = '';
  }

  /**
   * Function to set the value of selected form field's formcontrol.
   *
   * @private
   * @memberof FormFieldDirective
   */
  private setFormControl() {
    this.formControl = this.formField?._control?.ngControl;
  }

  /**
   * Function to set subscription in selected form contorl's status changes.
   *
   * @private
   * @memberof FormFieldDirective
   */
  private setFormControlStatusChangesSubscription() {
    if (this.parentFormGroup && this.formControl && this.formControl.name) {
      this.parentFormGroup.get(this.formControl.name.toString()).statusChanges.subscribe(() => this.setErrorMessage());
    }
  }

  /**
   * Function to set validation message for selected form field according to form field's validation status and error type.
   *
   * @private
   * @memberof FormFieldDirective
   */
  private setErrorMessage() {
    if (this.errorComponentRef) {
      this.errorComponentRef.instance.errorMessage = this.getErrorMessage();
    }
  }

  /**
   * Function to get error message for selected form field according to its validation status and error type.
   *
   * @private
   * @return {*}  {string}
   * @memberof FormFieldDirective
   */
  private getErrorMessage(): string {
    let errorMessageList: string[] = [];
    if (this.formControl.invalid) {
      errorMessageList = Object.keys(this.formControl.errors).map<string>((errorType: string) => this.getErrorMessageErrorTypeWise(errorType));
    }
    if (errorMessageList && errorMessageList.length) {
      // return errorMessageList.join(", ") + '.';
      return errorMessageList[0] + '.';
    } else {
      return '';
    }
  }

  /**
   * Function to get error message for selected form field according to its error type.
   *
   * @private
   * @param {string} errorType
   * @return {*}  {string}
   * @memberof FormFieldDirective
   */
  private getErrorMessageErrorTypeWise(errorType: string): string {
    if (this.errorMessages && this.errorMessages[errorType]) {
      return this.errorMessages[errorType];
    } else {
      const entityName: string = this.entityName || this.formControl.name.toString();
      const error: any = this.formControl.errors[errorType];
      switch (errorType && errorType.toLowerCase()) {
        case FormFieldErrorType.required:
          return `${entityName} is required`;
        case FormFieldErrorType.min:
          return `${entityName} should be greater than or equal to ${error.min}`;
        case FormFieldErrorType.max:
          return `${entityName} should be less than or equal to ${error.max}`;
        case FormFieldErrorType.email:
          return `Please enter a valid email address`;
        case FormFieldErrorType.minlength:
          return `Minimum ${error.requiredLength} characters required in ${entityName}`;
        case FormFieldErrorType.maxlength:
          return `Maximum ${error.requiredLength} characters allowed in ${entityName}`;
        case FormFieldErrorType.pattern:
          return `${entityName} is invalid`;
        default:
          return `${entityName} is invalid`;
      }
    }
  }

} 

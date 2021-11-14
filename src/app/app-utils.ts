import { FormGroup } from '@angular/forms';

export enum FormStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
}

export interface ScreenNameDropDown {
  screenCode: string;
  screenName: string;
}

export function getFormControlValue(formControlName: string, formGroup: FormGroup): any {
  return formGroup && formGroup.controls && formGroup.controls[formControlName]
    ? formGroup.controls[formControlName].value
    : null;
}

export function getFormControl(formControlName: string, formGroup: FormGroup): any {
  return formGroup && formGroup.controls && formGroup.controls[formControlName]
    ? formGroup.controls[formControlName]
    : null;
}

export function setFormControlValue(formControlName: string, valueToBeset: any, formGroup: FormGroup): void {
  if (formGroup && formGroup.controls && formGroup.controls[formControlName]) {
    formGroup.controls[formControlName].setValue(valueToBeset);
    formGroup.controls[formControlName].markAsDirty();
    formGroup.controls[formControlName].updateValueAndValidity();
  }
}

export const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
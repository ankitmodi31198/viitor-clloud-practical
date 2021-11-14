import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';
import { FormFieldDirective } from '../directives/form-field.directive';
import { FormGroupDirective } from '../directives/form-group.directive';
import { MaterialModule } from '../material/material.module';


const COMPONENTS = [
  FormFieldErrorComponent
];

const DIRECTIVES = [
  FormFieldDirective,
  FormGroupDirective
];


@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class CommonUiModule { }

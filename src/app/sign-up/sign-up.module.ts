import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SignUpService } from '../service/api/sign-up.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginWrapperModule } from '../login-wrapper/login-wrapper.module';



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    LoginWrapperModule
  ],
  exports: [
    SignUpComponent
  ],
  providers: [
    SignUpService
  ]
})
export class SignUpModule { }

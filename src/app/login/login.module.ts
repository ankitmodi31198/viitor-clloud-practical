import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginService } from '../service/api/login.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginWrapperModule } from '../login-wrapper/login-wrapper.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginWrapperModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    LoginService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }

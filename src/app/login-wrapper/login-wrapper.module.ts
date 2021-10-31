import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginWrapperComponent } from './login-wrapper.component';
import { LottieModule } from 'ngx-lottie';
import { GoogleAuthorizationModule } from '../google-authorization/google-authorization.module';
import { playerFactory } from '../app.module';



@NgModule({
  declarations: [
    LoginWrapperComponent
  ],
  imports: [
    CommonModule,
    GoogleAuthorizationModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [
    LoginWrapperComponent
  ]
})
export class LoginWrapperModule { }

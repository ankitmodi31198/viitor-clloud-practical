import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthorizationComponent } from './google-authorization.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [GoogleAuthorizationComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SocialLoginModule,
    ReactiveFormsModule,
  ],
  exports: [GoogleAuthorizationComponent],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '354305142799-ila4pqrpt4o8s4ap9jrl480b4gg39lnq.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ]
})
export class GoogleAuthorizationModule {}

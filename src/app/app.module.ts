import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalstorageService } from './service/local-storage/localstorageservice.service';
import { BASE_URL } from './service/base-service/base-url';
import { environment } from 'src/environments/environment';
import { AuthInterceptorService } from './app-routing/auth-interceptor.service';
import { AuthService } from './service/auth-service/auth.service';
import player from 'lottie-web';
import { LoginModule } from './login/login.module';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SignUpModule,
    HttpClientModule,
    LoginModule,
  ],
  exports: [],
  providers: [
    LocalstorageService,
    {
      provide: BASE_URL,
      useValue: environment.baseUrl,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

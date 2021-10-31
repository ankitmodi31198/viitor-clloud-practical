import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { FormStatus, getFormControlValue } from '../app-utils';
import { GoogleAuthorizationOpenedFrom, LoginTypes } from '../google-authorization/utils';
import { LoginService } from '../service/api/login.service';
import { AuthService } from '../service/auth-service/auth.service';
import { LocalStorageKeyTypes } from '../service/local-storage/local-storage-key-types';
import { LocalstorageService } from '../service/local-storage/localstorageservice.service';
import { LoginGetModel, LoginPostModel } from '../service/models/login.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  googleAuthorizationOpenedFrom: GoogleAuthorizationOpenedFrom =
    GoogleAuthorizationOpenedFrom.LOGIN;

  @Input()
  isOpenAsModal: boolean = false;

  @Output()
  eChangeLoginType: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  eUserLoginSuccess: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private localStorageService: LocalstorageService,
    private router: Router,
    private authService: AuthService
  ) {
    this.initLoginForm();
  }

  ngOnInit() { }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  changePasswordControlType(passwordControlType: string, passwordInputElement: any) {
    if (passwordInputElement) {
      passwordInputElement.type = passwordControlType;
    }
  }

  solialUserHandler(socialUser: SocialUser) {
    if (socialUser) {
      const loginPostModel = new LoginPostModel().toRemote({
        username: socialUser.email,
        password: null,
        loginType: LoginTypes.GOOGLE,
        socialId: socialUser.id ? parseInt(socialUser.id) : null,
      });
      this.loginRequest(loginPostModel);
    }
  }

  logIn() {
    if (this.loginForm && this.loginForm.status && this.loginForm.status.toUpperCase() === FormStatus.INVALID.toUpperCase()) {
      return;
    } else {
      const loginPostModel = new LoginPostModel().toRemote({
        username: getFormControlValue('email', this.loginForm),
        password: getFormControlValue('password', this.loginForm),
        loginType: LoginTypes.NORMAL
      });
      this.loginRequest(loginPostModel);
    }
  }

  loginRequest(loginPostModel) {
    this.loginService.post(loginPostModel)
      .pipe(take(1))
      .subscribe((response) => {
        if (response && response.data && response.status === 200) {
          this.loginSuccessHandler(response);
        } else {
          // this.growlService.errorMessageGrowl('Invalid Username or Password');
        }
      }, (error: any) => {
        // this.growlService.errorMessageGrowl('Invalid Username or Password');
      });
  }

  private loginSuccessHandler(response) {
    // this.growlService.successMessageGrowl('Login Successful');
    const loginGetModel: LoginGetModel = new LoginGetModel().toLocal(response.data);
    if (loginGetModel && loginGetModel.jwt) {
      this.localStorageService.setLocalStorage(LocalStorageKeyTypes.TOKEN, [loginGetModel.jwt]);
      this.localStorageService.setLocalStorage(LocalStorageKeyTypes.LOGIN_USER, [loginGetModel.username]);
      this.localStorageService.setLocalStorage(LocalStorageKeyTypes.LOGIN_USER_DETAILS, [loginGetModel]);
      this.authService.refreshLoginUserData$.next(true);
      if (this.isOpenAsModal) {
        this.eUserLoginSuccess.emit();
      } else {
        this.router.navigate(['']);
      }
    }
  }



  changeLoginType() {
    if (this.isOpenAsModal) {
      this.eChangeLoginType.emit();
    } else {
      this.router.navigate(['sign-up']);
    }
  }
}

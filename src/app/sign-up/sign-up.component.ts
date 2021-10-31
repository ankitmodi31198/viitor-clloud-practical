import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { GrowlService } from '../growl/growl.service';
import { SignUpService } from '../service/api/sign-up.service';
import { AuthService } from '../service/auth-service/auth.service';
import { LocalstorageService } from '../service/local-storage/localstorageservice.service';
import { SocialUser } from 'angularx-social-login';
import { SignUpGetModel, SignUpPostModel } from '../service/models/sign-up.model';
import { FormStatus, getFormControlValue } from '../app-utils';
import { LocalStorageKeyTypes } from '../service/local-storage/local-storage-key-types';
import { GoogleAuthorizationOpenedFrom, LoginTypes } from '../google-authorization/utils';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  googleAuthorizationOpenedFrom: GoogleAuthorizationOpenedFrom =
    GoogleAuthorizationOpenedFrom.SIGN_UP;

  @Input()
  isOpenAsModal: boolean = false;

  @Output()
  eChangeLoginType: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  eUserLoginSuccess: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private router: Router,
    private localStorageService: LocalstorageService,
    // private growlService: GrowlService,
    private authService: AuthService
  ) {
    this.initSignUpForm();
  }

  ngOnInit(): void { }

  initSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchPasswordValidator.bind(this)]]
    });
  }

  private matchPasswordValidator(formControl: FormControl) {
    const passwordValue: string = formControl.parent ? formControl.parent.get('password').value : '';
    if (passwordValue !== formControl.value) {
      return { 'passwordNotMatched': true };
    }
    return null;
  }

  changePasswordControlType(passwordControlType: string, passwordInputElement: any) {
    if (passwordInputElement) {
      passwordInputElement.type = passwordControlType;
    }
  }

  solialUserHandler(socialUser: SocialUser) {
    if (socialUser) {
      const signUpPostModel = new SignUpPostModel().toRemote({
        username: socialUser.email,
        password: null,
        loginType: LoginTypes.GOOGLE,
        socialId: socialUser.id ? parseInt(socialUser.id) : null,
        firstName: socialUser.firstName,
        lastName: socialUser.lastName,
        phoneNo: null,
        address: null
      });
      this.signUpRequest(signUpPostModel);
    }
  }

  signUp() {
    if (this.signUpForm && this.signUpForm.status && this.signUpForm.status.toUpperCase() === FormStatus.INVALID.toUpperCase()) {
      return;
    } else {
      const signUpPostModel = new SignUpPostModel().toRemote({
        username: getFormControlValue('email', this.signUpForm),
        password: getFormControlValue('password', this.signUpForm),
        loginType: LoginTypes.NORMAL,
        firstName: getFormControlValue('firstName', this.signUpForm),
        // lastName: getFormControlValue('lastName', this.signUpForm),
        contactNumber: getFormControlValue('contactNumber', this.signUpForm)
      });
      this.signUpRequest(signUpPostModel);
    }
  }

  signUpRequest(signUpPostModel) {
    this.signUpService.post(signUpPostModel)
      .pipe(take(1))
      .subscribe((response) => {
        if (response && response.data && response.status === 200) {
          this.signupSuccessHandler(response);
        } else {
          // this.growlService.errorMessageGrowl();
        }
      }, (error: any) => {
        // this.growlService.errorMessageGrowl();
      });
  }

  private signupSuccessHandler(response) {
    // this.growlService.successMessageGrowl('User created Successfully');
    const signUpGetModel: SignUpGetModel = new SignUpGetModel().toLocal(response.data);
    if (signUpGetModel && signUpGetModel.jwt) {
      this.localStorageService.setLocalStorage(LocalStorageKeyTypes.TOKEN, [signUpGetModel.jwt]);
      this.localStorageService.setLocalStorage(LocalStorageKeyTypes.LOGIN_USER, [signUpGetModel.username]);
      this.localStorageService.setLocalStorage(LocalStorageKeyTypes.LOGIN_USER_DETAILS, [signUpGetModel]);
      this.authService.refreshLoginUserData$.next(true);
      if (this.isOpenAsModal) {
        this.eUserLoginSuccess.emit();
      } else {
        this.router.navigate(['my-account']);
      }
    }
  }

  changeLoginType() {
    if (this.isOpenAsModal) {
      this.eChangeLoginType.emit();
    } else {
      this.router.navigate(['login']);
    }
  }

}

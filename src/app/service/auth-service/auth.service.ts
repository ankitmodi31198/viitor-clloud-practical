import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { LocalStorageKeyTypes } from '../local-storage/local-storage-key-types';
import { LocalstorageService } from '../local-storage/localstorageservice.service';
import { LoginGetModel } from '../models/login.model';

@Injectable()
export class AuthService {

  token: string = null;

  loginUser: string = null;

  userDetails: LoginGetModel = null;

  refreshLoginUserData$: Subject<boolean> = new Subject();

  loginUserDataSubscription: Subscription;

  loggedInUserDetails$: BehaviorSubject<LoginGetModel> = new BehaviorSubject<LoginGetModel>(null);

  get isAdminLoggedIn(): boolean {
    return this.userDetails && this.userDetails.role && this.userDetails.role.toUpperCase() === 'ADMIN';
  }

  constructor(
    private localStorageService: LocalstorageService
  ) {
    this.setLoginUserData();
    this.setSubscription();
  }

  private setSubscription() {
    this.loginUserDataSubscription = this.refreshLoginUserData$.subscribe(response => {
      this.setLoginUserData();
    })
  }

  private setLoginUserData() {
    const loginUser = this.localStorageService.getLocalStorage(LocalStorageKeyTypes.LOGIN_USER);
    if (loginUser && loginUser.length && loginUser[0]) {
      this.loginUser = loginUser[0];
    } else {
      this.loginUser = null;
    }

    const token = this.localStorageService.getLocalStorage(LocalStorageKeyTypes.TOKEN);
    if (token && token.length && token[0]) {
      this.token = token[0];
    } else {
      this.token = null;
    }

    const userDetails: LoginGetModel[] = this.localStorageService.getLocalStorage(LocalStorageKeyTypes.LOGIN_USER_DETAILS);
    if (userDetails && userDetails.length && userDetails[0]) {
      this.userDetails = userDetails[0];
    } else {
      this.userDetails = null;
    }
    this.loggedInUserDetails$.next(this.userDetails);
  }
}

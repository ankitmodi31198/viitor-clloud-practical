import { AnimationOptions } from 'ngx-lottie';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { GoogleAuthorizationOpenedFrom } from 'src/app/google-authorization/utils';

@Component({
  selector: 'app-login-wrapper',
  templateUrl: './login-wrapper.component.html',
  styleUrls: ['./login-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginWrapperComponent implements OnInit {

  teamWorkOptions: AnimationOptions = {
    path: 'assets/teamwork.json',
  };

  @Input()
  openFrom: GoogleAuthorizationOpenedFrom;

  @Output()
  eSocialUser: EventEmitter<SocialUser> = new EventEmitter<SocialUser>();

  constructor() { }

  ngOnInit(): void {
  }

  socialUserChangeHandler(socialUser: SocialUser) {
    this.eSocialUser.emit(socialUser);
  }

}

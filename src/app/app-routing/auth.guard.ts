import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LocalStorageKeyTypes } from '../service/local-storage/local-storage-key-types';
import { LocalstorageService } from '../service/local-storage/localstorageservice.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private localStorageService: LocalstorageService,
    private router: Router
  ) {
    
  }
  
  canActivate(): boolean {
    const loggedInUser = this.localStorageService.getLocalStorage(LocalStorageKeyTypes.LOGIN_USER);
    if (loggedInUser && loggedInUser.length > 0) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

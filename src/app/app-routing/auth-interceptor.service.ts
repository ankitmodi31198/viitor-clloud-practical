import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LocalstorageService } from '../service/local-storage/localstorageservice.service';
import { LocalStorageKeyTypes } from '../service/local-storage/local-storage-key-types';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private localStorageService: LocalstorageService) {}

  intercept(request: any, next: any) {
    const token = this.localStorageService.getLocalStorage(
      LocalStorageKeyTypes.TOKEN
    );

    let tokenizeRequest = request;
    if (token && token.length && token[0]) {
      tokenizeRequest = request.clone({
        setHeaders: {
          Authorization: token[0],
        },
      });
    }
    return next.handle(tokenizeRequest);
  }
}

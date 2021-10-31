import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BaseService } from '../base-service/base.service';

@Injectable()
export class LoginService extends BaseService {
  urlPath: string = 'login';

  constructor(protected httpClient: HttpClient, protected injector: Injector) {
    super(httpClient, injector);
  }
}

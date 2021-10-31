import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BaseService } from '../base-service/base.service';

@Injectable()
export class SignUpService extends BaseService {
  urlPath: string = 'sign-up';

  constructor(protected httpClient: HttpClient, protected injector: Injector) {
    super(httpClient, injector);
  }
}

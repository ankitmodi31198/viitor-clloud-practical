import { UserRoles, LoginTypes } from 'src/app/google-authorization/utils';
import { BaseGetModel, BasePostModel } from '../base-model/base.model';

export class SignUpGetModel extends BaseGetModel {
  username: string = null;
  jwt: string = null;
  socialId: number = null;
  firstName: string = null;
  lastName: string = null;
  phoneNo: number = null;
  address: string = null;
  role: UserRoles = null;
  loginType: LoginTypes = null;

  toLocal(oGetResponse: any) {
    return Object.assign(new SignUpGetModel(), oGetResponse);
  }
}

export class SignUpPostModel extends BasePostModel {
  username: string = null;
  password: string = null;
  socialId: number = null;
  loginType: LoginTypes = null;
  firstName: string = null;
  lastName: string = null;
  phoneNo: number = null;
  address: string = null;

  toRemote(data: any) {
    if (data && data.lastName) {
      data.firstName += ' ' + data.lastName;
    }
    return {
      username: data.username,
      password: data.password,
      socialId: data.socialId,
      loginType: data.loginType,
      firstName: data.firstName,
      lastName: null,
      phoneNo: data.phoneNo,
      address: data.address,
    };
  }
}

import { LoginTypes, UserRoles } from "src/app/google-authorization/utils";
import { BaseGetModel, BasePostModel } from "../base-model/base.model";

export class LoginGetModel extends BaseGetModel {
  jwt: string = null;
  username: string = null;
  address: string = null;
  firstName: string = null;
  id: number = null;
  lastName: string = null;
  loginType: string = null;
  phoneNo: string = null;
  role: UserRoles = null;
  socialId: string = null;

  state: string = null;
  gstNumber: string = null;
  panNumber: string = null;

  toLocal(oGetResponse: any) {
    return Object.assign(new LoginGetModel(), oGetResponse);
  }
}

export class LoginPostModel extends BasePostModel {
  username: string = '';
  password: string = '';
  loginType: LoginTypes = null;
  socialId: number = null;

  toRemote(data: any) {
    return {
      username: data.username,
      password: data.password,
      loginType: data.loginType,
      socialId: data.socialId
    };
  }
}

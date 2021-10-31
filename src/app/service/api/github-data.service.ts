import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GithubDataService {

  constructor(
    private http: HttpClient
  ) {
    
  }

  dataPath: string = 'https://api.github.com/users/';

  getProfileData(username: string) {
    const profilePath: string = this.dataPath + username;
    return this.http.get(profilePath);
  }

  getUsers() {
    return this.http.get('https://reqres.in/api/users');
  }
}

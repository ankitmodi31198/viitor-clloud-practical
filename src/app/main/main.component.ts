import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { getFormControlValue } from '../app-utils';
import { LocalStorageKeyTypes } from '../service/local-storage/local-storage-key-types';
import { LocalstorageService } from '../service/local-storage/localstorageservice.service';
import { take } from 'rxjs/operators';
import { GithubDataService } from '../service/api/github-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {

  searchForGithub: FormGroup;

  localStorageGithubUserListData: Array<any>;

  searchText: string = null;

  githubGridFormGroup: FormGroup;

  gridSearchSubscription: Subscription;

  constructor(
    private githubDataService: GithubDataService,
    private localstorageservice: LocalstorageService,
    private router: Router
  ) {
    this.localStorageGithubUserListData = this.localstorageservice.getLocalStorage(LocalStorageKeyTypes.GITHUB_USERS_LIST);
  }

  ngOnInit() {
    this.createGithubProfileSearchForm();
    this.createGithubGridForm();
  }

  ngAfterViewInit() {
    // here used debounceTime so when user will stop typing for 1 second then we will update the grid values
    if (this.githubGridFormGroup && this.githubGridFormGroup.get('gridSearch')) {
      this.gridSearchSubscription = this.githubGridFormGroup.get('gridSearch').valueChanges.pipe(debounceTime(500))
        .subscribe((value) => {
          if (value) {
            this.localStorageGithubUserListData = this.localstorageservice.getLocalStorage(LocalStorageKeyTypes.GITHUB_USERS_LIST);
            this.localStorageGithubUserListData = this.localStorageGithubUserListData.filter(eachRow =>
              (eachRow.login && this.searchForString(value, eachRow.login.toString())) ||
              (eachRow.name && this.searchForString(value, eachRow.name.toString()))
            );
          } else {
            this.localStorageGithubUserListData = this.localstorageservice.getLocalStorage(LocalStorageKeyTypes.GITHUB_USERS_LIST);
          }
        })
    }
  }

  searchForString(searchString: string, parentString: string) {
    const search = parentString.search(searchString);
    if (search === 0) {
      return true;
    }
    return false;
  }

  createGithubProfileSearchForm() {
    this.searchForGithub = new FormGroup({
      "reprositoryName": new FormControl(null)
    })
  }

  createGithubGridForm() {
    this.githubGridFormGroup = new FormGroup({
      "gridSearch": new FormControl(null)
    })
  }

  searchForGithubProfile() {
    if (this.githubDataService) {
      this.githubDataService.getProfileData(getFormControlValue('reprositoryName', this.searchForGithub)).pipe(take(1))
        .subscribe((response) => {
          this.handleValidResponseOnProfileSearch(response);
        }, (error) => {
          if (error.status && error.status == 404) {
            window.alert('username not found');
          } else {
            console.error('unknown error occured', error);
          }
        })
    }
  }

  handleValidResponseOnProfileSearch(response: any) {
    const userProfileData = {
      id: response.id ? response.id : null,
      login: response.login ? response.login : null,
      name: response.name ? response.name : null,
      avatar_url: response.avatar_url ? response.avatar_url : null,
      public_repos: response.public_repos ? response.public_repos : null
    }

    if (this.localstorageservice) {
      let localStorageGithubUserListData: Array<any> = this.localstorageservice.getLocalStorage(LocalStorageKeyTypes.GITHUB_USERS_LIST);
      if (localStorageGithubUserListData && localStorageGithubUserListData.length > 0) {
        if (!(localStorageGithubUserListData.find((eachGithubUserList) => eachGithubUserList.id == userProfileData.id))) {
          localStorageGithubUserListData.push(userProfileData);
          this.localstorageservice.setLocalStorage(LocalStorageKeyTypes.GITHUB_USERS_LIST, localStorageGithubUserListData);
        }
      } else {
        this.localstorageservice.setLocalStorage(LocalStorageKeyTypes.GITHUB_USERS_LIST, [userProfileData]);
        // this.localStorageGithubUserListData = [userProfileData];
      }

      if (this.githubGridFormGroup && this.githubGridFormGroup.get('gridSearch')) {
        this.githubGridFormGroup.get('gridSearch').setValue(null);
      }
    }
  }

  /**
   * row delete click handler
   *
   * @param {*} eachGithubUserData
   * @memberof HomepageComponent
   */
  deleteRowClickHandler(eachGithubUserData) {
    if (eachGithubUserData && eachGithubUserData.id) {
      this.localStorageGithubUserListData = this.localStorageGithubUserListData.filter(eachGithubUserList => !(eachGithubUserList.id == eachGithubUserData.id));
      const localStorageGithubUserListData: Array<any> = this.localstorageservice.getLocalStorage(LocalStorageKeyTypes.GITHUB_USERS_LIST)
        .filter(eachGithubUserList => !(eachGithubUserList.id == eachGithubUserData.id))
      this.localstorageservice.setLocalStorage(LocalStorageKeyTypes.GITHUB_USERS_LIST, localStorageGithubUserListData);
    }
  }

  logoutClickHandler() {
    this.localstorageservice.removeLocalStorage(LocalStorageKeyTypes.LOGIN_USER);
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.gridSearchSubscription) {
      this.gridSearchSubscription.unsubscribe();
    }
  }

}

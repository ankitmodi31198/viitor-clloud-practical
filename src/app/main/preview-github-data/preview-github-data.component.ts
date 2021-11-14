import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeyTypes } from 'src/app/service/local-storage/local-storage-key-types';
import { LocalstorageService } from 'src/app/service/local-storage/localstorageservice.service';

@Component({
  selector: 'app-preview-github-data',
  templateUrl: './preview-github-data.component.html',
  styleUrls: ['./preview-github-data.component.scss']
})
export class PreviewGithubDataComponent implements OnInit {

  localStorageGithubUserListData: Array<any>;

  constructor(
    private localstorageservice: LocalstorageService,
    private router: Router
  ) {
    this.setLocalStorageGithubUserListData();
  }

  setLocalStorageGithubUserListData() {
    this.localStorageGithubUserListData = this.localstorageservice.getLocalStorage(LocalStorageKeyTypes.GITHUB_USERS_LIST);
  }

  ngOnInit(): void {
  }

  editClickHandler() {
    this.router.navigate(['']);
  }

  logoutClickHandler() {
    this.localstorageservice.removeLocalStorage(LocalStorageKeyTypes.LOGIN_USER);
    this.router.navigate(['/login']);
  }

}

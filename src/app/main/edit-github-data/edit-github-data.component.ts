import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormStatus, getFormControlValue, urlRegex } from 'src/app/app-utils';
import { cloneDeep } from 'lodash';
import { LocalstorageService } from 'src/app/service/local-storage/localstorageservice.service';
import { LocalStorageKeyTypes } from 'src/app/service/local-storage/local-storage-key-types';

@Component({
  selector: 'app-edit-github-data',
  templateUrl: './edit-github-data.component.html',
  styleUrls: ['./edit-github-data.component.scss']
})
export class EditGithubDataComponent implements OnInit {

  baseForm: FormGroup;

  originalLoginId: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private localstorageservice: LocalstorageService,
    private dialogRef: MatDialogRef<EditGithubDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.login) {
      this.originalLoginId = cloneDeep(this.data.login);
    }
    this.initBaseFormForm();
  }

  initBaseFormForm() {
    this.baseForm = this.formBuilder.group({
      name: [this.data && this.data.name, Validators.required],
      login: [this.data && this.data.login, Validators.required],
      avatar_url: [this.data && this.data.avatar_url, [Validators.required, Validators.pattern(urlRegex)]],
      public_repos: [this.data && this.data.public_repos, Validators.required]
    });
  }

  editClickHandler() {
    if (this.baseForm && this.baseForm.status && (this.baseForm.status.toUpperCase() === FormStatus.VALID.toUpperCase())) {
      this.editDetails();
    }
  }

  editDetails() {
    const name: string = getFormControlValue('name', this.baseForm);
    const login: string = getFormControlValue('login', this.baseForm);
    const avatar_url: string = getFormControlValue('avatar_url', this.baseForm);
    const public_repos: string = getFormControlValue('public_repos', this.baseForm);


    if (this.originalLoginId) {
      const userListData = this.localstorageservice.getLocalStorage(LocalStorageKeyTypes.GITHUB_USERS_LIST);
      if (userListData && userListData.length) {
        const matchedUserListData = userListData.find((oData) => {
          return oData && oData.login && (oData.login === this.originalLoginId);
        });

        matchedUserListData.name = name;
        matchedUserListData.login = login;
        matchedUserListData.avatar_url = avatar_url;
        matchedUserListData.public_repos = public_repos;

        this.localstorageservice.setLocalStorage(LocalStorageKeyTypes.GITHUB_USERS_LIST, userListData);

        if (this.dialogRef) {
          this.dialogRef.close();
        }
      }
    }
  }

}

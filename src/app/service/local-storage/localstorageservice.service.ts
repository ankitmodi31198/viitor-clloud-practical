import { Injectable } from '@angular/core';
import { LocalStorageKeyTypes } from './local-storage-key-types';

@Injectable()
export class LocalstorageService {
  constructor() { }

  setLocalStorage(key: LocalStorageKeyTypes, value: Array<any>) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeLocalStorage(key: LocalStorageKeyTypes) {
    localStorage.removeItem(key);
  }

  getLocalStorage(key: LocalStorageKeyTypes): Array<any> {
    const item = localStorage.getItem(key);
    if (typeof item === 'string') {
      return JSON.parse(item) ? JSON.parse(item) : [];
    }
    return [];
  }
}

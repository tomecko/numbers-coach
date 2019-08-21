import { Injectable } from '@angular/core';

export type LocalStorageKey = 'config';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  persist(key: LocalStorageKey, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: LocalStorageKey): object {
    return JSON.parse(localStorage.getItem(key));
  }
}

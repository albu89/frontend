import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = 'en-GB';
  private storageKey = 'preferredLanguage';
  private languageSubject = new BehaviorSubject<string>(this.currentLanguage);

  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('en-GB');
    this.loadLanguage();
  }

  setLanguage(lang: string)  {
    this.translate.use(lang);
    this.saveLanguage(lang);
    this.languageSubject.next(lang);
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getLanguageObservable() {
    return this.languageSubject.asObservable();
  }

  getLanguageSubject() {
    return this.languageSubject;
  }

  private saveLanguage(lang: string) {
    localStorage.setItem(this.storageKey, lang);
  }

  private loadLanguage() {
    const savedLanguage = localStorage.getItem(this.storageKey);
    if (savedLanguage) {
      this.setLanguage(savedLanguage);
    }
  }
}

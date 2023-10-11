import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage = 'en-GB';
  private storageKey = 'preferredLanguage';
  private profileStorageKey = 'profileLanguage';
  private languageSubject = new BehaviorSubject<string>(this.currentLanguage);

  public constructor(public readonly translate: TranslateService) {
    this.translate.setDefaultLang('en-GB');
    this.loadLanguage();
  }

  public setLanguage(lang: string, fromProfile: boolean) {
    if (fromProfile && localStorage.getItem(this.profileStorageKey) !== lang) {
      localStorage.setItem(this.profileStorageKey, lang);
      this.saveLanguage(lang);
      this.languageSubject.next(lang);
    } else if (!fromProfile) {
      this.translate.use(lang);
      this.saveLanguage(lang);
      this.languageSubject.next(lang);
    }
  }

  public getLanguageObservable() {
    return this.languageSubject.asObservable();
  }

  public getLanguageSubject() {
    return this.languageSubject;
  }

  private saveLanguage(lang: string) {
    localStorage.setItem(this.storageKey, lang);
  }

  private loadLanguage() {
    const savedLanguage = localStorage.getItem(this.storageKey);
    if (savedLanguage) {
      this.setLanguage(savedLanguage, false);
    }
  }
}

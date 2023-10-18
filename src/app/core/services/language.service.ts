import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE } from '@shared/constants';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private storageKey = 'preferredLanguage';
  private profileStorageKey = 'profileLanguage';
  private languageSubject = new BehaviorSubject<string>(DEFAULT_LANGUAGE);

  public constructor(public readonly translate: TranslateService) {
    this.translate.setDefaultLang('en-GB');
    this.loadLanguage();
  }

  public setLanguage(lang: string, fromProfile: boolean): void {
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

  public getLanguageObservable(): Observable<string> {
    return this.languageSubject.asObservable();
  }

  public getLanguageSubject(): BehaviorSubject<string> {
    return this.languageSubject;
  }

  private saveLanguage(lang: string): void {
    localStorage.setItem(this.storageKey, lang);
  }

  private loadLanguage(): void {
    const savedLanguage = localStorage.getItem(this.storageKey);
    if (savedLanguage) {
      this.setLanguage(savedLanguage, false);
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../shared/profile';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, distinctUntilChanged, map, shareReplay, tap } from 'rxjs';
import { LanguageService } from './language.service';
import { UserPreferences} from "../shared/preferences";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUserSubject = new BehaviorSubject<Profile | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isLoggedIn = this.currentUser.pipe(map((user) => !!user));

  constructor(private http: HttpClient, private languageService: LanguageService) { }
  baseUrl = environment.backendUrl + '/api/user';

  getUser(): Observable<Profile | null> {
    if (!this.currentUserSubject.value) {
      return this.http.get<Profile>(this.baseUrl).pipe(
        tap({
          next: val => this.setAuth(val),
          error: () => this.purgeAuth(),
        }),
        shareReplay(1)
      );
    }

    return this.currentUser;
  }

  updateUser(profile: Profile) {
    const url = this.baseUrl;
    return this.http.patch<Profile>(url, profile)
    .pipe(tap(user => this.setAuth(user)));
  }

  createUser(profile: Profile) {
    const url = this.baseUrl;
    return this.http.post<Profile>(url, profile)
    .pipe(tap(user => this.setAuth(user)));
  }

  requestAccess(name: string, lastname: string, email: string, tel: string, country: string, organization: string) {
    const url = this.baseUrl + '/request';
    const request = {
      firstname: name, surname: lastname, emailaddress: email, phoneNumber: tel, country, organization
    };
    return this.http.post(url, request);
  }

  setAuth(user: Profile): void {
    this.currentUserSubject.next(user);
    const selectedLanguage = user.language === 'deutsch' ? 'de-DE' : 'en-GB';
    this.languageService.setLanguage(selectedLanguage, true);
  }

  purgeAuth(): void {
    this.currentUserSubject.next(null);
  }

  //todo clarify what to do with Observable<any> type and enable eslint again

  /* eslint-disable */
  updateUserPreferences(preferences: UserPreferences): Observable<any> {
    const url = this.baseUrl + '/preferences';
    return this.http.patch(url, preferences); //todo errorhandling

  }

}

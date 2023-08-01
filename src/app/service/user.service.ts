import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../shared/profile';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, distinctUntilChanged, map, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUserSubject = new BehaviorSubject<Profile | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isLoggedIn = this.currentUser.pipe(map((user) => !!user));

  constructor(private http: HttpClient) { }
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
  }

  purgeAuth(): void {
    this.currentUserSubject.next(null);
  }

}
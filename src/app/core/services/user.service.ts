import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '@models/user/user-profile.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, distinctUntilChanged, shareReplay, tap } from 'rxjs';
import { LanguageService } from './language.service';
import { UserPreferences } from '@models/user/user-preferences.model';
import { MessageService } from '@services/message.service';
import { ProfileSchema } from '@models/user/profile-schema.model';
import { ProfileType } from '@models/user/profile-type.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUserSubject = new BehaviorSubject<Profile | null>(null);
  private currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  private baseUrl = environment.backendUrl + '/api/user';

  public constructor(
    private readonly http: HttpClient,
    private readonly languageService: LanguageService,
    private readonly messageService: MessageService
  ) {}

  public getUser(): Observable<Profile | null> {
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

  public getAdProfile(): Observable<ProfileType> {
    return this.http.get<ProfileType>(environment.graphEndpoint).pipe(
      tap({
        next: profile => profile,
        error: error => this.messageService.showLoadGraphEndpointError(error),
      })
    );
  }

  public getProfileSchema(): Observable<ProfileSchema> {
    const url = environment.backendUrl + '/api/schemas/userinputform';
    return this.http.get<ProfileSchema>(url, {
      params: new HttpParams().set('locale', this.languageService.getLanguageSubject().getValue()),
    });
  }

  public updateUser(profile: Profile): Observable<Profile> {
    const url = this.baseUrl;
    return this.http.patch<Profile>(url, profile).pipe(tap(user => this.setAuth(user)));
  }

  public createUser(profile: Profile) {
    const url = this.baseUrl;
    return this.http.post<Profile>(url, profile).pipe(tap(user => this.setAuth(user)));
  }

  public requestAccess(
    name: string,
    lastname: string,
    email: string,
    tel: string,
    country: string,
    organization: string
  ): Observable<Object> {
    const url = this.baseUrl + '/request';
    const request = {
      firstname: name,
      surname: lastname,
      emailaddress: email,
      phoneNumber: tel,
      country,
      organization,
    };
    return this.http.post(url, request);
  }

  public updateUserPreferences(preferences: UserPreferences): Observable<Object> {
    const url = this.baseUrl + '/preferences';
    return this.http.patch(url, preferences);
  }

  private setAuth(user: Profile): void {
    this.currentUserSubject.next(user);
    const selectedLanguage = user.language === 'deutsch' ? 'de-DE' : 'en-GB';
    this.languageService.setLanguage(selectedLanguage, true);
  }

  private purgeAuth(): void {
    this.currentUserSubject.next(null);
  }
}

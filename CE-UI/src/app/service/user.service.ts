import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../shared/profile';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.backendUrl + '/api/user';

  constructor(private http: HttpClient) { }

  getUser(): Observable<Profile> {
    return this.http.get<Profile>(this.baseUrl);
  }

  createUser(profile: Profile) {
    const url = this.baseUrl;
    return this.http.post<Profile>(url, profile);
  }

  updateUser(profile: Profile) {
    const url = this.baseUrl;
    return this.http.patch<Profile>(url, profile);
  }

  requestAccess(name: string, lastname: string, email: string, tel: string, country: string, organization: string) {
    const url = this.baseUrl + '/request';
    const request = {
      firstname: name, surname: lastname, emailaddress: email, phoneNumber: tel, country, organization
    };
    return this.http.post(url, request);
  }

}
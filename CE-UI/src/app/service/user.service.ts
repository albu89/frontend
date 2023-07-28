import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../shared/profile';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<Profile> {
    return this.http.get<Profile>(environment.backendUrl + '/api/user');
  }

  createUser(profile: Profile) {
    const url = environment.backendUrl + '/api/user';
    return this.http.post<Profile>(url, profile);
  }

  updateUser(profile: Profile) {
    const url = environment.backendUrl + '/api/user';
    return this.http.patch<Profile>(url, profile);
  }

}
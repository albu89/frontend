import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../shared/profile';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) {}

  private handleError(error: HttpErrorResponse) {

    if (error.status === 0) {
  
      // A client-side or network error occurred. Handle it accordingly.
  
      console.error('An error occurred:', error.error);
  
    } else {
  
      // The backend returned an unsuccessful response code.
  
      // The response body may contain clues as to what went wrong.
  
      console.error(
  
        `Backend returned code ${error.status}, body was: `, error.error);
  
    }
  
    // Return an observable with a user-facing error message.
  
    return throwError(() => new Error('Something bad happened; please try again later.'));
  
  }

  getUser() : Observable<Profile>{
    return this.http.get<Profile>(environment.backendUrl + '/api/user/me').pipe(catchError(this.handleError));
 }

 updateUser(profile : Profile) {
  const url = environment.backendUrl + '/api/user/me';
  return this.http.post<Profile>(url, profile);
 }

}
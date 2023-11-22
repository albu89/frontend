/* eslint-disable no-console */
import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public log(msg: string): void {
    if (!environment.production) {
      console.log(msg);
    }
  }

  public logError(msg: string, error: any = ''): void {
    if (!environment.production) {
      console.error(msg, error);
    }
  }

  public logHttpError(error: any): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.logError(error.error.message);
    } else if (error.status === HttpStatusCode.NotFound) {
      this.logError('Requested entity not found');
    } else {
      // The backend returned an unsuccessful response code.
      this.logError(`Backend returned code ${error.status}, with body: `, error);
    }
    return EMPTY;
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';

import { LoggerService } from './logger.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public constructor(
    private readonly logger: LoggerService,
    private readonly translateService: TranslateService,
    private readonly notificationService: NotificationService
  ) {}

  public showLoadGraphEndpointError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.loadGraphEndpointFailed');
  }
  public showEditScoreHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.scores.editRequest');
  }
  public showSaveScoreHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.scores.saveScore');
  }
  public showLoadSpecificScoreHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.scores.loadSpecificScore');
  }
  public showLoadPatientRecordsHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.scores.loadPatientRecords');
  }
  public showLoadSpecificPatientRecordsHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.scores.loadSpecificPatientScores');
  }
  public showLoadResponseSchemaHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.scores.loadScoreSchema');
  }
  public showUpdateUserPreferencesHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.preferences.savingFailed');
  }
  public showLoadBiomarkerTemplateHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.biomarker.loadingFailed');
  }
  public showLoginError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.user.loginFailed');
  }
  public showLoadUserHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.user.loadUserFailed');
  }
  public showAccessRequestError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.user.requestAccessFailed');
  }
  public showUpdateUserHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.user.updateUserFailed');
  }
  public showCreateUserHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.user.createUserFailed');
  }

  private showError(error: any, text: string) {
    this.logger.logHttpError(error);
    this.notificationService.showError(
      this.translateService.instant(text),
      this.translateService.instant('errorMessage.title'),
      {
        disableTimeOut: true,
      }
    );
    return EMPTY;
  }
}
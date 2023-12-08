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
  public showSaveDraftScoreHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.scores.saveAsDraft');
  }
  public showUpdateDraftScoreHttpError(error: HttpErrorResponse): Observable<never> {
    return this.showError(error, 'errorMessage.scores.updateDraft');
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
  public showDraftSavingControlValuesRequiredInfo() {
    this.showInfo('infoMessage.patientDataRequired');
  }
  public showDraftSavingSuccess() {
    this.showSuccess('successMessage.saveDraftSuccess');
  }
  public showDraftUpdateSuccess() {
    this.showSuccess('successMessage.updateDraftSuccess');
  }
  public showUserSavingControlValuesRequiredInfo() {
    this.showInfo('infoMessage.userDataRequired');
  }
  public showUserConfirmationRequired() {
    this.showInfo('infoMessage.userConfirmRequired');
  }
  public showUpdateUserSuccess() {
    this.showSuccess('successMessage.updateUserSuccess');
  }
  public showCreateUserSuccess() {
    this.showSuccess('successMessage.createUserSuccess');
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

  private showInfo(message: string) {
    this.notificationService.showInfo(
      this.translateService.instant(message),
      this.translateService.instant('infoMessage.formInfoHeader'),
      {
        disableTimeOut: true,
      }
    );
    return EMPTY;
  }

  private showSuccess(message: string) {
    this.notificationService.showSuccess(
      this.translateService.instant(message),
      this.translateService.instant('successMessage.formSuccessHeader'),
      {
        disableTimeOut: true,
      }
    );
    return EMPTY;
  }
}

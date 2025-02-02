import { HttpErrorResponse } from '@angular/common/http';
import { ScoreRequest } from '@models/requests/score-request.model';
import { tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { PatientDetailsStore } from '@features/patient-details/_store/patient-details.store';
import { FormMode } from '@features/patient-details/_models/form-mode';
import { ScoringRequestWithPatientData } from '@models/scoring/scoring-request-with-patient.model';
import { ScoringResponse } from '@models/scoring/scoring-response.model';
import { UserPreferences } from '@models/user/user-preferences.model';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { Patient } from '@models/patient/patient.model';

export const loadBiomarkerSchema = (store: PatientDetailsStore) => (source$: Observable<void>) =>
  combineLatest([source$, store.languageService.getLanguageObservable()]).pipe(
    tap(() => store.patchState({ isLoading: true })),
    switchMap(() =>
      store.schemaService.getBiomarkers().pipe(
        tapResponse(
          records => store.patchState({ biomarkerTemplate: records, isLoading: false }),
          (error: HttpErrorResponse) => {
            store.patchState({ biomarkerTemplate: undefined, isLoading: false });
            store.messageService.showLoadBiomarkerTemplateHttpError(error);
          }
        )
      )
    )
  );

export const savePatientDetails =
  (store: PatientDetailsStore) => (source$: Observable<ScoringRequestWithPatientData>) =>
    source$.pipe(
      tap(() => store.patchState({ isLoading: true })),
      switchMap(request =>
        store.biomarkerService.sendRequest(request).pipe(
          tapResponse(
            (response: ScoringResponse) => {
              const patient: Patient = {
                lastname: request.lastName,
                firstname: request.firstName,
                dateOfBirth: new Date(request.dateOfBirth),
                requestId: response.requestId,
              };
              store.patchState({ currentScore: response, isLoading: false, patient: patient });
            },
            (error: HttpErrorResponse) => {
              store.patchState({ isLoading: false });
              store.messageService.showSaveScoreHttpError(error);
            }
          )
        )
      )
    );

export const saveDraftScore = (store: PatientDetailsStore) => (source$: Observable<ScoringRequestWithPatientData>) =>
  source$.pipe(
    tap(() => store.patchState({ isDraftLoading: true })),
    switchMap(request =>
      store.biomarkerService.saveAsDraft(request).pipe(
        tapResponse(
          res => {
            const patient: Patient = {
              lastname: request.lastName,
              firstname: request.firstName,
              dateOfBirth: new Date(request.dateOfBirth),
              requestId: res,
            };
            store.patchState({ isDraftLoading: false, scoreDraftId: res, formMode: FormMode.edit, patient: patient });
            store.messageService.showDraftSavingSuccess();
          },
          (error: HttpErrorResponse) => {
            store.patchState({ isDraftLoading: false });
            store.messageService.showSaveDraftScoreHttpError(error);
          }
        )
      )
    )
  );

export const updateDraftScore = (store: PatientDetailsStore) => (source$: Observable<ScoringRequestWithPatientData>) =>
  source$.pipe(
    tap(() => store.patchState({ isDraftLoading: true })),
    switchMap(request => {
      let requestId = request.id;
      const subscription = store.scoreDraftId$.subscribe(i => {
        if (i) requestId = i;
      });
      return store.biomarkerService.updateDraft(request, requestId).pipe(
        tapResponse(
          result => {
            const patient: Patient = {
              lastname: request.lastName,
              firstname: request.firstName,
              dateOfBirth: new Date(request.dateOfBirth),
              requestId: result.requestId,
            };
            store.patchState({ isDraftLoading: false, patientData: result, patient: patient });
            store.messageService.showDraftUpdateSuccess();
            subscription.unsubscribe();
          },
          (error: HttpErrorResponse) => {
            store.patchState({ isDraftLoading: false });
            store.messageService.showUpdateDraftScoreHttpError(error);
            subscription.unsubscribe();
          }
        )
      );
    })
  );

export const editPatientDetails =
  (store: PatientDetailsStore) => (source$: Observable<ScoringRequestWithPatientData>) =>
    source$.pipe(
      tap(() => store.patchState({ isLoading: true })),
      switchMap(request => {
        let requestId = request.id;
        const subscription = store.scoreDraftId$.subscribe(i => {
          if (i) requestId = i;
        });
        return store.biomarkerService.editRequest(request, requestId).pipe(
          tapResponse(
            (response: ScoringResponse) => {
              const patient: Patient = {
                lastname: request.lastName,
                firstname: request.firstName,
                dateOfBirth: new Date(request.dateOfBirth),
                requestId: response.requestId,
              };
              store.patchState({ currentScore: response, isLoading: false, patient: patient });
              subscription.unsubscribe();
            },
            (error: HttpErrorResponse) => {
              store.patchState({ isLoading: false });
              store.messageService.showEditScoreHttpError(error);
              subscription.unsubscribe();
            }
          )
        );
      })
    );

export const loadPatientDetails = (store: PatientDetailsStore) => (source$: Observable<ScoreRequest>) =>
  combineLatest([source$, store.languageService.getLanguageObservable()]).pipe(
    tap(() => store.patchState({ isLoading: true })),
    switchMap(([request]) =>
      store.patientRecordService
        .getSpecificRecordById(
          request.patientName,
          request.patientLastName,
          request.patientBirthdate,
          request.requestId
        )
        .pipe(
          tapResponse(
            score => {
              const patient = {
                lastname: request.patientLastName,
                firstname: request.patientName,
                dateOfBirth: new Date(request.patientBirthdate),
                requestId: request.requestId,
              };
              store.patchState({ patientData: score, isLoading: false, patient: patient });
              const canEditPatient = !!(
                patient &&
                patient.firstname &&
                patient.lastname &&
                patient.dateOfBirth &&
                request.requestId
              );
              store.patchState({ formMode: canEditPatient ? FormMode.edit : FormMode.add });
            },
            (error: HttpErrorResponse) => {
              store.patchState({ isLoading: false });
              store.messageService.showLoadSpecificScoreHttpError(error);
            }
          )
        )
    )
  );

export const updateUserPreferences =
  (store: PatientDetailsStore) => (source$: Observable<{ biomarker: Biomarker; preferences: UserPreferences }>) =>
    source$.pipe(
      switchMap(request =>
        store.userService.updateUserPreferences(request.preferences).pipe(
          tapResponse(
            () => {
              store.patchState({ biomarkerTemplate: request.biomarker, isEditingEnabled: false });
            },
            (error: HttpErrorResponse) => {
              store.patchState({ isEditingEnabled: false });
              store.messageService.showUpdateUserPreferencesHttpError(error);
            }
          )
        )
      )
    );

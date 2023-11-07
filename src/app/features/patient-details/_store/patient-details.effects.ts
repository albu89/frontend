import { HttpErrorResponse } from '@angular/common/http';
import { ScoreRequest } from '@models/requests/score-request.model';
import { tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PatientDetailsStore } from '@features/patient-details/_store/patient-details.store';
import { FormMode } from '@features/patient-details/_models/form-mode';
import { ScoringRequestWithPatientData } from '@models/scoring/scoring-request-with-patient.model';
import { ScoringResponse } from '@models/scoring/scoring-response.model';

export const loadBiomarkerSchema = (store: PatientDetailsStore) => (source$: Observable<void>) =>
  source$.pipe(
    tap(() => store.patchState({ isLoading: true })),
    switchMap(() =>
      store.schemaService.getBiomarkers().pipe(
        tapResponse(
          records => store.patchState({ biomarkerTemplate: records, isLoading: false }),
          (error: HttpErrorResponse) => {
            store.patchState({ biomarkerTemplate: undefined, isLoading: false });
            // Todo show error message
            //eslint-disable-next-line no-console
            console.log(error);
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
              store.patchState({ currentScore: response, isLoading: false });
            },
            (error: HttpErrorResponse) => {
              store.patchState({ isLoading: false });
              // Todo show error message
              //eslint-disable-next-line no-console
              console.log(error);
            }
          )
        )
      )
    );

export const editPatientDetails =
  (store: PatientDetailsStore) => (source$: Observable<ScoringRequestWithPatientData>) =>
    source$.pipe(
      tap(() => store.patchState({ isLoading: true })),
      switchMap(request =>
        store.biomarkerService.editRequest(request, request.id).pipe(
          tapResponse(
            (response: ScoringResponse) => {
              store.patchState({ currentScore: response, isLoading: false });
            },
            (error: HttpErrorResponse) => {
              store.patchState({ isLoading: false });
              // Todo show error message
              //eslint-disable-next-line no-console
              console.log(error);
            }
          )
        )
      )
    );

export const loadPatientDetails = (store: PatientDetailsStore) => (source$: Observable<ScoreRequest>) =>
  source$.pipe(
    tap(() => store.patchState({ isLoading: true })),
    switchMap(request =>
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
              // Todo show error message
              //eslint-disable-next-line no-console
              console.log(error);
            }
          )
        )
    )
  );

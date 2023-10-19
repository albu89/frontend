import { HttpErrorResponse } from '@angular/common/http';
import { PatientRecordsSearchParameter } from '@features/patient-records/_models/patient-records-search.model';
import { ScoreRequest } from '@models/requests/score-request.model';
import { PatientRecordsStore } from '@features/patient-records/_store/patient-records.store';
import { tapResponse } from '@ngrx/component-store';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const loadPatientRecords = (store: PatientRecordsStore) => (source$: Observable<void>) =>
  source$.pipe(
    tap(() => store.patchState({ isLoading: true })),
    switchMap(() =>
      store.patientRecordService.getRecords().pipe(
        tapResponse(
          records => store.patchState({ patientRecords: records, isLoading: false, showDetailsButton: false }),
          (error: HttpErrorResponse) => {
            store.patchState({ patientRecords: undefined, isLoading: false });
            // Todo show error message
            //eslint-disable-next-line no-console
            console.log(error);
          }
        )
      )
    )
  );

export const loadSpecificPatientRecords =
  (store: PatientRecordsStore) => (source$: Observable<PatientRecordsSearchParameter>) =>
    source$.pipe(
      filter(searchParameter => searchParameter !== undefined),
      tap(() => store.patchState({ isLoading: true })),
      switchMap(searchParameter =>
        store.patientRecordService
          .getSpecificRecords(
            searchParameter.patientName!,
            searchParameter.patientLastName!,
            searchParameter.patientBirthdate!.toDateString()
          )
          .pipe(
            tapResponse(
              records => {
                if (records.length > 0) {
                  store.patchState({ showDetailsButton: true });
                }

                store.patchState({ patientRecords: records, isLoading: false });
              },
              (error: HttpErrorResponse) => {
                store.patchState({ patientRecords: undefined, isLoading: false, showDetailsButton: false });
                // Todo show error message
                //eslint-disable-next-line no-console
                console.log(error);
              }
            )
          )
      )
    );

export const loadSpecificScore = (store: PatientRecordsStore) => (source$: Observable<ScoreRequest>) =>
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
            score => store.patchState({ currentScore: score, isLoading: false }),
            (error: HttpErrorResponse) => {
              store.patchState({ patientRecords: undefined, isLoading: false });
              // Todo show error message
              //eslint-disable-next-line no-console
              console.log(error);
            }
          )
        )
    )
  );

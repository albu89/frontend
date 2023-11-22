import { Injectable } from '@angular/core';
import { PatientRecordsSearchParameter } from '@features/patient-records/_models/patient-records-search.model';
import { PatientRecordsState } from '@features/patient-records/_models/patient-records.state';
import {
  loadPatientRecords,
  loadSpecificPatientRecords,
  loadSpecificScore,
} from '@features/patient-records/_store/patient-records.effects';
import { PatientRecord } from '@models/patient/patient-record.model';
import { ComponentStore } from '@ngrx/component-store';
import { PatientRecordService } from '@services/patient-record.service';
import { Observable } from 'rxjs';
import { MessageService } from '@services/message.service';

@Injectable()
export class PatientRecordsStore extends ComponentStore<PatientRecordsState> {
  public constructor(
    public readonly patientRecordService: PatientRecordService,
    public readonly messageService: MessageService
  ) {
    super({
      isLoading: false,
      patientRecords: undefined,
      showDetailsButton: false,
      currentScore: undefined,
      searchParameters: {
        patientBirthdate: null,
        patientName: '',
        patientLastName: '',
      },
    });
  }

  //
  // *********** Selectors *********** //
  //
  public readonly isLoading$ = this.select(state => state.isLoading);
  public readonly showDetailsButton$ = this.select(state => state.showDetailsButton);
  public readonly currentScore$ = this.select(state => state.currentScore);
  public readonly searchParameters$ = this.select(state => state.searchParameters);
  public readonly patientRecords$: Observable<PatientRecord[] | undefined> = this.select(state => {
    return state.patientRecords?.sort((a, b) => {
      return new Date(b.requestTimeStamp).getTime() - new Date(a.requestTimeStamp).getTime();
    });
  });

  //
  // *********** Updaters *********** //
  //
  public readonly setSearchParameters = this.updater((state, searchParameters: PatientRecordsSearchParameter) => ({
    ...state,
    searchParameters: searchParameters,
  }));

  public readonly setDefaultValues = this.updater(state => ({
    ...state,
    currentScore: undefined,
    showDetailsButton: false,
    searchParameters: {
      patientBirthdate: null,
      patientName: '',
      patientLastName: '',
    },
  }));

  //
  // *********** Effect *********** //
  //
  public readonly loadPatientRecords = this.effect(loadPatientRecords(this));
  public readonly loadSpecificPatientRecords = this.effect(loadSpecificPatientRecords(this));
  public readonly loadSpecificScore = this.effect(loadSpecificScore(this));
}

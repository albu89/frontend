import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PatientRecordService } from '@services/patient-record.service';
import { PatientDetailsState } from '@features/patient-details/_models/patient-details.state';
import { loadBiomarkerSchema, loadPatientDetails } from '@features/patient-details/_store/patient-details.effects';
import { SchemasService } from '@services/schemas.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { BiomarkersMock } from '../../../tests/mocks/biomarker-data.mock';
import { ScoringResponseMock } from '../../../tests/mocks/scoring-response.mock';
// import { BiomarkerService } from '@services/biomarker.service';

@Injectable()
export class PatientDetailsStore extends ComponentStore<PatientDetailsState> {
  public constructor(
    // public readonly biomarkerService: BiomarkerService,
    public readonly schemaService: SchemasService,
    public readonly patientRecordService: PatientRecordService
  ) {
    super({
      isLoading: false,
      currentScore: undefined,
      patient: { lastname: '', firstname: '', dateOfBirth: null },
      // calculationSubmitted: false,
      canEditPatientData: true,
      biomarkerTemplate: undefined,
      patientData: undefined,
    });
  }

  //
  // *********** Selectors *********** //
  //
  // public readonly isLoading$ = this.select(state => state.isLoading);
  public readonly currentScore$ = this.select(state => state.currentScore);
  public readonly patient$ = this.select(state => state.patient);
  // public readonly calculationSubmitted$ = this.select(state => state.calculationSubmitted);
  public readonly canEditPatientData$ = this.select(state => state.canEditPatientData);
  public readonly biomarkerTemplate$ = this.select(state => state.biomarkerTemplate);
  public readonly patientData$ = this.select(state => state.patientData);
  //TODO: fix reactivity and sorting ..
  public readonly biomarkerWithData$: Observable<Biomarker | undefined> = combineLatest([
    this.patientData$,
    this.biomarkerTemplate$,
  ]).pipe(
    map(([data, marker]) => {
      if (data?.biomarkers && marker) {
        //FIXME: remove toLowerCase after backend change :)
        //TODO: remove mockdata
        marker = BiomarkersMock;
        data = ScoringResponseMock;
        marker.medicalHistory.map(
          i =>
            (i.value = data?.biomarkers.values
              .find(x => i.id === x.id)
              ?.value?.toString()
              .toLowerCase())
        );
        // marker.medicalHistory.sort((a, b) => b.orderIndex - a.orderIndex);
        marker.labResults.map(i => (i.value = data?.biomarkers.values.find(x => i.id === x.id)?.value));
        // marker.labResults.sort((a, b) => b.orderIndex - a.orderIndex);
        return marker;
      }
      //TODO: remove mockdata
      return BiomarkersMock;
    })
  );

  //
  // *********** Updaters *********** //
  //

  //
  // *********** Effect *********** //
  //
  public readonly loadBiomarkerSchema = this.effect(loadBiomarkerSchema(this));
  // public readonly savePatientDetails = this.effect(savePatientDetails(this));
  // public readonly editPatientDetails = this.effect(editPatientDetails(this));
  public readonly loadPatientDetails = this.effect(loadPatientDetails(this));
}

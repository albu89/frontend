import { PatientRecordsSearchParameter } from '@features/patient-records/_models/patient-records-search.model';
import { PatientRecord } from '@models/patient/patient-record.model';
import { ScoringResponse } from '@models/scoring/scoring-response.model';

export interface PatientRecordsState {
  isLoading: boolean;
  patientRecords: PatientRecord[] | undefined;
  showDetailsButton: boolean;
  currentScore: ScoringResponse | undefined;
  searchParameters: PatientRecordsSearchParameter;
}

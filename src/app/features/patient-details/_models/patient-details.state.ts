import { Patient } from '@models/patient/patient.model';
import { ScoringResponse } from '@models/scoring/scoring-response.model';
import { Biomarker } from '@models/biomarker/biomarker.model';

export interface PatientDetailsState {
  isLoading: boolean;
  currentScore?: ScoringResponse;
  patient?: Patient;
  // calculationSubmitted: boolean;
  canEditPatientData: boolean;
  biomarkerTemplate?: Biomarker;
  patientData?: ScoringResponse;
}

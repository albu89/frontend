import { Patient } from '@models/patient/patient.model';
import { ScoringResponse } from '@models/scoring/scoring-response.model';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { FormMode } from '@features/patient-details/_models/form-mode';

export interface PatientDetailsState {
  isLoading: boolean;
  isDraftLoading: boolean;
  scoreDraftId?: string;
  currentScore?: ScoringResponse;
  patient?: Patient;
  biomarkerTemplate?: Biomarker;
  patientData?: ScoringResponse;
  formMode: FormMode;
  isEditingEnabled: boolean;
}

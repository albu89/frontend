import { MedicalHistoryCategory } from '@models/biomarker/medical-history/medical-history-category.model';
import { LabResultsCategory } from '@models/biomarker/lab-results/lab-results-category.model';

export interface BiomarkerCategories {
  medicalHistory: MedicalHistoryCategory;
  labResults: LabResultsCategory;
}

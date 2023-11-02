import { BiomarkerCategories } from '@models/biomarker/biomarker-categories.model';
import { MedicalHistoryItem } from '@models/biomarker/medical-history/medicalHistory.model';
import { LabResultItem } from '@models/biomarker/lab-results/lab-result.model';

export interface Biomarker {
  categories: BiomarkerCategories;
  medicalHistory: MedicalHistoryItem[];
  labResults: LabResultItem[];
}

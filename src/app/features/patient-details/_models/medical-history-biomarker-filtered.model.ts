import { BiomarkerUnitType } from '@core/enums/biomarker-unit-type.enum';
import { MedicalHistoryItem } from '@models/biomarker/medical-history/medicalHistory.model';

export interface MedicalHistoryBiomarkerFiltered {
  name: typeof BiomarkerUnitType;
  list: MedicalHistoryItem[] | undefined;
}

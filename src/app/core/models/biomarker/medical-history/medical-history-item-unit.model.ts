import { MedicalHistoryOption } from '@models/biomarker/medical-history/medicalHistoryOption.model';
import { BiomarkerUnitType } from '@core/enums/biomarker-unit-type.enum';

export interface MedicalHistoryItemUnit {
  unitType: BiomarkerUnitType;
  shorthand: string;
  conversionFactor: number;
  minimum?: number;
  maximum?: number;
  options: MedicalHistoryOption[] | null;
}

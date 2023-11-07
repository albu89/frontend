import { MedicalHistoryItemUnit } from '@models/biomarker/medical-history/medical-history-item-unit.model';
import { MedicalHistoryCategoryIds } from '@core/enums/biomarker-medicalhistory-categories.enum';
import { BiomarkerInputType } from '@core/enums/biomarker-input-type.enum';

export interface MedicalHistoryItem {
  unit: MedicalHistoryItemUnit;
  id: string;
  orderIndex: number;
  categoryId: MedicalHistoryCategoryIds;
  infoText: string;
  type: BiomarkerInputType;
  displayName: string;
}

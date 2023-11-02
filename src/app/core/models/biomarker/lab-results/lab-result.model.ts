import { LabResultUnit } from '@models/biomarker/lab-results/lab-result-units.model';
import { LabResultsCategoryIds } from '@core/enums/biomarker-labresults-categories.enum';
import { BiomarkerUnitType } from '@core/enums/biomarker-unit-type.enum';
import { BiomarkerInputType } from '@core/enums/biomarker-input-type.enum';

export interface LabResultItem {
  units: LabResultUnit[];
  preferredUnit: BiomarkerUnitType;
  id: string;
  orderIndex: number;
  categoryId: LabResultsCategoryIds;
  infoText: string;
  type: BiomarkerInputType;
  displayName: string;
  //TODO: extra für die forms ... ?
  value?: string | number | Date | null | boolean;
}

import { BiomarkerUnitType } from '@core/enums/biomarker-unit-type.enum';

export interface BiomarkersInfoValue {
  id: string;
  value: boolean | string | number | Date;
  displayValue: boolean | string | number | Date;
  unit: BiomarkerUnitType;
}

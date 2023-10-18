import { ClinicalSetting } from '@core/enums/clinical-setting.enum';
import { BiomarkerUnitType } from '../../enums/biomarker-unit-type.enum';

// TODO: This data structure doesn't seem aligned at all with the specs (for instance most of the fields are not present for all biomarkers). Let's find a solution with Xavier.
export interface BiomarkerUnit {
  id: string;
  name: string;
  type: string;
  enum?: string[];
  displayNames?: Map<string, string>;
  clinicalSetting: ClinicalSetting;
  unitType: BiomarkerUnitType;
  values?: string[];
  minimum: number;
  maximum: number;
}

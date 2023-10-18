import { BiomarkerUnit } from './biomarker-unit.model';

export interface Biomarker {
  id: string;
  category: string;
  fieldname: string;
  units: BiomarkerUnit[];
  infoText: string;
  preferredUnit: string;
  orderNumber: number;
  value: number | string | boolean;
  selectedUnit: BiomarkerUnit;
  color: string;
  errorMessage: string;
  isValid: boolean | undefined;
}

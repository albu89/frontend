import { LanguageService } from '../service/language.service';

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

export interface BiomarkerDragItem {
  item: Biomarker;
  index: number;
}

export function validateEntry(biomarker: Biomarker, translate: LanguageService): void {
  const valueType = biomarker.selectedUnit?.type?.toLowerCase();
  switch (valueType) {
    case 'integer':
    case 'float': {
      const inputValue = biomarker.value as number;
      if (
        inputValue > biomarker.selectedUnit.maximum ||
        inputValue < biomarker.selectedUnit.minimum ||
        inputValue === null
      ) {
        biomarker.color = 'red';
        biomarker.isValid = false;
        translate.translate
          .get('validationRangeMessage', {
            minimum: biomarker.selectedUnit.minimum,
            maximum: biomarker.selectedUnit.maximum,
          })
          .subscribe({
            next: value => (biomarker.errorMessage = value),
            error: () =>
              (biomarker.errorMessage = `The value must be between ${biomarker.selectedUnit.minimum} and ${biomarker.selectedUnit.maximum}`),
          });
      } else {
        biomarker.isValid = true;
      }
      break;
    }
    case 'string':
      if (biomarker.value) {
        biomarker.isValid = true;
      } else {
        biomarker.color = 'red';
        biomarker.isValid = false;
        translate.translate.get('optionSelect').subscribe({
          next: value => (biomarker.errorMessage = value),
          error: () => (biomarker.errorMessage = `Select an option`),
        });
      }
      break;
    case 'boolean':
      if (biomarker.value !== undefined && biomarker.value !== null) {
        biomarker.isValid = true;
      } else {
        biomarker.color = 'red';
        biomarker.isValid = false;
        translate.translate.get('optionSelect').subscribe({
          next: value => (biomarker.errorMessage = value),
          error: () => (biomarker.errorMessage = `Select an option`),
        });
      }

      break;
    default:
      break;
  }
}

// TODO: This data structure doesn't seem aligned at all with the specs (for instance most of the fields are not present for all biomarkers). Let's find a solution with Xavier.
export interface BiomarkerUnit {
  id: string;
  name: string;
  type: string;
  enum?: string[];
  displayNames?: Map<string, string>;
  clinicalSetting: string;
  unitType: BiomarkerUnitType;
  values?: string[];
  minimum: number;
  maximum: number;
}

export enum BiomarkerUnitType {
  SI = 'SI',
  Conventional = 'Conventional',
  Other = 'Other',
}

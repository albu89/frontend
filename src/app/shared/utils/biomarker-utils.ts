// Todo move to biomark service
import { Biomarker } from '@models/biomarker/biomarker.model';
import { LanguageService } from '@services/language.service';

export function validateBiomarkerEntry(biomarker: Biomarker, translate: LanguageService): void {
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

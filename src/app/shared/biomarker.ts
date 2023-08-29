import { LanguageService } from "../service/language.service";

export interface Biomarker {
    id: string;
    category: string;
    fieldname: string;
    units: BiomarkerUnit[];
    infoText: string;
    preferredUnit: string;
    orderNumber: string;
    value: number | string | boolean;
    selectedUnit: BiomarkerUnit;
    color: string;
    errorMessage: string;
    isValid: boolean | undefined;
}

export function isStringValue(value: number | boolean | string): value is string {
    return typeof value === 'string';
}

export function validateEntry(biomarker: Biomarker, translate: LanguageService): void {
    console.log('validating')
    const valueType = biomarker.selectedUnit?.type?.toLowerCase();
    switch (valueType) {
        case "integer":
        case "float": {
            const inputValue = biomarker.value as number;
            if (inputValue > biomarker.selectedUnit.maximum || inputValue < biomarker.selectedUnit.minimum || inputValue == null) {
                biomarker.color = 'red';
                biomarker.isValid = false;
                translate.translate.get('validationRangeMessage', { minimum: biomarker.selectedUnit.minimum, maximum: biomarker.selectedUnit.maximum }).subscribe(
                    {
                        next: value => biomarker.errorMessage = value,
                        error: () => biomarker.errorMessage = `The value must be between ${biomarker.selectedUnit.minimum} and ${biomarker.selectedUnit.maximum}`
                    }
                );
            } else {
                biomarker.isValid = true;
            }
            break;
        }
        case "string":
            if (biomarker.value) {
                biomarker.isValid = true;
            }
            else {
                biomarker.color = 'red';
                biomarker.isValid = false;
                translate.translate.get('optionSelect').subscribe(
                    {
                        next: value => biomarker.errorMessage = value,
                        error: () => biomarker.errorMessage = `Select an option`
                    }
                );                
            }
            break;
        case "boolean":
            if (biomarker.value !== undefined && biomarker.value !== null) {
                biomarker.isValid = true;
            } else {
                biomarker.color = 'red';
                biomarker.isValid = false;
                translate.translate.get('optionSelect').subscribe(
                    {
                        next: value => biomarker.errorMessage = value,
                        error: () => biomarker.errorMessage = `Select an option`
                    }
                );      
            }

            break;
        default:
            break;
    }
}

export interface BiomarkerUnit {
    id: string;
    name: string;
    type: string;
    enum: string[];
    displayNames?: Map<string, string>;
    clinicalSetting: string;
    unitType: BiomarkerUnitType;
    values: string[];
    minimum: number;
    maximum: number;
}

export enum BiomarkerUnitType {
    SI,
    Conventional,
    Other
}
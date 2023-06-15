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
    errorMessage : string;
    isValid: boolean | undefined;
}

export interface BiomarkerUnit {
    id: string;
    name: string;
    type: string;
    enum: string[];
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
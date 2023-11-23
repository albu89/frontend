import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BiomarkerUnitType } from '@core/enums/biomarker-unit-type.enum';

export interface FormModel {
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  birthdate: FormControl<string | null>;
  preferredUnitType: FormControl<BiomarkerUnitType | null>;
  biomarkerValues?: FormArray<FormGroup<BiomarkerFormModel>> | undefined;
}

export interface BiomarkerFormModel {
  name: FormControl<string>;
  unitType: FormControl<BiomarkerUnitType>;
  value: FormControl<string | Date | number | undefined | null | boolean>;
}

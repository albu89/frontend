import { FormControl, FormGroup } from '@angular/forms';
import { ClinicalSetting } from '@core/enums/clinical-setting.enum';

export interface FormModel {
  eMailAddress: FormControl<string>;
  salutation: FormControl<string>;
  title: FormControl<string>;
  firstName: FormControl<string>;
  surname: FormControl<string>;
  professionalSpecialisation: FormControl<string>;
  department: FormControl<string | null>;
  address: FormControl<string>;
  zipCode: FormControl<string>;
  city: FormControl<string>;
  country: FormControl<string>;
  telephoneNumber: FormControl<string>;
  language: FormControl<string>;
  preferredLab: FormControl<string>;
  clinicalSetting: FormControl<ClinicalSetting | undefined>;
  clinicalSettingConfirm: FormControl<boolean>;
  isSeparateBilling: FormControl<boolean>;
  countryCode: FormControl<string>;
  unitLabValues: FormControl<string>;
  isActive: FormControl<boolean>;
  organization: FormControl<string | null>;
  billing: FormGroup<BillingForm>;
}
export interface BillingForm {
  billingName: FormControl<string | null>;
  billingAddress: FormControl<string | null>;
  billingZip: FormControl<string | null>;
  billingCity: FormControl<string | null>;
  billingCountry: FormControl<string | null>;
  billingCountryCode: FormControl<string | null>;
  billingPhone: FormControl<string | null>;
}

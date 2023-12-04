import { Profile } from '@models/user/user-profile.model';
import { BillingSchema } from '@models/user/billing-schema.model';

export interface ProfileSchema extends Profile {
  salutationHeader: string;
  titleHeader: string;
  surnameHeader: string;
  firstNameHeader: string;
  professionalSpecialisationHeader: string;
  preferredLabHeader: string;
  addressHeader: string;
  cityHeader: string;
  zipCodeHeader: string;
  countryCodeHeader: string;
  countryHeader: string;
  telephoneNumberHeader: string;
  eMailAddressHeader: string;
  languageHeader: string;
  unitLabValuesHeader: string;
  isActiveHeader: string;
  isSeparateBillingHeader: string;
  isSeparateBilling: boolean;
  billing: BillingSchema;
  clinicalSettingHeader: string;
  departmentHeader: string;
  organizationHeader: string;
  intendedUseClinicalSettingHeader: string;
  intendedUseClinicalSetting: string;
  changeClinicalSettingHeader: string;
  changeClinicalSetting: string;
}

import { ClinicalSetting } from '@core/enums/clinical-setting.enum';

export interface Profile {
  username?: string;
  userId?: string;
  salutation: string;
  title: string;
  surname: string;
  firstName: string;
  professionalSpecialisation: string;
  department: string | null;
  preferredLab: string;
  address: string;
  city: string;
  zipCode: string;
  countryCode: string;
  country: string;
  telephoneNumber: string;
  eMailAddress: string;
  language: string;
  unitLabValues: string;
  clinicalSetting: ClinicalSetting | undefined;
  // role: string;
  organization: string | null;
  // medicalSpecialist: string;
  isActive: boolean;
}

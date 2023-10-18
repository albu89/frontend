import { ClinicalSetting } from '@core/enums/clinical-setting.enum';

export class Profile {
  public username = '';
  public emailAddress = '';
  public salutation = '';
  public title = '';
  public firstName = '';
  public surname = '';
  public professionalSpecialisation = '';
  public department = '';
  public preferredLab = '';
  public address = '';
  public zipCode = '';
  public city = '';
  public countryCode = '';
  public country = '';
  public telephoneNumber = '';
  public language = '';
  public unitLabValues = '';
  public clinicalSetting: ClinicalSetting | undefined = undefined;
  public medicalSpecialist = '';
}

import { ClinicalSetting } from '@core/enums/clinical-setting.enum';
import { ClinicalSettingSpec } from '@core/models/user/clinical-setting-spec.model';

export const DEFAULT_LANGUAGE = 'en-GB';

export const CLINICAL_SETTINGS: { [key in ClinicalSetting]: ClinicalSettingSpec } = {
  [ClinicalSetting.PrimaryCare]: {
    name: 'PrimaryCare',
    descr: 'clinicalSetting.primaryCare',
  },
  [ClinicalSetting.SecondaryCare]: {
    name: 'SecondaryCare',
    descr: 'clinicalSetting.secondaryCare',
  },
} as const;

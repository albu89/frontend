import { ClinicalSetting } from '@core/enums/clinical-setting.enum';
import { ClinicalSettingSpec } from '@core/models/user/clinical-setting-spec.model';

export const DEFAULT_LANGUAGE = 'en-GB';

export const CLINICAL_SETTINGS: { [key in ClinicalSetting]: ClinicalSettingSpec } = {
  [ClinicalSetting.PrimaryCare]: {
    name: 'PrimaryCare',
    descr: 'Risk stratification or screening in primary care',
  },
  [ClinicalSetting.SecondaryCare]: {
    name: 'SecondaryCare',
    descr: 'Evaluation by a cardiologist or in a hospital setting (secondary care)',
  },
} as const;

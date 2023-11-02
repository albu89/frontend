import { BiomarkersInfoValue } from '@models/biomarker/biomarkers-info-values.model';

export interface BiomarkersInfo {
  createdOn: Date | string;
  requestId: string;
  id: string;
  values: BiomarkersInfoValue[];
}

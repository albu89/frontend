import { Prevalence, Warning } from './ScoringResponseSchema';
import { BiomarkersInfo } from './biomarkersInfo';

export interface ScoringResponse {
  classifierClass: number;
  classifierScore: number;
  classifierSign: number;
  requestId: string;
  riskValue: string;
  riskClass: number;
  warnings: Warning[];
  recommendationSummary: string;
  recommendationLongText: string;
  biomarkers: BiomarkersInfo;
  prevalence: Prevalence;
  canEdit: boolean;
}

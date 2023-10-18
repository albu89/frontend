import { Prevalence } from '../../enums/scoring-prevalence.enum';
import { BiomarkersInfo } from '../biomarker/biomarkers-info.model';
import { Warning } from './scoring-warning.model';

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

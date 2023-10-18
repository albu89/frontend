import { Prevalence } from '../../enums/scoring-prevalence.enum';

export interface RecommendationCategory {
  id: number;
  shortText: string;
  longText: string;
  lowerLimit: number;
  upperLimit: number;
  riskValue: string;
  prevalence: Prevalence;
}

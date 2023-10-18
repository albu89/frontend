import { Biomarker } from '../biomarker/biomarker.model';
import { Abbreviation } from './scoring-abbreviation.model';
import { RecommendationCategory } from './scoring-recommendation-category.model';
import { Warning } from './scoring-warning.model';

export interface ScoringResponseSchema {
  scoreHeader: string;
  score: string;
  riskHeader: string;
  risk: string;
  recommendationHeader: string;
  recommendation: string;
  recommendationExtended: string;
  recommendationProbabilityHeader: string;
  warningHeader: string;
  warnings: Warning[];
  infoText: string;
  abbreviations: Abbreviation;
  cadDefinitionHeader: string;
  cadDefinition: string;
  footnoteHeader: string;
  footnote: string;
  intendedUseHeader: string;
  intendedUse: string;
  recommendationTableHeader: string;
  recommendationScoreRangeHeader: string;
  recommendationCategories: RecommendationCategory[];
  biomarkers: Biomarker[];
}

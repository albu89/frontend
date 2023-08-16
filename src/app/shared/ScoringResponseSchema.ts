import { Biomarker } from "./biomarker"

export interface ScoringResponseSchema {
  scoreHeader: string
  score: string
  riskHeader: string
  risk: string
  recommendationHeader: string
  recommendation: string
  recommendationExtended: string
  recommendationProbabilityHeader: string
  warningHeader: string
  warnings: Warning[]
  infoText: string
  abbreviations: Abbreviation
  cadDefinitionHeader: string
  cadDefinition: string
  footnoteHeader: string
  footnote: string
  intendedUseHeader: string
  intendedUse: string
  recommendationTableHeader: string
  recommendationScoreRangeHeader: string
  recommendationCategories: RecommendationCategory[]
  biomarkers: Biomarker[]
}

export interface RecommendationCategory {
  id: number
  shortText: string
  longText: string
  lowerLimit: number
  upperLimit: number
  riskValue: string
  prevalence: Prevalence
}

export enum Prevalence {
  Primary = 'Primary',
  Secondary = 'Secondary'
}

export interface Abbreviation {
  [key: string]: string
}

export interface Warning {
  message: string,
  [key: string]: string
}

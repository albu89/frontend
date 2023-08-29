import { Prevalence, Warning } from "./ScoringResponseSchema"
import { BiomarkersInfo } from "./biomarkersInfo"

export interface ScoringResponse {
  classifier_class: number
  classifier_score: number
  classifier_sign: number
  requestId: string
  riskValue: string
  riskClass: number
  warnings: Warning[]
  recommendationSummary: string
  recommendationLongText: string
  biomarkers: BiomarkersInfo
  prevalence: Prevalence
  canEdit: boolean
}
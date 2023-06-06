export interface ScoringResponse {
  id: number,
  score: number,
  class: number,
  is_CAD_plus: number,
  is_H_plus: number,
  error_code: number,
  message: string,
  classifier_class: number,
  classifier_score: number,
  classifier_sign: number,
  timestamp: number,
  classifier_type: string,
  username: string,
  hidden: boolean,
  orgclient: string
}
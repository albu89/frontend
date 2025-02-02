import { ScoringRequestValue } from './scoring-request-value.model';

export interface ScoringRequest {
  prior_CAD: ScoringRequestValue;
  age: ScoringRequestValue;
  sex: ScoringRequestValue;
  height: ScoringRequestValue;
  weight: ScoringRequestValue;
  chest_pain: ScoringRequestValue;
  nicotine: ScoringRequestValue;
  diabetes: ScoringRequestValue;
  statin: ScoringRequestValue;
  tc_agg_inhibitor: ScoringRequestValue;
  ace_inhibitor: ScoringRequestValue;
  calcium_ant: ScoringRequestValue;
  betablocker: ScoringRequestValue;
  diuretic: ScoringRequestValue;
  nitrate: ScoringRequestValue;
  systolic_bp: ScoringRequestValue;
  diastolic_bp: ScoringRequestValue;
  q_wave: ScoringRequestValue;
  amylase_p: ScoringRequestValue;
  alkaline: ScoringRequestValue;
  hs_troponin_t: ScoringRequestValue;
  alat: ScoringRequestValue;
  glocuse: ScoringRequestValue;
  bilirubin: ScoringRequestValue;
  urea: ScoringRequestValue;
  uric_acid: ScoringRequestValue;
  cholesterol: ScoringRequestValue;
  hdl: ScoringRequestValue;
  ldl: ScoringRequestValue;
  protein: ScoringRequestValue;
  albumin: ScoringRequestValue;
  leucocyte: ScoringRequestValue;
  mchc: ScoringRequestValue;
}

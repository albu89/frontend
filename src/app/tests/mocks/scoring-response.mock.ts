import { ScoringResponse } from '@models/scoring/scoring-response.model';
import { BiomarkersInfoMock } from './biomarkers-info.mock';
import { WarningMock } from './warning.mock';
import { Prevalence } from '@core/enums/scoring-prevalence.enum';

export const ScoringResponseMock: ScoringResponse = {
  classifier_score: 0.7412359714508057,
  requestId: 'fddfd08b-0df2-4573-c9e1-08dbd47700ef',
  riskValue: '20%',
  riskClass: 2,
  warnings: [WarningMock],
  recommendationSummary: 'Anatomical non-invasive evaluation (e.g., coronary CT angiography (CTA)).',
  recommendationLongText:
    'Choice of the test based on clinical likelihood, patient characteristics and preference, availability, as well as local expertise. Anatomical non-invasive evaluation, by visualizing the coronary arterylumen and wall using an intravenous contrast agent, can be performed with coronary CTA, which provides high accuracy for the detection of obstructive coronary stenoses defined by ICA, because both tests are based on anatomy. However, stenoses estimated to be 50-90% by visual inspection are not necessarily functionally significant, i.e. they do not always induce myocardial ischaemia. Therefore, either non-invasive or invasive functional testing is recommended for further evaluation of angiographic stenosis detected by coronary CTA invasive angiography, unless a very high-grade (>90% diameter stenosis) stenosis is detected via invasive angiography. The presence or absence of non-obstructive coronary atherosclerosis on coronary CTA provides prognostic information, and can be used to guide preventive therapy.',
  prevalence: Prevalence.Primary,
  biomarkers: BiomarkersInfoMock,
  canEdit: true,
  isDraft: false,
};

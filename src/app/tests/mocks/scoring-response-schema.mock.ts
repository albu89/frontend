import { ScoringResponseSchema } from '@models/scoring/scoring-response-schema.model';
import { BiomarkersMock } from './biomarker-data.mock';
import { Prevalence } from '@core/enums/scoring-prevalence.enum';

export const ScoringResponseSchemaMock: ScoringResponseSchema = {
  scoreHeader: 'Score',
  score: '',
  riskHeader: 'Risk of obstructive CAD',
  risk: '',
  recommendationHeader: 'Recommendation',
  recommendation: '',
  recommendationExtended: '',
  recommendationProbabilityHeader: 'Probability of obstructive CAD',
  warningHeader: 'Warnings',
  warnings: [],
  infoText:
    'Choice of the text based on clinical likelihood, patient characteristics and preference, availability, as well as local expertise.',
  abbreviations: {
    CTA: 'computed tomography angiography',
    FFR: 'fractional flow reserve',
    iwFR: 'instantaneous wave-free ratio',
  },
  cadDefinitionHeader: 'CAD Definition',
  cadDefinition:
    'In accordance to current medical guidelines, obstructive coronary artery disease (CAD) is defined as a stenosis or blockage of 50% or more in the diameter of a major coronary artery or a branch with a diameter of 2 mm or more.',
  footnoteHeader: 'Footnote',
  footnote:
    "It's important to note that the management of patients with suspected CAD should be individualized based on the patient's specific risk factors and overall health status. Patients should work closely with their healthcare provider to develop a personalized management plan that meets their needs and goals.",
  intendedUseHeader: 'Intended use',
  intendedUse:
    'The Cardio Explorer is intended for all patients who are suspected of having coronary artery disease (CAD) in the medical consultation.',
  recommendationTableHeader: 'Recommendation (ESC 2019 guidelines)',
  recommendationScoreRangeHeader: 'Score Range',
  recommendationCategories: [
    {
      id: 1,
      shortText: 'No diagnostic testing mandated.',
      longText:
        'Choice of the test based on clinical likelihood, patient characteristics and preference, availability, as well as local expertise. Medical guidelines recommend a conservative approach to management. This typically involves lifestyle modifications and risk factor reduction.',
      lowerLimit: 0,
      upperLimit: 0.711994,
      riskValue: '<5%',
      prevalence: Prevalence.Primary,
    },
    {
      id: 2,
      shortText: 'Anatomical non-invasive evaluation (e.g., coronary CT angiography (CTA)).',
      longText:
        'Choice of the test based on clinical likelihood, patient characteristics and preference, availability, as well as local expertise. Anatomical non-invasive evaluation, by visualizing the coronary arterylumen and wall using an intravenous contrast agent, can be performed with coronary CTA, which provides high accuracy for the detection of obstructive coronary stenoses defined by ICA, because both tests are based on anatomy. However, stenoses estimated to be 50-90% by visual inspection are not necessarily functionally significant, i.e. they do not always induce myocardial ischaemia. Therefore, either non-invasive or invasive functional testing is recommended for further evaluation of angiographic stenosis detected by coronary CTA invasive angiography, unless a very high-grade (>90% diameter stenosis) stenosis is detected via invasive angiography. The presence or absence of non-obstructive coronary atherosclerosis on coronary CTA provides prognostic information, and can be used to guide preventive therapy.',
      lowerLimit: 0.711994,
      upperLimit: 0.8714438,
      riskValue: '20%',
      prevalence: Prevalence.Primary,
    },
    {
      id: 3,
      shortText: 'Testing for ischemia (non-invasive functional imaging preferred).',
      longText:
        'Choice of the test based on clinical likelihood, patient characteristics and preference, availability, as well as local expertise. Anatomical non-invasive evaluation, by visualizing the coronary arterylumen and wall using an intravenous contrast agent, can be performed with coronary CTA, which provides high accuracy for the detection of obstructive coronary stenoses defined by ICA, because both tests are based on anatomy. However, stenoses estimated to be 50-90% by visual inspection are not necessarily functionally significant, i.e. they do not always induce myocardial ischaemia. Therefore, either non-invasive or invasive functional testing is recommended for further evaluation of angiographic stenosis detected by coronary CTA invasive angiography, unless a very high-grade (>90% diameter stenosis) stenosis is detected via invasive angiography. The presence or absence of non-obstructive coronary atherosclerosis on coronary CTA provides prognostic information, and can be used to guide preventive therapy.',
      lowerLimit: 0.8714438,
      upperLimit: 0.9154612,
      riskValue: '50%',
      prevalence: Prevalence.Primary,
    },
    {
      id: 4,
      shortText:
        'Testing for ischemia (imaging testing preferred) with consideration of invasive angiography (with iwFR/FFR).',
      longText:
        'Choice of the test based on clinical likelihood, patient characteristics and preference, availability, as well as local expertise. Functional non-invasive tests for the diagnosis of obstructive CAD recommended urgently to visualize the coronary arteries and identify any blockages. The opening of narrowed arteries (angioplasty) can reduce the risk of a heart attack by restoring normal blood flow to the heart. Angioplasty involves the insertion of a small tube (catheter) into the artery and inflating a tiny balloon to open up the artery.',
      lowerLimit: 0.9154612,
      upperLimit: 1.0,
      riskValue: '>75%',
      prevalence: Prevalence.Primary,
    },
    {
      id: 1,
      shortText: 'No diagnostic testing mandated.',
      longText:
        'Choice of the test based on clinical likelihood, patient characteristics and preference, availability, as well as local expertise.\n\nMedical guidelines recommend a conservative approach to management. This typically involves lifestyle modifications and risk factor reduction.',
      lowerLimit: 0,
      upperLimit: 0.1203604,
      riskValue: '<5%',
      prevalence: Prevalence.Secondary,
    },
    {
      id: 2,
      shortText: 'Anatomical non-invasive evaluation (e.g., coronary CT angiography (CTA)).',
      longText:
        'Choice of the test based on clinical likelihood, patient characteristics and preference, availability, as well as local expertise.\n\nAnatomical non-invasive evaluation, by visualizing the coronary artery\nlumen and wall using an intravenous contrast agent, can be performed with coronary CTA, which provides high accuracy for the detection of obstructive coronary stenoses defined by ICA, because both tests are based on anatomy. However, stenoses estimated to be 50-90% by visual inspection are not necessarily functionally significant, i.e. they do not always induce myocardial ischaemia. Therefore, either non-invasive or invasive functional testing is recommended for further evaluation of angiographic stenosis detected by coronary CTA invasive angiography, unless a very high-grade (>90% diameter stenosis) stenosis is detected via invasive angiography. The presence or absence of non-obstructive coronary atherosclerosis on coronary CTA provides prognostic information, and can be used to guide preventive\ntherapy.',
      lowerLimit: 0.1203604,
      upperLimit: 0.711994,
      riskValue: '20%',
      prevalence: Prevalence.Secondary,
    },
    {
      id: 3,
      shortText: 'Testing for ischemia (non-invasive functional imaging preferred).',
      longText:
        'Choice of the test based on clinical likelihood, patient characteristics and preference, availability, as well as local expertise.\n\nFunctional non-invasive tests for the diagnosis of obstructive CAD\nare designed to detect myocardial ischaemia through ECG\nchanges, wall motion abnormalities by stress CMR or stress echocardiography,\nor perfusion changes by single-photon emission CT(SPECT), positron emission tomography (PET), myocardial contrast\nechocardiography, or contrast CMR. Ischaemia can be provoked\nby exercise or pharmacological stressors, either by\nincreased myocardial work and oxygen demand, or by heterogeneity\nin myocardial perfusion by vasodilatation.',
      lowerLimit: 0.711994,
      upperLimit: 0.8714438,
      riskValue: '50%',
      prevalence: Prevalence.Secondary,
    },
    {
      id: 4,
      shortText: 'Invasive angiography (with iwFR/FFR).',
      longText:
        'Choice of the test based on clinical likelihood, patient characteristics and preference, availability, as well as local expertise.\n\nFunctional non-invasive tests for the diagnosis of obstructive CAD recommended urgently to visualize the coronary arteries and identify any blockages. \n\nThe opening of narrowed arteries (angioplasty) can reduce the risk of a heart attack by restoring normal blood flow to the heart. Angioplasty involves the insertion of a small tube (catheter) into the artery and inflating a tiny balloon to open up the artery.',
      lowerLimit: 0.8714438,
      upperLimit: 1.0,
      riskValue: '>90%',
      prevalence: Prevalence.Secondary,
    },
  ],
  biomarkers: BiomarkersMock,
};

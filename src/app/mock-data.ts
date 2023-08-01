import { Biomarker } from "./shared/biomarker"

export const MOCKDATA : Biomarker[] = [
    {category: 'Anamnesis', fieldname: 'Patient ID', infotext: 'i', inputfieldtype: 'text', choices: [], unit: '', valuerange: []},
    {category: 'Anamnesis', fieldname: 'Age, years', infotext: 'i', inputfieldtype: 'number', choices: [], unit: '', valuerange: []},
    {category: 'Medication', fieldname: 'Diabetes', infotext: 'i', inputfieldtype: 'choices', choices: ['no', 'NIDDM', 'IDDM'], unit: '', valuerange: []},
    {category: 'Medication', fieldname: 'Cholesterol lowering (Statin)', infotext: 'i', inputfieldtype: 'choices', choices: ['no', 'yes'], unit: '', valuerange: []},
    {category:'Clinical findings', fieldname:'Systolic blood pressure', infotext:'', inputfieldtype:'number', choices:[], unit:'mm HG', valuerange:[]},
    {category:'Clinical findings', fieldname:'Diastolic blood pressure', infotext:'', inputfieldtype:'number', choices:[], unit:'mm HG', valuerange:[]},
    {category:'Enzymes', fieldname:'Pancreatic amylase', infotext:'i', inputfieldtype:'number', choices:[], unit:'U/L', valuerange:[]},
    {category:'Enzymes', fieldname:'Alkaline phosphatase', infotext:'i', inputfieldtype:'number', choices:[], unit:'U/L', valuerange:[]},
    {category:'Metabolite', fieldname:'Bilirubin (total)', infotext:'i', inputfieldtype:'number', choices:[], unit:'mg/dl', valuerange:[1,2]},
    {category:'Metabolite', fieldname:'Urea', infotext:'i', inputfieldtype:'number', choices:[], unit:'mg/dl', valuerange:[1,2]}
]
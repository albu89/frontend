import { Component, Input } from '@angular/core';
import { Biomarker } from '../shared/biomarker';

@Component({
  selector: 'app-patient-data-form',
  templateUrl: './patient-data-form.component.html',
  styleUrls: ['./patient-data-form.component.scss']
})
export class PatientDataFormComponent {

  @Input() uniqueCategories: string[] = [];
  @Input() biomarkers: Biomarker[] = [];
}
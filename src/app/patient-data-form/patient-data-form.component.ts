import { Component,  Input } from '@angular/core';
import { Biomarker } from '../shared/biomarker';
import { Patient } from '../shared/patient';


@Component({
  selector: 'app-patient-data-form',
  templateUrl: './patient-data-form.component.html',
  styleUrls: ['./patient-data-form.component.css']
})
export class PatientDataFormComponent {

  @Input() uniqueCategories: string[] = [];
  @Input() biomarkers: Biomarker[] = [];
  @Input() patient: Patient = {} as Patient;
  @Input() canEdit = true;
  
  setDateOfBirth(input: Date){
    this.patient.dateOfBirth = input;
  }

}
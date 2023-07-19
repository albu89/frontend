import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Biomarker } from '../shared/biomarker';
import { Patient } from '../shared/patient';

@Component({
  selector: 'app-patient-data-form',
  templateUrl: './patient-data-form.component.html',
  styleUrls: ['./patient-data-form.component.scss']
})
export class PatientDataFormComponent {

  @Input() uniqueCategories: string[] = [];
  @Input() biomarkers: Biomarker[] = [];
  @Input() patient: Patient = {} as Patient;

  setDateOfBirth(input: any){
    this.patient.dateOfBirth = input;
    console.log(this.patient.firstname, this.patient.lastname);
  }
}
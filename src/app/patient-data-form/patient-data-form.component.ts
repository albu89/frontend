import { AfterViewInit, Component, Input } from '@angular/core';
import { Biomarker } from '../shared/biomarker';
import { Patient } from '../shared/patient';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'ce-patient-data-form',
  templateUrl: './patient-data-form.component.html',
  styleUrls: ['./patient-data-form.component.scss'],
})
export class PatientDataFormComponent implements AfterViewInit {
  @Input() public uniqueCategories: string[] = [];
  @Input() public biomarkers: Biomarker[] = [];
  @Input() public patient: Partial<Patient> = {};
  @Input() public canEdit = true;

  public ngAfterViewInit() {
    initFlowbite();
  }

  public setDateOfBirth(input: Date) {
    this.patient.dateOfBirth = input;
  }
}

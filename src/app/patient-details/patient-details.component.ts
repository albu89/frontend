import { Component } from '@angular/core';
import { Biomarker, validateEntry } from '../shared/biomarker';
import { BiomarkerService } from '../service/biomarker.service';
import { ScoringRequest, ScoringRequestValue, ScoringRequestWithPatientData } from '../shared/ScoringRequest';
import { ScoringResponse } from '../shared/ScoringResponse';
import { Patient } from '../shared/patient';
import { SchemasService } from '../service/schemas.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent {

  constructor(private biomarkerService: BiomarkerService, private schemaService: SchemasService) { }

  ngOnInit() {
    this.schemaService.getBiomarkers().subscribe(template => {
      template.forEach(biomarker => {
        biomarker.isValid = true;
      });
      this.biomarkerTemplate = template;
      this.uniqueCategories = this.getUniqueCategories()
    });
  }
  biomarkerTemplate: Biomarker[] = [];
  uniqueCategories: string[] = [];
  scoreResponse?: ScoringResponse;
  scoreResponseReceived = false;
  patient: Patient = {} as Patient;
  calculationSubmitted = false;

  getUniqueCategories(): string[] {
    const categories: string[] = ['fixed', 'flexible'];
    return categories;
  }

  validateBiomarkers() {
    this.biomarkerTemplate.forEach(biomarker => {
      validateEntry(biomarker);
    });

  }

   submit() {
    this.validateBiomarkers();
    if (!this.biomarkerTemplate.every(x => x.isValid)) {
      return;
    }
    this.calculationSubmitted = false;
    this.scoreResponseReceived = false;
    const request: ScoringRequestWithPatientData = {} as ScoringRequestWithPatientData;
    this.biomarkerTemplate.forEach(marker => {
      const prop = request[marker.id as keyof ScoringRequest] = {} as ScoringRequestValue;
      prop.value = marker.value;
      prop.unitType = marker.selectedUnit.unitType + '';
    });
    if (!this.patient.dateOfBirth || !this.patient.lastname || !this.patient.firstname) {
      return;
    }
    request.Firstname = this.patient.firstname;
    request.Lastname = this.patient.lastname;
    request.DateOfBirth = this.patient.dateOfBirth;
    request.clinical_setting = { value: 0, unitType: "" };

    this.biomarkerService.sendRequest(request).subscribe(async resp => {
      this.scoreResponse = resp;
      this.scoreResponseReceived = true;
    });
    this.calculationSubmitted = true;
  }

  submitButtonDisabled(): boolean {
    return this.calculationSubmitted;
  }
}
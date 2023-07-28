import { Component } from '@angular/core';
import { Biomarker} from '../shared/biomarker';
import { BiomarkerService } from '../service/biomarker.service';
import { ScoringRequest, ScoringRequestValue, ScoringRequestWithPatientData } from '../shared/ScoringRequest';
import { ScoringResponse } from '../shared/ScoringResponse';
import { Patient } from '../shared/patient';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent {

  constructor(private biomarkerService: BiomarkerService) {}

  ngOnInit() {
    this.biomarkerService.getBiomarkers().subscribe(template => {
      this.biomarkerTemplate = template;
      this.uniqueCategories = this.getUniqueCategories()
    });
  }
  biomarkerTemplate : Biomarker[] = [];
  uniqueCategories : string[] = [];
  scoreResponse: ScoringResponse = {} as ScoringResponse;
  scoreResponseReceived = false;
  patient: Patient = {} as Patient;
  getUniqueCategories() : string[] {
    const categories : string[] = ['fixed', 'flexible'];
    return categories;
  }

  validateBiomarkers() {
    this.biomarkerTemplate.forEach(biomarker => {
      
      //biomarker is each instance of a filled marker
      if((typeof biomarker.value === 'number' && biomarker.selectedUnit.minimum && biomarker.selectedUnit.maximum) && (biomarker.value < biomarker.selectedUnit.minimum || biomarker.value > biomarker.selectedUnit.maximum)) {
        //negative conseqeunces
        biomarker.color = 'red';
        biomarker.errorMessage = `The value must be between ${biomarker.selectedUnit.minimum} and ${biomarker.selectedUnit.maximum}`;
        biomarker.isValid = false;
      } else {
        //positive consequences
        biomarker.color = '';
        biomarker.errorMessage = '';
        biomarker.isValid = true;
      }
    });

  }

  submit() {
    this.validateBiomarkers();
    if(!this.biomarkerTemplate.every(x => x.isValid)){
      return;
    }
    this.scoreResponseReceived = false;
    const request: ScoringRequestWithPatientData = {} as ScoringRequestWithPatientData;
    this.biomarkerTemplate.forEach(marker => {
      const prop = request[marker.id as keyof ScoringRequest] = {} as ScoringRequestValue;
      prop.value = marker.value;
      prop.unitType = marker.selectedUnit.unitType + '';
    });
    if(!this.patient.dateOfBirth ||!this.patient.lastname ||!this.patient.firstname){

      return;
    }
    request.Firstname = this.patient.firstname;
    request.Lastname = this.patient.lastname;
    request.DateOfBirth = this.patient.dateOfBirth;
    request.clinical_setting = {value: 0, unitType: ""};

    this.biomarkerService.sendRequest(request).subscribe(resp => {
      this.scoreResponse = resp;
      this.scoreResponseReceived = true;
    });
  }

  submitButtonDisabled(): boolean {
    const result = this.biomarkerTemplate.every(x => x.value != null);
    return !result;
  }
}

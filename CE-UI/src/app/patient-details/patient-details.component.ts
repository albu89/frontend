import { Component } from '@angular/core';
import { Biomarker} from '../shared/biomarker';
import { BiomarkerService } from '../service/biomarker.service';
import { ScoringRequest, ScoringRequestValue } from '../shared/ScoringRequest';
import { ScoringResponse } from '../shared/ScoringResponse';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
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
  
  getUniqueCategories() : string[] {
    const categories : string[] = [];
    this.biomarkerTemplate.forEach(dataset => {
      if(!categories.includes(dataset.category)) {
        categories.push(dataset.category);
      }
    });
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
    const request: ScoringRequest = {} as ScoringRequest;
    this.biomarkerTemplate.forEach(marker => {
      const prop = request[marker.id as keyof ScoringRequest] = {} as ScoringRequestValue;
      prop.value = marker.value;
      prop.unitType = marker.selectedUnit.unitType + '';
    });
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

import { Component } from '@angular/core';
import { Biomarker, validateEntry } from '../shared/biomarker';
import { BiomarkerService } from '../service/biomarker.service';
import { ScoringRequest, ScoringRequestValue, ScoringRequestWithPatientData } from '../shared/ScoringRequest';
import { ScoringResponse } from '../shared/ScoringResponse';
import { Patient } from '../shared/patient';
import { SchemasService } from '../service/schemas.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PatientRecordService } from '../service/patient-record.service';
import { BiomarkersInfo } from '../shared/biomarkersInfo';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent {
  patientData = { name: '', lastName: '', dateOfBirth: '', requestId: '' };
  canEditPatientData = true;

  constructor(private router: Router, private biomarkerService: BiomarkerService, private schemaService: SchemasService, private patientRecordService: PatientRecordService, private location: Location, private languageService: LanguageService) { }

  ngOnInit() {
    this.languageService.getLanguageObservable().subscribe(
      {
        next: (value) =>
          this.schemaService.getBiomarkers().subscribe(template => {
            template.forEach(biomarker => {
              biomarker.isValid = true;
            });
            const isInitialLoad = !!this.biomarkerTemplate && this.biomarkerTemplate.length === 0;

            this.biomarkerTemplate = this.biomarkerTemplate.length === 0 ? template : this.biomarkerTemplate;
            this.uniqueCategories = this.uniqueCategories.length === 0 ? this.getUniqueCategories() : this.uniqueCategories;
            if (this.router.url.includes('edit')) {
              this.loadData();
              this.canEditPatientData = !(this.patientData && this.patientData.name && this.patientData.lastName && this.patientData.dateOfBirth && this.patientData.requestId);
            }
            if (!isInitialLoad) {
              this.biomarkerTemplate.forEach(marker => {
                const templateMarker = template.find(t => t.id === marker.id)
                if (!templateMarker)
                  return;
                marker.fieldname = templateMarker.fieldname;
                marker.infoText = templateMarker.infoText;
                marker.units = templateMarker.units;
                marker.selectedUnit = templateMarker.units.find(u => u.id === marker.selectedUnit?.id) ?? templateMarker.units[0];
              });
              this.validateBiomarkers();
            }
          })
      }
    )
  }

  loadData() {
    this.patientData = this.location.getState() as { name: string; lastName: string; dateOfBirth: string; requestId: string };
    this.patientRecordService.getSpecificRecordById(this.patientData.name as string, this.patientData.lastName as string, this.patientData.dateOfBirth as string, this.patientData.requestId)
      .subscribe((record) => {
        for (const biomarker of this.biomarkerTemplate) {
          const id = biomarker.id;
          const cleanId = id.replace(/_/g, "");
          const newValue = record.biomarkers[cleanId as keyof BiomarkersInfo] as string | number | boolean;
          const resUnit = record.biomarkers[`${cleanId}Unit` as keyof BiomarkersInfo]
          const [marker] = this.biomarkerTemplate.filter(b => b.id === id);
          let [unit] = marker.units.filter(unit => unit.unitType === resUnit);
          unit = unit === undefined ? marker.units[0] : unit;
          biomarker.value = newValue;
          biomarker.selectedUnit = unit;
        }
        this.patient.dateOfBirth = new Date(this.patientData.dateOfBirth);
        this.patient.firstname = this.patientData.name;
        this.patient.lastname = this.patientData.lastName;
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
      validateEntry(biomarker, this.languageService);
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

    if(!this.patientData.requestId) {
      this.biomarkerService.sendRequest(request).subscribe(async resp => {
        this.scoreResponse = resp;
        this.scoreResponseReceived = true;
      });
    } else {
      this.biomarkerService.editRequest(request, this.patientData.requestId).subscribe(async resp => {
        this.scoreResponse = resp;
        this.scoreResponseReceived = true;
      });
    }

    this.calculationSubmitted = true;
  }

  submitButtonDisabled(): boolean {
    return this.calculationSubmitted;
  }
}
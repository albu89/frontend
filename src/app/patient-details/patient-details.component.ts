import { Component, OnInit } from '@angular/core';
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
  selector: 'ce-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  public scoreResponse?: ScoringResponse;
  //TODO needs improvement
  //eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  public patient: Patient = {} as Patient;
  public calculationSubmitted = false;

  public canEditPatientData = true;
  public biomarkerTemplate: Biomarker[] = [];

  private patientData = { name: '', lastName: '', dateOfBirth: '', requestId: '' };

  public constructor(
    private readonly router: Router,
    private readonly biomarkerService: BiomarkerService,
    private readonly schemaService: SchemasService,
    private readonly patientRecordService: PatientRecordService,
    private readonly location: Location,
    private readonly languageService: LanguageService
  ) {}

  public ngOnInit() {
    this.languageService.getLanguageObservable().subscribe(() =>
      this.schemaService.getBiomarkers().subscribe(template => {
        template.forEach(biomarker => {
          biomarker.isValid = true;
        });
        const isInitialLoad = !!this.biomarkerTemplate && this.biomarkerTemplate.length === 0;

        this.biomarkerTemplate = this.biomarkerTemplate.length === 0 ? template : this.biomarkerTemplate;
        if (this.router.url.includes('edit')) {
          this.loadData();
          this.canEditPatientData = !(
            this.patientData &&
            this.patientData.name &&
            this.patientData.lastName &&
            this.patientData.dateOfBirth &&
            this.patientData.requestId
          );
        }
        if (!isInitialLoad) {
          this.biomarkerTemplate.forEach(marker => {
            const templateMarker = template.find(t => t.id === marker.id);
            if (!templateMarker) return;
            marker.fieldname = templateMarker.fieldname;
            marker.infoText = templateMarker.infoText;
            marker.units = templateMarker.units;
            marker.selectedUnit =
              templateMarker.units.find(u => u.id === marker.selectedUnit?.id) ?? templateMarker.units[0];
          });
          this.validateBiomarkers();
        }
      })
    );
  }

  public submit() {
    this.validateBiomarkers();
    if (!this.biomarkerTemplate.every(x => x.isValid)) {
      return;
    }
    // TODO: Please properly handle form validation and remove all those boolean flags that can be avoided with proper events handling. Check with Xavier if needed.
    this.calculationSubmitted = false;
    // TODO type casting - needs improvement
    //eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const request: ScoringRequestWithPatientData = {} as ScoringRequestWithPatientData;
    this.biomarkerTemplate.forEach(marker => {
      const prop: ScoringRequestValue = request[marker.id as keyof ScoringRequest];
      prop.value = marker.value;
      prop.unitType = marker.selectedUnit?.unitType + '';
    });
    if (!this.patient.dateOfBirth || !this.patient.lastname || !this.patient.firstname) {
      return;
    }
    request.Firstname = this.patient.firstname;
    request.Lastname = this.patient.lastname;
    request.DateOfBirth = this.patient.dateOfBirth;
    request.clinicalSetting = { value: 0, unitType: '' };

    if (!this.patientData.requestId) {
      this.biomarkerService.sendRequest(request).subscribe(async resp => {
        this.scoreResponse = resp;
      });
    } else {
      this.biomarkerService.editRequest(request, this.patientData.requestId).subscribe(async resp => {
        this.scoreResponse = resp;
      });
    }

    this.calculationSubmitted = true;
  }

  private loadData() {
    this.patientData = this.location.getState() as {
      name: string;
      lastName: string;
      dateOfBirth: string;
      requestId: string;
    };
    this.patientRecordService
      .getSpecificRecordById(
        this.patientData.name as string,
        this.patientData.lastName as string,
        this.patientData.dateOfBirth as string,
        this.patientData.requestId
      )
      .subscribe(record => {
        for (const biomarker of this.biomarkerTemplate) {
          const id = biomarker.id;
          const cleanId = id.replace(/_/g, '');
          const newValue = record.biomarkers[cleanId as keyof BiomarkersInfo] as string | number | boolean;
          const resUnit = record.biomarkers[`${cleanId}Unit` as keyof BiomarkersInfo];
          const [marker] = this.biomarkerTemplate.filter(b => b.id === id);
          let [unit] = marker.units.filter(bUnit => bUnit.unitType === resUnit);
          unit = unit === undefined ? marker.units[0] : unit;
          biomarker.value = newValue;
          biomarker.selectedUnit = unit;
        }
        this.patient.dateOfBirth = new Date(this.patientData.dateOfBirth);
        this.patient.firstname = this.patientData.name;
        this.patient.lastname = this.patientData.lastName;
      });
  }

  private validateBiomarkers() {
    this.biomarkerTemplate.forEach(biomarker => {
      validateEntry(biomarker, this.languageService);
    });
  }
}

import { Component, Input } from '@angular/core';
import { ScoringResponse } from '../shared/ScoringResponse';
import { SchemasService } from '../service/schemas.service';
import { RecommendationCategory, ScoringResponseSchema } from '../shared/ScoringResponseSchema';
import { BiomarkersInfo } from '../shared/biomarkersInfo';
import { Biomarker, BiomarkerUnit } from '../shared/biomarker';
import { MockedScoringResponse } from '../shared/Mock/MockedScoringResponse';
import {LanguageService} from "../service/language.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {

  @Input() score: ScoringResponse = new MockedScoringResponse;
  @Input() firstname = '';
  @Input() lastname = '';
  @Input() birthdate = new Date;
  schema: ScoringResponseSchema = {} as ScoringResponseSchema;
  abbreviationKeys: string[] = [];

  anamnesisMarkers: Biomarker[] = [];
  medicationMarkers: Biomarker[] = [];
  valueMarkers: Biomarker[] = [];

  relevantRecommendationCategories: RecommendationCategory[] = [];

  constructor(private schemaService: SchemasService, private router: Router, private languageService:LanguageService ) {
  }

  ngOnInit() {
    this.schemaService.getResponseSchema().subscribe({
      next: response => {
        this.schema = response;
        this.abbreviationKeys = Object.keys(this.schema.abbreviations);
        this.anamnesisMarkers = this.schema.biomarkers.filter(x => x.category === 'Anamnesis');
        this.medicationMarkers = this.schema.biomarkers.filter(x => x.category === 'Medication' || x.category === 'Clinical findings');
        this.valueMarkers = this.schema.biomarkers.filter(x => x.category !== 'Anamnesis' && x.category !== 'Medication' && x.category !== 'Clinical findings');
        this.relevantRecommendationCategories = this.schema.recommendationCategories.filter(x => x.prevalence === this.score.prevalence);
      },
      error: error => {
        console.log(error);
      }
    }
    )
    this.languageService.getLanguageObservable().subscribe({
      next: value => {
        this.schemaService.getResponseSchema().subscribe(
          (response) => {
            this.schema = response;
            this.abbreviationKeys = Object.keys(this.schema.abbreviations);
            this.anamnesisMarkers = this.schema.biomarkers.filter(x => x.category === 'Anamnesis');
            this.medicationMarkers = this.schema.biomarkers.filter(x => x.category === 'Medication' || x.category === 'Clinical findings');
            this.valueMarkers = this.schema.biomarkers.filter(x => x.category === 'Enzymes' || x.category === 'Blood Sugar' || x.category === 'Metabolite' || x.category === 'Lipids' || x.category === 'Protein' || x.category === '');
            this.relevantRecommendationCategories = this.schema.recommendationCategories.filter(x => x.prevalence === this.score.prevalence);
          },
          (error) => {
            console.log(error);
          }
        )
      }
    })
  }

  editScore() {
    this.router.navigateByUrl('/score/edit', {state: {name: this.firstname, lastName: this.lastname, dateOfBirth: this.birthdate.toDateString(), requestId: this.score.requestId }});
  }

  getBiomarkerValue(id: string): number | Date | string | boolean {
    const idClean = id.replace(/_/g, "");
    let val = this.score.biomarkers[idClean as keyof BiomarkersInfo];
    const unit = this.getBiomarkerUnit(id);
    const displayNames = unit?.displayNames;
    const hasDisplayNames = (displayNames !== undefined && displayNames !== null);
    const stringValue = val as string;
    const found = hasDisplayNames ? Object.entries(displayNames).find(x => x[0].toUpperCase() === stringValue.toUpperCase()) : undefined;
    const displayVal = found?.[1];
    val = hasDisplayNames ? displayVal : val;
    return val;
  }

  getBiomarkerUnit(id: string): BiomarkerUnit | undefined {
    const idClean = id.replace(/_/g, "");
    let resUnit = this.score.biomarkers[`${idClean}Unit` as keyof BiomarkersInfo]
    resUnit = resUnit ?? 'SI';
    const marker = this.schema.biomarkers.find(b => b.id === id);
    let unit = marker?.units?.find(unit => unit.unitType === resUnit);
    unit = unit ?? marker?.units[0];
    return unit ?? undefined;
  }

  tableHidden = true;

  toggleTable() {
    this.tableHidden = !this.tableHidden;
  }

}

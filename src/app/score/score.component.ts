import { Component, Input } from '@angular/core';
import { ScoringResponse } from '../shared/ScoringResponse';
import { SchemasService } from '../service/schemas.service';
import { RecommendationCategory, ScoringResponseSchema } from '../shared/ScoringResponseSchema';
import { BiomarkersInfo } from '../shared/biomarkersInfo';
import { Biomarker } from '../shared/biomarker';
import { MockedScoringResponse } from '../shared/Mock/MockedScoringResponse';
import {LanguageService} from "../service/language.service";

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

  constructor(private schemaService: SchemasService, private languageService:LanguageService ) {
  }

  ngOnInit() {
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

  getBiomarkerValue(id: string): number | Date | string | boolean {
    id = id.replace(/_/g, "");
    return this.score.biomarkers[id as keyof BiomarkersInfo];
  }

  getBiomarkerUnit(id: string): string {
    const idClean = id.replace(/_/g, "");
    const resUnit = this.score.biomarkers[`${idClean}Unit` as keyof BiomarkersInfo]
    const [marker] = this.schema.biomarkers.filter(b => b.id === id);
    const [unit] =  marker.units.filter(unit => unit.unitType === resUnit);
    return unit?.name;
  }

  tableHidden = true;

  toggleTable() {
    this.tableHidden = !this.tableHidden;
  }

}

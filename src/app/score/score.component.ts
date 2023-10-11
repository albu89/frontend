import { Component, Input, OnInit } from '@angular/core';
import { ScoringResponse } from '../shared/ScoringResponse';
import { SchemasService } from '../service/schemas.service';
import { RecommendationCategory, ScoringResponseSchema } from '../shared/ScoringResponseSchema';
import { BiomarkersInfo } from '../shared/biomarkersInfo';
import { Biomarker, BiomarkerUnit } from '../shared/biomarker';
import { MockedScoringResponse } from '../shared/Mock/MockedScoringResponse';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'ce-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  @Input() public score: ScoringResponse = new MockedScoringResponse();
  @Input() public firstname = '';
  @Input() public lastname = '';
  @Input() public birthdate = new Date();
  public schema?: ScoringResponseSchema;
  public abbreviationKeys: string[] = [];

  public anamnesisMarkers: Biomarker[] = [];
  public medicationMarkers: Biomarker[] = [];
  public valueMarkers: Biomarker[] = [];
  public tableHidden = true;

  public relevantRecommendationCategories: RecommendationCategory[] = [];

  public constructor(
    private readonly schemaService: SchemasService,
    private readonly languageService: LanguageService
  ) {}

  public ngOnInit() {
    this.schemaService.getResponseSchema().subscribe({
      next: response => {
        this.schema = response;
        this.abbreviationKeys = Object.keys(this.schema.abbreviations);
        this.anamnesisMarkers = this.schema.biomarkers.filter(x => x.category === 'Anamnesis');
        this.medicationMarkers = this.schema.biomarkers.filter(
          x => x.category === 'Medication' || x.category === 'Clinical findings'
        );
        this.valueMarkers = this.schema.biomarkers.filter(
          x => x.category !== 'Anamnesis' && x.category !== 'Medication' && x.category !== 'Clinical findings'
        );
        this.relevantRecommendationCategories = this.schema.recommendationCategories.filter(
          x => x.prevalence === this.score.prevalence
        );
      },
      error: error => {
        //eslint-disable-next-line no-console
        console.log(error);
      },
    });
    this.languageService.getLanguageObservable().subscribe(() => {
      this.schemaService.getResponseSchema().subscribe(
        // TODO: Ouch, a `subscribe` in a `subscribe`? Recipe for disaster.
        response => {
          this.schema = response;
          this.abbreviationKeys = Object.keys(this.schema.abbreviations);
          this.anamnesisMarkers = this.schema.biomarkers.filter(x => x.category === 'Anamnesis');
          this.medicationMarkers = this.schema.biomarkers.filter(
            x => x.category === 'Medication' || x.category === 'Clinical findings'
          );
          this.valueMarkers = this.schema.biomarkers.filter(
            x =>
              x.category === 'Enzymes' ||
              x.category === 'Blood Sugar' ||
              x.category === 'Metabolite' ||
              x.category === 'Lipids' ||
              x.category === 'Protein' ||
              x.category === ''
          );
          this.relevantRecommendationCategories = this.schema.recommendationCategories.filter(
            x => x.prevalence === this.score.prevalence
          );
        },
        error => {
          //eslint-disable-next-line no-console
          console.log(error);
        }
      );
    });
  }

  public getBiomarkerValue(id: string): number | Date | string | boolean {
    const idClean = id.replace(/_/g, '');
    let val = this.score.biomarkers[idClean as keyof BiomarkersInfo];
    const unit = this.getBiomarkerUnit(id);
    const displayNames = unit?.displayNames;
    const hasDisplayNames = displayNames !== undefined && displayNames !== null;
    const stringValue = val as string;
    const found = hasDisplayNames
      ? Object.entries(displayNames).find(x => x[0].toUpperCase() === stringValue.toUpperCase())
      : undefined;
    const displayVal = found?.[1];
    val = hasDisplayNames ? displayVal : val;
    return val;
  }

  public getBiomarkerUnit(id: string): BiomarkerUnit | undefined {
    const idClean = id.replace(/_/g, '');
    let resUnit = this.score.biomarkers[`${idClean}Unit` as keyof BiomarkersInfo];
    resUnit = resUnit ?? 'SI';
    const marker = this.schema?.biomarkers.find(b => b.id === id);
    let unit = marker?.units?.find(bUnit => bUnit.unitType === resUnit);
    unit = unit ?? marker?.units[0];
    return unit ?? undefined;
  }

  public toggleTable() {
    this.tableHidden = !this.tableHidden;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { BiomarkerInfoComponent } from '@features/score-details/biomarker-info/biomarker-info.component';
import { FootnoteComponent } from '@features/score-details/footnote/footnote.component';
import { RecommendationTableComponent } from '@features/score-details/recommendation-table/recommendation-table.component';
import { RiskScoreComponent } from '@features/score-details/risk-score/risk-score.component';
import { WarningComponent } from '@features/score-details/warning/warning.component';
import { BiomarkerUnit } from '@models/biomarker/biomarker-unit.model';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { BiomarkersInfo } from '@models/biomarker/biomarkers-info.model';
import { RecommendationCategory } from '@models/scoring/scoring-recommendation-category.model';
import { ScoringResponseSchema } from '@models/scoring/scoring-response-schema.model';
import { ScoringResponse } from '@models/scoring/scoring-response.model';
import { LanguageService } from '@services/language.service';
import { SchemasService } from '@services/schemas.service';
import { SharedModule } from '@shared/shared.module';
import { ScoringResponseMock } from '../../tests/mocks/scoring-response.mock';
import { PageLinks } from '@core/enums/page-links.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ce-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  imports: [
    RiskScoreComponent,
    RecommendationTableComponent,
    FootnoteComponent,
    BiomarkerInfoComponent,
    SharedModule,
    WarningComponent,
    RouterLink,
  ],
  standalone: true,
})
export class ScoreComponent implements OnInit {
  @Input() public score: ScoringResponse = new ScoringResponseMock();
  @Input() public firstname = '';
  @Input() public lastname = '';
  @Input() public birthdate = new Date();
  public schema: ScoringResponseSchema | undefined;
  public abbreviationKeys: string[] = [];

  public anamnesisMarkers: Biomarker[] = [];
  public medicationMarkers: Biomarker[] = [];
  public valueMarkers: Biomarker[] = [];
  public tableHidden = true;

  public relevantRecommendationCategories: RecommendationCategory[] = [];

  protected readonly PageLinks = PageLinks;

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

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BiomarkerInfoComponent } from '@features/score-details/biomarker-info/biomarker-info.component';
import { FootnoteComponent } from '@features/score-details/footnote/footnote.component';
import { RecommendationTableComponent } from '@features/score-details/recommendation-table/recommendation-table.component';
import { RiskScoreComponent } from '@features/score-details/risk-score/risk-score.component';
import { WarningComponent } from '@features/score-details/warning/warning.component';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { RecommendationCategory } from '@models/scoring/scoring-recommendation-category.model';
import { ScoringResponseSchema } from '@models/scoring/scoring-response-schema.model';
import { SharedModule } from '@shared/shared.module';
import { PageLinks } from '@core/enums/page-links.enum';
import { RouterLink } from '@angular/router';
import { ScoringResponse } from '@models/scoring/scoring-response.model';
import { ScoringResponseMock } from '../../tests/mocks/scoring-response.mock';
import { SchemasService } from '@services/schemas.service';
import { MedicalHistoryItem } from '@models/biomarker/medical-history/medicalHistory.model';
import { LabResultItem } from '@models/biomarker/lab-results/lab-result.model';
import { MedicalHistoryItemUnit } from '@models/biomarker/medical-history/medical-history-item-unit.model';
import { LabResultUnit } from '@models/biomarker/lab-results/lab-result-units.model';
import { BiomarkersInfoValue } from '@models/biomarker/biomarkers-info-values.model';
import { BiomarkerUnitType } from '@core/enums/biomarker-unit-type.enum';
import { MedicalHistoryCategoryIds } from '@core/enums/biomarker-medicalhistory-categories.enum';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { LanguageService } from '@services/language.service';
import { MessageService } from '@services/message.service';

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
    TooltipComponent,
  ],
  standalone: true,
})
export class ScoreComponent implements OnInit, OnDestroy {
  @Input() public score: ScoringResponse = ScoringResponseMock;
  @Input() public firstname?: string;
  @Input() public lastname?: string;
  @Input() public birthdate?: Date | null;
  @Input() public biomarker!: Biomarker;
  public schema: ScoringResponseSchema | undefined = {} as ScoringResponseSchema;
  public abbreviationKeys: string[] = [];

  public anamnesisMarkers: MedicalHistoryItem[] = [];
  public medicationMarkers: MedicalHistoryItem[] = [];
  public valueMarkers: LabResultItem[] = [];
  public tableHidden = true;

  public relevantRecommendationCategories: RecommendationCategory[] = [];

  protected readonly PageLinks = PageLinks;
  private destroy$ = new Subject<void>();

  //TODO: create Store

  public constructor(
    private readonly schemaService: SchemasService,
    private readonly messageService: MessageService,
    private readonly languageService: LanguageService
  ) {}
  public ngOnInit() {
    this.getSchema();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getBiomarkersInfoById(id: string): BiomarkersInfoValue | undefined {
    return this.score.biomarkers.values.find(marker => marker.id === id);
  }

  public getMedBiomarkerUnit(id: string): MedicalHistoryItemUnit | undefined {
    const marker = this.schema?.biomarkers.medicalHistory.find(b => b.id === id);
    const unit = marker?.unit;
    return unit ?? undefined;
  }
  public getLabBiomarkerUnit(id: string): LabResultUnit | undefined {
    let resUnit = this.getBiomarkersInfoById(id)?.unit;
    resUnit = resUnit ?? BiomarkerUnitType.SI;
    const marker = this.schema?.biomarkers.labResults.find(b => b.id === id);
    const unit = marker?.units?.find(bUnit => bUnit.unitType === resUnit);
    return unit ?? marker?.units[0] ?? undefined;
  }

  public toggleTable() {
    this.tableHidden = !this.tableHidden;
  }

  private getSchema(): void {
    this.languageService
      .getLanguageObservable()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.schemaService.getResponseSchema())
      )
      .subscribe({
        next: response => {
          this.schema = response;
          this.abbreviationKeys = Object.keys(this.schema.abbreviations);
          this.anamnesisMarkers = this.schema.biomarkers.medicalHistory.filter(
            x => x.categoryId === MedicalHistoryCategoryIds.anamnesis
          );
          this.medicationMarkers = this.schema.biomarkers.medicalHistory.filter(
            x =>
              x.categoryId === MedicalHistoryCategoryIds.medication ||
              x.categoryId === MedicalHistoryCategoryIds.clinicalfindings
          );
          this.valueMarkers = this.schema.biomarkers.labResults;
          this.relevantRecommendationCategories = this.schema.recommendationCategories.filter(
            x => x.prevalence === this.score.prevalence
          );
        },
        error: error => this.messageService.showLoadResponseSchemaHttpError(error),
      });
  }
}

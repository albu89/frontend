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
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { LanguageService } from '@services/language.service';
import { MessageService } from '@services/message.service';
import { PatientDataFormComponent } from '@features/patient-details/edit-form/form.component';
import { Patient } from '@models/patient/patient.model';
import { FormMode } from '@features/patient-details/_models/form-mode';
import { PatientDetailsStore } from '@features/patient-details/_store/patient-details.store';

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
    PatientDataFormComponent,
  ],
  providers: [PatientDetailsStore],
  standalone: true,
})
export class ScoreComponent implements OnInit, OnDestroy {
  @Input() public score: ScoringResponse = ScoringResponseMock;
  @Input() public firstname = '';
  @Input() public lastname = '';
  @Input() public birthdate: Date | null = null;
  @Input() public biomarker!: Biomarker;
  public schema: ScoringResponseSchema | undefined = {} as ScoringResponseSchema;
  public abbreviationKeys: string[] = [];

  public tableHidden = true;

  public relevantRecommendationCategories: RecommendationCategory[] = [];

  protected readonly PageLinks = PageLinks;
  protected readonly FormMode = FormMode;
  private destroy$ = new Subject<void>();

  //TODO: create Store

  public constructor(
    private readonly schemaService: SchemasService,
    private readonly messageService: MessageService,
    private readonly languageService: LanguageService,
    private readonly store: PatientDetailsStore
  ) {}

  public get patient(): Patient {
    return { firstname: this.firstname, lastname: this.lastname, dateOfBirth: this.birthdate, requestId: '' };
  }
  public ngOnInit() {
    this.store.setFormMode(FormMode.readonly);
    this.store.loadBiomarkerSchema();
    this.getSchema();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
          this.relevantRecommendationCategories = this.schema.recommendationCategories.filter(
            x => x.prevalence === this.score.prevalence
          );
        },
        error: error => this.messageService.showLoadResponseSchemaHttpError(error),
      });
  }
}

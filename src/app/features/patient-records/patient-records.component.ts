import { Component, OnDestroy, OnInit } from '@angular/core';
import { PatientRecordsSearchParameter } from '@features/patient-records/_models/patient-records-search.model';
import { PatientRecordsStore } from '@features/patient-records/_store/patient-records.store';
import { PatientRecordsListComponent } from '@features/patient-records/list/list.component';
import { RiskLabelComponent } from '@features/patient-records/risk-label/risk-label.component';
import { ScoreComponent } from '@features/score-details/score.component';
import { NavigationSkipped, Router, RouterLink } from '@angular/router';
import { PatientRecord } from '@models/patient/patient-record.model';
import { SharedModule } from '@shared/shared.module';
import { filter, tap, takeUntil, Subject, Observable } from 'rxjs';
import { PageLinks } from '@core/enums/page-links.enum';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';

@Component({
  selector: 'ce-patient-record',
  templateUrl: './patient-records.component.html',
  styleUrls: ['./patient-records.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SharedModule,
    ScoreComponent,
    RiskLabelComponent,
    RouterLink,
    PatientRecordsListComponent,
    LoadingIndicatorComponent,
  ],
  providers: [PatientRecordsStore],
})
export class PatientRecordsComponent implements OnInit, OnDestroy {
  protected isLoading$ = this.store.isLoading$;
  protected showDetailsButton$ = this.store.showDetailsButton$;
  protected currentScore$ = this.store.currentScore$;
  protected searchParameters$ = this.store.searchParameters$;
  protected patientRecords$: Observable<PatientRecord[] | undefined> = this.store.patientRecords$;

  protected readonly PageLinks = PageLinks;

  private destroy$ = new Subject<void>();

  public constructor(
    private readonly store: PatientRecordsStore,
    private readonly router: Router
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit() {
    this.store.loadPatientRecords();
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(event => event instanceof NavigationSkipped),
        tap(() => this.store.setDefaultValues())
      )
      .subscribe();
  }

  public getSpecificRecords(patientName: string, patientLastName: string, patientBirthdate: Date | null) {
    const searchParameter: PatientRecordsSearchParameter = {
      patientLastName,
      patientBirthdate: patientBirthdate,
      patientName,
    };

    this.store.setSearchParameters(searchParameter);

    if (this.areSearchParameterValid(searchParameter)) {
      this.store.loadSpecificPatientRecords(searchParameter);
    } else {
      this.store.loadPatientRecords();
    }
  }

  public editSpecificScore(requestId: string, searchParameter: PatientRecordsSearchParameter) {
    if (this.areSearchParameterValid(searchParameter)) {
      this.router.navigateByUrl(PageLinks.EDIT_SCORE, {
        state: {
          patientName: searchParameter.patientName,
          patientLastName: searchParameter.patientLastName,
          patientBirthdate: searchParameter.patientBirthdate?.toDateString(),
          requestId: requestId,
        },
      });
    }
  }

  public openSpecificScore(requestId: string, searchParameter: PatientRecordsSearchParameter) {
    if (this.areSearchParameterValid(searchParameter)) {
      this.store.loadSpecificScore({
        requestId,
        patientName: searchParameter.patientName!,
        patientLastName: searchParameter.patientLastName!,
        patientBirthdate: searchParameter.patientBirthdate!.toDateString(),
      });
    }
  }

  public areSearchParameterValid(searchParameters: PatientRecordsSearchParameter) {
    if (searchParameters.patientName && searchParameters.patientBirthdate && searchParameters.patientName) {
      return true;
    } else {
      return false;
    }
  }
}

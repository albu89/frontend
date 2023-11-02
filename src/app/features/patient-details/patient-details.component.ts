import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PatientDataFormComponent } from '@features/patient-details/edit-form/form.component';
import { ScoreComponent } from '@features/score-details/score.component';
import { SharedModule } from '@shared/shared.module';
import { PatientDetailsStore } from '@features/patient-details/_store/patient-details.store';
import { Router } from '@angular/router';
import { ScoreRequest } from '@models/requests/score-request.model';
import { Location } from '@angular/common';

@Component({
  selector: 'ce-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
  imports: [SharedModule, PatientDataFormComponent, ScoreComponent],
  standalone: true,
  providers: [PatientDetailsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDetailsComponent implements OnInit {
  // protected isLoading$ = this.store.isLoading$;
  protected currentScore$ = this.store.currentScore$;
  protected patient$ = this.store.patient$;
  // protected calculationSubmitted$ = this.store.calculationSubmitted$;
  protected canEditPatientData$ = this.store.canEditPatientData$;
  protected biomarkerTemplate$ = this.store.biomarkerWithData$;

  public constructor(
    private readonly store: PatientDetailsStore,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  public ngOnInit() {
    this.store.loadBiomarkerSchema();
    if (this.router.url.includes('edit')) {
      const patientData: ScoreRequest = this.location.getState() as ScoreRequest;
      this.store.loadPatientDetails(patientData);
    }
  }

  public submit() {
    //eslint-disable-next-line no-console
    console.warn('NOT IMPLEMENTED YET');
  }
}

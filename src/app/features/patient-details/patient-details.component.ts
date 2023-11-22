import { Component, OnInit } from '@angular/core';
import { PatientDataFormComponent } from '@features/patient-details/edit-form/form.component';
import { ScoreComponent } from '@features/score-details/score.component';
import { SharedModule } from '@shared/shared.module';
import { Router } from '@angular/router';
import { ScoreRequest } from '@models/requests/score-request.model';
import { Location } from '@angular/common';
import { PageLinks } from '@core/enums/page-links.enum';
import { FormMode } from '@features/patient-details/_models/form-mode';
import { PatientDetailsStore } from '@features/patient-details/_store/patient-details.store';

@Component({
  selector: 'ce-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
  imports: [SharedModule, PatientDataFormComponent, ScoreComponent],
  standalone: true,
  providers: [PatientDetailsStore],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDetailsComponent implements OnInit {
  // protected isLoading$ = this.store.isLoading$;
  protected currentScore$ = this.store.currentScore$;
  protected patient$ = this.store.patient$;
  protected biomarkerTemplate$ = this.store.biomarkerTemplate$;
  protected patientData$ = this.store.patientData$;
  protected formMode$ = this.store.formMode$;

  protected readonly FormMode = FormMode;

  public constructor(
    private readonly store: PatientDetailsStore,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  public ngOnInit() {
    this.store.loadBiomarkerSchema();
    //TODO: check if backnavigation works like before ... (currently patient edit page will open again)
    if (this.router.url.includes(PageLinks.EDIT_SCORE)) {
      const patientData: ScoreRequest = this.location.getState() as ScoreRequest;
      this.store.loadPatientDetails(patientData);
      this.store.setFormMode(FormMode.edit);
    } else {
      this.store.setFormMode(FormMode.add);
    }
  }
}

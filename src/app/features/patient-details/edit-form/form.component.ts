import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CategoryComponent } from '@features/patient-details/category/category.component';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { SharedModule } from '@shared/shared.module';
import { initFlowbite } from 'flowbite';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BiomarkerFormModel, FormModel } from '@features/patient-details/_models/form.model';
import { hasFormError, isFormFieldInvalid } from '@shared/utils/form-utils';
import { Patient } from '@models/patient/patient.model';
import { FormMode } from '@features/patient-details/_models/form-mode';
import { BiomarkerUnitType } from '@core/enums/biomarker-unit-type.enum';
import { ScoringResponse } from '@models/scoring/scoring-response.model';
import { PatientDetailsStore } from '@features/patient-details/_store/patient-details.store';
import { ScoringRequestWithPatientData } from '@models/scoring/scoring-request-with-patient.model';
import { ScoringRequest } from '@models/scoring/scoring-request.model';
import { ScoringRequestValue } from '@models/scoring/scoring-request-value.model';
import { LabResultUnit } from '@models/biomarker/lab-results/lab-result-units.model';
import { MedicalHistoryItemUnit } from '@models/biomarker/medical-history/medical-history-item-unit.model';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';
import { MessageService } from '@services/message.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PageLinks } from '@core/enums/page-links.enum';

@Component({
  selector: 'ce-patient-data-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [SharedModule, CategoryComponent, TooltipComponent, LoadingIndicatorComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDataFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() public biomarkers!: Biomarker;
  @Input() public patient!: Patient;
  @Input() public formMode!: FormMode;
  @Input() public data: ScoringResponse | undefined;

  public formGroup = this.formBuilder.group<FormModel>({
    firstname: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(256)]),
    lastname: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(256)]),
    birthdate: this.formBuilder.control(null, [Validators.required]),
    preferredUnitType: this.formBuilder.control(null),
    biomarkerValues: undefined,
  });

  protected readonly FormMode = FormMode;
  protected isLoading$ = this.store.isLoading$;

  private subscription: Subscription | undefined;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: PatientDetailsStore,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  public ngOnInit() {
    this.store.patient$.subscribe(i => {
      return i && this.patient.requestId !== i?.requestId && this.router.url.includes('/new')
        ? this.router.navigateByUrl(PageLinks.EDIT_SCORE, {
            state: {
              patientName: i.firstname,
              patientLastName: i.lastname,
              patientBirthdate: i.dateOfBirth?.toDateString(),
              requestId: i.requestId,
            },
          })
        : i;
    });
  }

  public ngAfterViewInit() {
    initFlowbite();
  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['patient'] || changes['biomarkers']) {
      this.initForm();
      this.trackChanges();
    }
  }

  public saveDraft(): void {
    this.markPatientControlsAsTouched();
    if (this.patientControlsHaveErrors()) this.messageService.showDraftSavingControlValuesRequiredInfo();

    this.formGroup.controls.biomarkerValues?.controls.forEach(fg => {
      const control = fg.get('value');
      control?.setValidators(null);
      control?.updateValueAndValidity();
      return control;
    });
    if (this.formGroup.invalid) return;

    const request = this.assembleRequest();

    if (this.formMode === FormMode.add) {
      this.store.saveDraftScore(request);
    } else this.store.updateDraftScore(request);
  }

  public saveForm() {
    this.formGroup.controls.biomarkerValues?.controls.forEach(fg => {
      const control = fg.get('value');
      control?.setValidators([Validators.required]);
      control?.updateValueAndValidity();
      return control;
    });

    if (this.formGroup.invalid) return;

    const request = this.assembleRequest();

    if (this.formMode === FormMode.add) {
      this.store.savePatientDetails(request);
    } else {
      this.store.editPatientDetails(request);
    }
    if (this.patient.firstname) this.store.setPatient(this.patient);
    else {
      const formData = this.formGroup.getRawValue();
      this.store.setPatient({
        firstname: formData.firstname,
        lastname: formData.lastname,
        dateOfBirth: new Date(formData.birthdate!),
        requestId: '',
      });
    }
  }

  public isFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.formGroup);
  }

  public hasError(name: string, required: string) {
    return hasFormError(name, required, this.formGroup);
  }

  private patientControlsHaveErrors() {
    return (
      this.hasError('firstname', 'required') ||
      this.hasError('lastname', 'required') ||
      this.hasError('birthdate', 'required')
    );
  }

  private markPatientControlsAsTouched() {
    this.formGroup.controls.firstname.markAsTouched();
    this.formGroup.controls.lastname.markAsTouched();
    this.formGroup.controls.birthdate.markAsTouched();
    this.formGroup.updateValueAndValidity();
  }

  //map values back to booleans and numbers
  private mapValue(value: string | number | boolean | Date | null | undefined) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (!isNaN(value as number) && typeof value === 'string') return parseInt(value);
    return value;
  }

  private trackChanges() {
    this.subscription = this.formGroup.controls.biomarkerValues?.valueChanges.subscribe(formGroups => {
      formGroups.forEach(valueChangedFormGroup => {
        if (valueChangedFormGroup.value) {
          const matchingItemValue = this.biomarkers.medicalHistory.find(
            item => item.id === valueChangedFormGroup.name
          )!;
          if (!matchingItemValue) return;
          this.biomarkers.medicalHistory.forEach(item => {
            const matchingOptions = item.unit.options?.filter(o => o.sideEffectId === matchingItemValue.id);
            matchingOptions?.forEach(mo => {
              if (mo.sideEffectValue === valueChangedFormGroup.value) {
                mo.isDisabled = true;
              } else mo.isDisabled = false;
            });
          });
        }
      });
    });
  }
  private assembleRequest(): ScoringRequestWithPatientData {
    const formData = this.formGroup.getRawValue();

    const biomarkerObj: { [key: string]: ScoringRequestValue } = {};

    formData.biomarkerValues?.forEach(formGroup => {
      //get display Value from Biomarker Schema
      const displayValueMed = this.biomarkers?.medicalHistory.find(medMarker => medMarker.id === formGroup.name);
      const selectedDisplayValue = displayValueMed?.unit?.options?.find(
        o => o.value?.toString().toLowerCase() === formGroup.value
      )?.displayName;

      biomarkerObj[formGroup.name] = {
        value: this.mapValue(formGroup.value) ?? null,
        unitType: formGroup.unitType,
        displayValue: selectedDisplayValue ?? formGroup.value?.toString() ?? '',
      };
    });

    const biomarkers = biomarkerObj as unknown as ScoringRequest;

    return {
      firstName: formData.firstname,
      lastName: formData.lastname,
      dateOfBirth: new Date(formData.birthdate!),
      id: this.patient.requestId ?? '',
      ...biomarkers,
    };
  }

  private createBiomarkerForms(): void {
    const biomarkerMedForms: FormGroup<BiomarkerFormModel>[] = [];
    const biomarkerLabForms: FormGroup<BiomarkerFormModel>[] = [];
    //fixed biomarkers
    this.biomarkers?.medicalHistory.forEach(biomarker => {
      const scoringValues = this.data?.biomarkers?.values.find(data => data.id === biomarker.id);
      const formGroup = this.createBiomarkerFormGroup(biomarker.unit);
      this.patchBiomarkerValues(
        formGroup,
        biomarker.id,
        scoringValues?.unit ?? BiomarkerUnitType.SI,
        scoringValues?.value?.toString().toLowerCase() ?? ''
      );

      biomarkerMedForms.push(formGroup);
    });

    //flexible biomarkers
    this.biomarkers?.labResults.forEach(biomarker => {
      const values = this.data?.biomarkers?.values.find(data => data.id === biomarker.id);
      const currentUnit = values?.unit ?? biomarker.preferredUnit ?? BiomarkerUnitType.SI;
      const biomarkerUnit = biomarker.units.find(u => u.unitType === currentUnit);
      if (!biomarkerUnit) return;
      const formGroup = this.createBiomarkerFormGroup(biomarkerUnit);
      this.patchBiomarkerValues(formGroup, biomarker.id, currentUnit, values?.value);
      biomarkerLabForms.push(formGroup);
    });
    //check for different unit types
    this.setPreferredUnitTypeControlValue(biomarkerLabForms, this.formGroup);
    this.formGroup.setControl('biomarkerValues', this.formBuilder.array([...biomarkerLabForms, ...biomarkerMedForms]));
  }

  private createBiomarkerFormGroup(unit: LabResultUnit | MedicalHistoryItemUnit): FormGroup<BiomarkerFormModel> {
    //create empty FormGroup for Biomarkers
    const biomarkerFormGroup = this.formBuilder.group<BiomarkerFormModel>({
      name: this.formBuilder.nonNullable.control(''),
      value: this.formBuilder.control(undefined),
      unitType: this.formBuilder.nonNullable.control(BiomarkerUnitType.SI),
    });
    //set Validators
    if (unit.minimum) biomarkerFormGroup.get('value')?.setValidators([Validators.min(unit.minimum)]);
    if (unit.maximum) biomarkerFormGroup.get('value')?.setValidators([Validators.max(unit.maximum)]);

    return biomarkerFormGroup;
  }

  private setPreferredUnitTypeControlValue(
    arr: FormGroup<BiomarkerFormModel>[],
    formGroup: FormGroup<FormModel>
  ): void {
    const uniqueUnitTypes = [...new Set(arr.map(obj => obj.getRawValue().unitType))];

    let overallPreferredType = BiomarkerUnitType.Other;
    if (uniqueUnitTypes.length === 1) {
      overallPreferredType = uniqueUnitTypes[0];
    }

    formGroup.controls.preferredUnitType.patchValue(overallPreferredType);
  }

  private patchBiomarkerValues(
    formGroup: FormGroup<BiomarkerFormModel>,
    name: string,
    unitType: BiomarkerUnitType,
    value?: string | Date | null | boolean | number
  ) {
    if (!name) return;
    formGroup.patchValue({
      name,
      value,
      unitType,
    });
  }

  private initForm() {
    this.formGroup.patchValue({
      firstname: this.patient.firstname,
      lastname: this.patient.lastname,
      //TODO: is there a better solution?
      birthdate: this.patient.dateOfBirth?.toLocaleDateString('en-CA'),
    });

    // disable fields on edit-mode
    if (this.formMode === FormMode.edit) {
      this.disablePatientFormControls();
    }
    // create biomarker forms
    this.createBiomarkerForms();

    if (this.formMode === FormMode.readonly) {
      this.disablePatientFormControls();
      this.disableBiomarkerFormArrayControls();
    }
  }

  private disableBiomarkerFormArrayControls() {
    this.formGroup.controls.biomarkerValues?.controls.forEach(i => i.controls.value.disable());
  }

  private disablePatientFormControls() {
    this.formGroup.get('firstname')?.disable();
    this.formGroup.get('lastname')?.disable();
    this.formGroup.get('birthdate')?.disable();
  }
}

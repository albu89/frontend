import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabResultUnit } from '@models/biomarker/lab-results/lab-result-units.model';
import { SharedModule } from '@shared/shared.module';
import { FormGroup, Validators } from '@angular/forms';
import { BiomarkerFormModel, FormModel } from '@features/patient-details/_models/form.model';
import { LabResultItem } from '@models/biomarker/lab-results/lab-result.model';
import { hasFormError, isFormFieldInvalid } from '@shared/utils/form-utils';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { BiomarkerUnitType } from '@core/enums/biomarker-unit-type.enum';
import { PatientDetailsStore } from '@features/patient-details/_store/patient-details.store';
import { FormMode } from '@features/patient-details/_models/form-mode';

@Component({
  selector: 'ce-biomarker-lab-result',
  standalone: true,
  imports: [CommonModule, SharedModule, TooltipComponent],
  templateUrl: './lab-result.component.html',
  styleUrls: ['./lab-result.component.scss'],
})
export class LabResultComponent implements OnChanges {
  @Input() public biomarker!: LabResultItem;
  @Input() public formGroup!: FormGroup<BiomarkerFormModel>;
  @Input() public unitTypeEditable = false;
  @Input() public parentFormGroup!: FormGroup<FormModel>;

  protected currentUnit?: LabResultUnit;
  protected formMode$ = this.store.formMode$;
  protected readonly FormMode = FormMode;

  public constructor(private readonly store: PatientDetailsStore) {}
  public ngOnChanges(changes: SimpleChanges) {
    if ((changes['biomarker'] || changes['formGroup']) && this.biomarker) {
      this.setCurrentUnit();
    }
  }
  public hasError(name: string, required: string) {
    return hasFormError(name, required, this.formGroup);
  }
  public setCurrentUnit() {
    this.currentUnit = this.biomarker.units.find(i => i.unitType === this.formGroup?.getRawValue().unitType);
    const max = this.currentUnit?.maximum ?? null;
    const min = this.currentUnit?.minimum ?? null;
    if (min) this.formGroup.get('value')?.setValidators([Validators.min(min)]);
    if (max) this.formGroup.get('value')?.setValidators([Validators.max(max)]);
    this.formGroup?.updateValueAndValidity();
  }

  public setCurrentUnitAndResetValue() {
    this.formGroup.patchValue({ value: null });
    this.setCurrentUnit();
    this.parentFormGroup?.controls.preferredUnitType.patchValue(BiomarkerUnitType.Other);
  }

  public isFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.formGroup);
  }
}

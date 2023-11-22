import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabResultUnit } from '@models/biomarker/lab-results/lab-result-units.model';
import { SharedModule } from '@shared/shared.module';
import { FormGroup } from '@angular/forms';
import { BiomarkerFormModel } from '@features/patient-details/_models/form.model';
import { LabResultItem } from '@models/biomarker/lab-results/lab-result.model';
import { hasFormError, isFormFieldInvalid } from '@shared/utils/form-utils';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';

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
  public currentUnit?: LabResultUnit;

  public ngOnChanges(changes: SimpleChanges) {
    if ((changes['biomarker'] || changes['formGroup']) && this.biomarker) {
      this.setCurrentUnit();
    }
  }
  public hasError(name: string, required: string) {
    return hasFormError(name, required, this.formGroup);
  }
  public setCurrentUnit() {
    this.currentUnit = this.biomarker.units.find(i => i.unitType === this.formGroup?.getRawValue()?.unitType);
  }

  public isFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.formGroup);
  }
}

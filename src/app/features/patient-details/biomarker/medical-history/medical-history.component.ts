import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalHistoryItem } from '@models/biomarker/medical-history/medicalHistory.model';
import { SharedModule } from '@shared/shared.module';
import { FormGroup } from '@angular/forms';
import { BiomarkerFormModel } from '@features/patient-details/_models/form.model';
import { hasFormError, isFormFieldInvalid } from '@shared/utils/form-utils';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';

@Component({
  selector: 'ce-biomarker-medical-history',
  standalone: true,
  imports: [CommonModule, SharedModule, TooltipComponent, TooltipComponent],
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
})
export class MedicalHistoryComponent {
  @Input() public biomarker!: MedicalHistoryItem;
  @Input() public formGroup!: FormGroup<BiomarkerFormModel>;

  public hasError(name: string, required: string) {
    return hasFormError(name, required, this.formGroup);
  }
  public isFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.formGroup);
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalHistoryItem } from '@models/biomarker/medical-history/medicalHistory.model';
import { SharedModule } from '@shared/shared.module';
import { FormGroup } from '@angular/forms';
import { BiomarkerFormModel } from '@features/patient-details/_models/form.model';
import { isFormFieldInvalid } from '@shared/utils/form-utils';

@Component({
  selector: 'ce-biomarker-medical-history',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalHistoryComponent {
  @Input() public biomarker!: MedicalHistoryItem;
  @Input() public formGroup!: FormGroup<BiomarkerFormModel>;
  @Input() public sideEffectMarker?: MedicalHistoryItem;

  public isFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.formGroup);
  }
}

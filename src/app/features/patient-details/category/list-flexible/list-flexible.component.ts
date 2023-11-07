import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LabResultItem } from '@models/biomarker/lab-results/lab-result.model';
import { LabResultComponent } from '@features/patient-details/biomarker/lab-result/lab-result.component';
import { FormGroup } from '@angular/forms';
import { FormModel } from '@features/patient-details/_models/form.model';

@Component({
  selector: 'ce-category-list-flexible',
  templateUrl: './list-flexible.component.html',
  styleUrls: ['./list-flexible.component.scss'],
  imports: [SharedModule, LabResultComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CategoryListFlexibleComponent {
  @Input() public biomarkers!: LabResultItem[];
  @Input() public formGroup!: FormGroup<FormModel>;
  @Output() public isEditingEnabled = new EventEmitter<boolean>();

  private get labBiomarkerControls(): FormGroup[] | undefined {
    return this.formGroup.controls.biomarkerValues?.controls ?? undefined;
  }

  public findLabBiomarkerControlById(id: string): FormGroup | undefined {
    return this.labBiomarkerControls?.find(i => i.getRawValue().name === id);
  }
  protected enableEditMode(): void {
    this.isEditingEnabled.emit(true);
  }
}

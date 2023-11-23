import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BiomarkerDragItem } from '@models/biomarker/biomarker-drag-item.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SharedModule } from '@shared/shared.module';
import { LabResultItem } from '@models/biomarker/lab-results/lab-result.model';
import { LabResultComponent } from '@features/patient-details/biomarker/lab-result/lab-result.component';
import { FormGroup } from '@angular/forms';
import { BiomarkerFormModel, FormModel } from '@features/patient-details/_models/form.model';
import { BiomarkerUnitType } from '@core/enums/biomarker-unit-type.enum';

@Component({
  selector: 'ce-category-list-flexible-edit',
  templateUrl: './list-flexible-edit.component.html',
  styleUrls: ['./list-flexible-edit.component.scss'],
  imports: [SharedModule, LabResultComponent],
  standalone: true,
})
export class CategoryListFlexibleEditComponent {
  @Input() public biomarkers!: LabResultItem[];
  @Input() public formGroup!: FormGroup<FormModel>;
  @Output() public saveChanges = new EventEmitter<boolean>();
  public biomarkerUnits = Object.values(BiomarkerUnitType);
  protected readonly BiomarkerUnitType = BiomarkerUnitType;

  private get labBiomarkerControls(): FormGroup[] | undefined {
    return this.formGroup.controls.biomarkerValues?.controls ?? undefined;
  }

  public findLabBiomarkerControlById(id: string): FormGroup | undefined {
    return this.labBiomarkerControls?.find(i => i.getRawValue().name === id);
  }
  public changeBiomarkerUnits(): void {
    this.biomarkers.forEach(b => {
      const biomarkerFg: FormGroup<BiomarkerFormModel> | undefined = this.findLabBiomarkerControlById(b.id);
      const preferredType = this.formGroup.controls.preferredUnitType.getRawValue();
      if (preferredType === BiomarkerUnitType.Other) return;
      const currentUnitTypeOnBiomarker = this.formGroup.controls.biomarkerValues
        ?.getRawValue()
        .find(fg => fg.name === b.id)?.unitType;
      if (currentUnitTypeOnBiomarker !== preferredType) {
        biomarkerFg?.patchValue({
          unitType: preferredType ?? BiomarkerUnitType.SI,
          value: null,
        });
        biomarkerFg?.updateValueAndValidity();
      }
    });
  }
  protected dropItem(event: CdkDragDrop<BiomarkerDragItem>): void {
    // update array of biomarkers with the order of the item dragged
    const element = this.biomarkers[event.previousContainer.data.index];
    this.biomarkers.splice(event.previousContainer.data.index, 1);
    this.biomarkers.splice(event.container.data.index, 0, element);
  }

  protected savePreferences(): void {
    this.saveChanges.emit(true);
  }
}

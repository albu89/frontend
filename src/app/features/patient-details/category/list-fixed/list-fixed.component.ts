import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MedicalHistoryItem } from '@models/biomarker/medical-history/medicalHistory.model';
import { EXTRA_WIDTH_CATEGORIES } from '@features/patient-details/constants';
import { MedicalHistoryComponent } from '@features/patient-details/biomarker/medical-history/medical-history.component';
import { FormGroup } from '@angular/forms';
import { FormModel } from '@features/patient-details/_models/form.model';
import { MedicalHistoryCategory } from '@models/biomarker/medical-history/medical-history-category.model';
import { PatientDetailsStore } from '@features/patient-details/_store/patient-details.store';

@Component({
  selector: 'ce-category-list-fixed',
  templateUrl: './list-fixed.component.html',
  styleUrls: ['./list-fixed.component.scss'],
  imports: [SharedModule, MedicalHistoryComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CategoryListFixedComponent {
  @Input() public biomarkers!: MedicalHistoryItem[];
  @Input() public categories!: MedicalHistoryCategory;
  @Input() public formGroup!: FormGroup<FormModel>;
  protected fixedBiomarkersByCategory$ = this.store.fixedBiomarkersByCategory$;

  //TODO: calculate width
  protected readonly EXTRA_WIDTH_CATEGORIES = EXTRA_WIDTH_CATEGORIES;

  public constructor(private readonly store: PatientDetailsStore) {}

  public get medicalBiomarkerControls(): FormGroup[] | undefined {
    return this.formGroup.controls.biomarkerValues?.controls ?? undefined;
  }

  public findMedicalBiomarkerControlById(id: string): FormGroup | undefined {
    return this.medicalBiomarkerControls?.find(i => i.getRawValue().name === id);
  }

  public findSideEffectMarker(m: MedicalHistoryItem) {
    const sideEffectId = m.unit.options?.find(i => i.sideEffectId)?.sideEffectId;
    if (!sideEffectId) return undefined;
    const x = this.formGroup.controls.biomarkerValues?.controls.find(
      fg => fg.controls.name.getRawValue() === sideEffectId
    );
    return x;
  }
}

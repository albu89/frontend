import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryListFixedComponent } from '@features/patient-details/category/list-fixed/list-fixed.component';
import { CategoryListFlexibleEditComponent } from '@features/patient-details/category/list-flexible-edit/list-flexible-edit.component';
import { CategoryListFlexibleComponent } from '@features/patient-details/category/list-flexible/list-flexible.component';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { SharedModule } from '@shared/shared.module';
import { FormModel } from '@features/patient-details/_models/form.model';
import { FormGroup } from '@angular/forms';
import { PatientDetailsStore } from '@features/patient-details/_store/patient-details.store';
import { UserPreferences } from '@models/user/user-preferences.model';
import { LabResultItem } from '@models/biomarker/lab-results/lab-result.model';
import { FormMode } from '@features/patient-details/_models/form-mode';

@Component({
  selector: 'ce-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [SharedModule, CategoryListFixedComponent, CategoryListFlexibleComponent, CategoryListFlexibleEditComponent],
  standalone: true,
})
export class CategoryComponent implements OnChanges {
  @Input() public biomarkers!: Biomarker;
  @Input() public formGroup!: FormGroup<FormModel>;

  protected isEditingEnabled$ = this.store.isEditingEnabled$;

  protected readonly FormMode = FormMode;
  protected formMode$ = this.store.formMode$;

  private smallestOrderNo = 0;

  public constructor(
    private readonly store: PatientDetailsStore // private readonly userService: UserService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['biomarkers'] && this.biomarkers) {
      //getting the lowest orderNumber in the flexibleBiomarkers
      if (this.biomarkers.labResults?.length > 0) {
        this.smallestOrderNo = Math.min(...this.biomarkers.labResults.map(item => item.orderIndex));
      }
    }
  }

  protected savePreferences(): void {
    if (!this.isEditingEnabled$.subscribe()) {
      return;
    }

    const formData = this.formGroup.getRawValue();

    this.biomarkers.labResults.forEach((i, currentIndex) => (i.orderIndex = this.smallestOrderNo + currentIndex));

    const preferences: UserPreferences = this.biomarkers.labResults.reduce(
      (o, item: LabResultItem) => ({
        ...o,
        [item.id]: {
          orderNumber: item.orderIndex,
          preferredUnit: formData?.biomarkerValues?.find(i => i.name === item.id)?.unitType,
        },
      }),
      {}
    );

    //save preferences and update biomarkers in store
    this.store.saveUserPreferences({ biomarker: this.biomarkers, preferences });
  }

  protected enableEditMode() {
    // enable editing
    this.store.setIsEditingEnabled(true);
    this.formGroup.updateValueAndValidity();
  }
}

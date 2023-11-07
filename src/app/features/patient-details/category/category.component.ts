import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CategoryListFixedComponent } from '@features/patient-details/category/list-fixed/list-fixed.component';
import { CategoryListFlexibleEditComponent } from '@features/patient-details/category/list-flexible-edit/list-flexible-edit.component';
import { CategoryListFlexibleComponent } from '@features/patient-details/category/list-flexible/list-flexible.component';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { SharedModule } from '@shared/shared.module';
import { catchError, EMPTY, finalize, Subject, takeUntil } from 'rxjs';
import { FormModel } from '@features/patient-details/_models/form.model';
import { FormGroup } from '@angular/forms';
import { LabResultItem } from '@models/biomarker/lab-results/lab-result.model';
import { UserService } from '@services/user.service';

@Component({
  selector: 'ce-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [SharedModule, CategoryListFixedComponent, CategoryListFlexibleComponent, CategoryListFlexibleEditComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CategoryComponent implements OnChanges, OnDestroy {
  @Input() public biomarkers!: Biomarker;
  @Input() public formGroup!: FormGroup<FormModel>;

  public isEditingEnabled = false;
  private smallestOrderNo = 0;
  private destroy$ = new Subject<void>();

  public constructor(private readonly userService: UserService) {}

  public ngOnDestroy(): void {
    // unsubscribe Observable
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['biomarkers'] && this.biomarkers) {
      //getting the lowest orderNumber in the flexibleBiomarkers
      if (this.biomarkers.labResults?.length > 0) {
        this.smallestOrderNo = Math.min(...this.biomarkers.labResults.map(item => item.orderIndex));
      }
    }
  }

  protected savePreferences(): void {
    if (!this.isEditingEnabled) {
      return;
    }

    const formData = this.formGroup.getRawValue();

    const preferences = this.biomarkers.labResults.reduce(
      (o, key: LabResultItem, currentIndex: number) => ({
        ...o,
        [key.id]: {
          orderNumber: this.smallestOrderNo + currentIndex,
          preferredUnit: formData?.biomarkerValues?.find(i => i.name === key.id)?.unitType,
        },
      }),
      {}
    );

    // todo implement loading indicator
    this.userService
      .updateUserPreferences(preferences)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          // Todo error handling view dialog, please create a shared dialog component
          //eslint-disable-next-line no-console
          console.error(`An error occurred on updating user preferences ${error}`);
          return EMPTY;
        }),
        finalize(() => {
          // close edit-mode
          this.isEditingEnabled = false;
        })
      )
      .subscribe();
    this.isEditingEnabled = false;
  }

  protected enableEditMode() {
    // enable editing
    this.isEditingEnabled = true;
  }
}

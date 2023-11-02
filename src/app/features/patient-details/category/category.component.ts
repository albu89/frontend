import { Component, Input, OnDestroy } from '@angular/core';
import { CategoryListFixedComponent } from '@features/patient-details/category/list-fixed/list-fixed.component';
import { CategoryListFlexibleEditComponent } from '@features/patient-details/category/list-flexible-edit/list-flexible-edit.component';
import { CategoryListFlexibleComponent } from '@features/patient-details/category/list-flexible/list-flexible.component';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { SharedModule } from '@shared/shared.module';
import { Subject } from 'rxjs';

@Component({
  selector: 'ce-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [SharedModule, CategoryListFixedComponent, CategoryListFlexibleComponent, CategoryListFlexibleEditComponent],
  standalone: true,
})
export class CategoryComponent implements OnDestroy {
  @Input() public biomarkers!: Biomarker;

  public isEditingEnabled = false;
  private destroy$ = new Subject<void>();

  public ngOnDestroy(): void {
    // unsubscribe Observable
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected savePreferences(): void {
    //TODO fix after implementing reactive forms
    if (!this.isEditingEnabled) {
      return;
    }
  }

  protected enableEditMode() {
    // enable editing
    this.isEditingEnabled = true;
  }
}

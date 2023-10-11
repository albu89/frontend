import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Biomarker } from '../shared/biomarker';
import { FIXED_CATEGORIES } from './_models/categories-constants';
import { catchError, EMPTY, finalize, Subject, takeUntil, tap } from 'rxjs';
import { UserService } from '../service/user.service';

@Component({
  selector: 'ce-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnChanges, OnDestroy {
  @Input() public biomarkers!: Biomarker[];
  @Input() public uniqueCategories!: string[];

  public isEditingEnabled = false;

  protected fixedBiomarkers: Biomarker[] = [];
  protected flexibleBiomarkers: Biomarker[] = [];

  private isLoading = false;
  private smallestOrderNo = 0;
  // destroy$ sticks to OnDestroy - unsubscribe once for 1+ usages in pipes of subscriptions
  private destroy$ = new Subject<void>();

  public constructor(private readonly userService: UserService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['biomarkers'] && this.biomarkers) {
      // split biomarkers into fixed and flexible/editable lists
      this.fixedBiomarkers = this.biomarkers
        .filter(b => FIXED_CATEGORIES.includes(b.category))
        .sort((a, b) => a.orderNumber - b.orderNumber);
      this.flexibleBiomarkers = this.biomarkers
        .filter(b => !this.fixedBiomarkers.includes(b))
        .sort((a, b) => a.orderNumber - b.orderNumber);

      //getting the lowest orderNumber in the flexibleBiomarkers
      if (this.flexibleBiomarkers?.length > 0) {
        this.smallestOrderNo = Math.min(...this.flexibleBiomarkers.map(item => item.orderNumber));
      }
    }
  }

  public ngOnDestroy(): void {
    // unsubscribe Observable
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected savePreferences(): void {
    //todo
    if (!this.isEditingEnabled) {
      return;
    }

    // Format preferences for updating
    const preferences = this.flexibleBiomarkers.reduce(
      (o, key, currentIndex) => ({
        //todo type
        ...o,
        [key.id]: { orderNumber: this.smallestOrderNo + currentIndex, preferredUnit: key.selectedUnit.unitType },
      }),
      {}
    );

    //todo implement loading indicator
    this.userService
      .updateUserPreferences(preferences)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.isLoading = true)),
        catchError(error => {
          // Todo error handling view dialog, please create a shared dialog component
          //eslint-disable-next-line no-console
          console.error(`An error occurred on updating user preferences ${error}`);
          return EMPTY;
        }),
        finalize(() => {
          this.isLoading = false;
          // close edit-mode
          this.isEditingEnabled = false;
        })
      )
      .subscribe();
  }

  protected enableEditMode() {
    // enable editing
    this.isEditingEnabled = true;
  }
}

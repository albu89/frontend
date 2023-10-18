import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BiomarkerComponent } from '@features/patient-details/biomarker/biomarker.component';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { SharedModule } from '@shared/shared.module';
import { EXTRA_WIDTH_CATEGORIES } from '@features/patient-details/constants';

@Component({
  selector: 'ce-category-list-fixed',
  templateUrl: './list-fixed.component.html',
  styleUrls: ['./list-fixed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, BiomarkerComponent],
  standalone: true,
})
export class CategoryListFixedComponent implements OnInit {
  @Input() public biomarkers!: Biomarker[];

  public categories: string[] = [];

  protected readonly EXTRA_WIDTH_CATEGORIES = EXTRA_WIDTH_CATEGORIES;

  public ngOnInit() {
    this.categories = [...new Set(this.biomarkers.map(b => b.category))];
  }

  public categorizedBiomarkers(category: string): Biomarker[] {
    return this.biomarkers.filter(b => b.category === category);
  }
}

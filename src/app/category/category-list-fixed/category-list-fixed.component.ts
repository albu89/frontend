import { Component, Input, OnInit } from '@angular/core';
import { EXTRA_WIDTH_CATEGORIES } from '../_models/categories-constants';
import { Biomarker } from '../../shared/biomarker';

@Component({
  selector: 'ce-category-list-fixed',
  templateUrl: './category-list-fixed.component.html',
  styleUrls: ['./category-list-fixed.component.scss'],
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

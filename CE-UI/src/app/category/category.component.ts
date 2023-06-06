import { Component, Input } from '@angular/core';
import { Biomarker } from '../shared/biomarker';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @Input() categoryName = "";
  @Input() biomarkers: Biomarker[] = [];

  ngOnInit() {
    this.filteredBiomarkers = this.biomarkers.filter(x => x.category === this.categoryName);
  }
  filteredBiomarkers: Biomarker[] = [];
}

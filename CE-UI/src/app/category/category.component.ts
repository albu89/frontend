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

  fixedCategories = ['Anamnesis', 'Medication', 'Clinical findings'];

  ngOnInit() {
    this.filteredBiomarkers = this.biomarkers.filter(x => {
      const contains = this.fixedCategories.includes(x.category);
      if(this.categoryName === 'fixed')
       return contains;
      else
        return !contains;
    }
    );
  }
  filteredBiomarkers: Biomarker[] = [];
}

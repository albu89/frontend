import {Component, Input} from '@angular/core';
import {EXTRA_WIDTH_CATEGORIES} from "../_models/categories-constants";
import {Biomarker} from "../../shared/biomarker";

@Component({
  selector: 'app-category-list-fixed',
  templateUrl: './category-list-fixed.component.html',
  styleUrls: ['./category-list-fixed.component.css']
})
export class CategoryListFixedComponent {
  @Input() public biomarkers!: Biomarker[];

  protected readonly EXTRA_WIDTH_CATEGORIES = EXTRA_WIDTH_CATEGORIES;

}

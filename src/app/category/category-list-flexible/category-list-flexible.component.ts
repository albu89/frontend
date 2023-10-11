import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Biomarker } from '../../shared/biomarker';

@Component({
  selector: 'ce-category-list-flexible',
  templateUrl: './category-list-flexible.component.html',
  styleUrls: ['./category-list-flexible.component.scss'],
})
export class CategoryListFlexibleComponent {
  @Input() public biomarkers!: Biomarker[];
  @Output() public isEditingEnabled = new EventEmitter<boolean>();

  protected enableEditMode(): void {
    this.isEditingEnabled.emit(true);
  }
}

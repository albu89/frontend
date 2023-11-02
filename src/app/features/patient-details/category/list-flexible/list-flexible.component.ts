import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LabResultItem } from '@models/biomarker/lab-results/lab-result.model';
import { LabResultComponent } from '@features/patient-details/biomarker/lab-result/lab-result.component';

@Component({
  selector: 'ce-category-list-flexible',
  templateUrl: './list-flexible.component.html',
  styleUrls: ['./list-flexible.component.scss'],
  imports: [SharedModule, LabResultComponent],
  standalone: true,
})
export class CategoryListFlexibleComponent {
  @Input() public biomarkers!: LabResultItem[];
  @Output() public isEditingEnabled = new EventEmitter<boolean>();

  protected enableEditMode(): void {
    this.isEditingEnabled.emit(true);
  }
}

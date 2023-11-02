import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BiomarkerDragItem } from '@models/biomarker/biomarker-drag-item.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SharedModule } from '@shared/shared.module';
import { LabResultItem } from '@models/biomarker/lab-results/lab-result.model';
import { LabResultComponent } from '@features/patient-details/biomarker/lab-result/lab-result.component';

@Component({
  selector: 'ce-category-list-flexible-edit',
  templateUrl: './list-flexible-edit.component.html',
  styleUrls: ['./list-flexible-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, LabResultComponent],
  standalone: true,
})
export class CategoryListFlexibleEditComponent {
  @Input() public biomarkers!: LabResultItem[];
  @Output() public saveChanges = new EventEmitter<boolean>();

  protected dropItem(event: CdkDragDrop<BiomarkerDragItem>): void {
    // update array of biomarkers with the order of the item dragged
    const element = this.biomarkers[event.previousContainer.data.index];
    this.biomarkers.splice(event.previousContainer.data.index, 1);
    this.biomarkers.splice(event.container.data.index, 0, element);
  }

  protected savePreferences(): void {
    this.saveChanges.emit(true);
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BiomarkerComponent } from '@features/patient-details/biomarker/biomarker.component';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'ce-category-list-flexible',
  templateUrl: './list-flexible.component.html',
  styleUrls: ['./list-flexible.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, BiomarkerComponent],
  standalone: true,
})
export class CategoryListFlexibleComponent {
  @Input() public biomarkers!: Biomarker[];
  @Output() public isEditingEnabled = new EventEmitter<boolean>();

  protected enableEditMode(): void {
    this.isEditingEnabled.emit(true);
  }
}

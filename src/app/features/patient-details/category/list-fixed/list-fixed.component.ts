import { Component, Input } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MedicalHistoryItem } from '@models/biomarker/medical-history/medicalHistory.model';
import { EXTRA_WIDTH_CATEGORIES } from '@features/patient-details/constants';
import { MedicalHistoryComponent } from '@features/patient-details/biomarker/medical-history/medical-history.component';
import { MedicalHistoryCategory } from '@models/biomarker/medical-history/medical-history-category.model';

@Component({
  selector: 'ce-category-list-fixed',
  templateUrl: './list-fixed.component.html',
  styleUrls: ['./list-fixed.component.scss'],
  imports: [SharedModule, MedicalHistoryComponent],
  standalone: true,
})
export class CategoryListFixedComponent {
  @Input() public biomarkers!: MedicalHistoryItem[];
  @Input() public categories!: MedicalHistoryCategory;

  //TODO: calculate width
  protected readonly EXTRA_WIDTH_CATEGORIES = EXTRA_WIDTH_CATEGORIES;

  //TODO: move to store ?
  public categorizedBiomarkers(category: string): MedicalHistoryItem[] {
    return this.biomarkers.filter(b => b.categoryId === category);
  }

  public findSideEffectMarker(m: MedicalHistoryItem) {
    const sideEffectId = m.unit.options?.find(i => i.sideEffectId)?.sideEffectId;
    if (!sideEffectId) return undefined;
    return this.biomarkers.find(marker => marker.id === sideEffectId);
  }
}

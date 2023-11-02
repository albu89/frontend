import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalHistoryItem } from '@models/biomarker/medical-history/medicalHistory.model';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'ce-biomarker-medical-history',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalHistoryComponent {
  @Input() public biomarker!: MedicalHistoryItem;
  @Input() public sideEffectMarker?: MedicalHistoryItem;
  @Input() public unitTypeEditable = false;
}

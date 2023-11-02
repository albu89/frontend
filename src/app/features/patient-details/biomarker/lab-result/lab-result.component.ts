import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabResultItem } from '@models/biomarker/lab-results/lab-result.model';
import { LabResultUnit } from '@models/biomarker/lab-results/lab-result-units.model';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'ce-biomarker-lab-result',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './lab-result.component.html',
  styleUrls: ['./lab-result.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabResultComponent implements OnChanges {
  @Input() public biomarker!: LabResultItem;
  @Input() public unitTypeEditable = false;

  public currentUnit?: LabResultUnit;
  public ngOnChanges(changes: SimpleChanges) {
    if (changes['biomarker'] && this.biomarker) {
      this.currentUnit = this.biomarker.units.find(i => i.unitType === this.biomarker.preferredUnit);
    }
  }
}

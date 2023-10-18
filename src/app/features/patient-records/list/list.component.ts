import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskLabelComponent } from '@features/patient-records/risk-label/risk-label.component';
import { PatientRecord } from '@models/patient/patient-record.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ce-patient-record-list',
  standalone: true,
  imports: [CommonModule, RiskLabelComponent, TranslateModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientRecordsListComponent {
  @Input() public patientRecords!: PatientRecord[];
  @Input() public showDetailsButton: boolean | null = false;
  @Output() public openSpecificScore = new EventEmitter<string>();
  @Output() public editSpecificScore = new EventEmitter<string>();

  public trackById(index: number, item: PatientRecord): string {
    return item.requestId;
  }
}

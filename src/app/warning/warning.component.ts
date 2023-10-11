import { Component, Input } from '@angular/core';
import { Warning } from '../shared/ScoringResponseSchema';

@Component({
  selector: 'ce-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss'],
})
export class WarningComponent {
  @Input() public warningHeader = '';
  @Input() public warnings: Warning[] = [];
}

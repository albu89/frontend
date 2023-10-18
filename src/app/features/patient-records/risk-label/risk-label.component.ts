import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ce-risk-label',
  templateUrl: './risk-label.component.html',
  styleUrls: ['./risk-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class RiskLabelComponent {
  @Input() public risk = 'Incomplete';
  @Input() public riskClass = 0;
}

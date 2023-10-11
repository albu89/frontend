import { Component, Input } from '@angular/core';

@Component({
  selector: 'ce-risk-label',
  templateUrl: './risk-label.component.html',
  styleUrls: ['./risk-label.component.scss'],
})
export class RiskLabelComponent {
  @Input() public risk = 'Incomplete';
  @Input() public riskClass = 0;
}

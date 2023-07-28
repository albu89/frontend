import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-risk-label',
  templateUrl: './risk-label.component.html',
  styleUrls: ['./risk-label.component.css']
})
export class RiskLabelComponent {
  @Input() risk = 'Incomplete';
  @Input() riskClass: string | number = "";

  grey = 'bg-label-2 text-text';
  green = 'bg-light-green text-text-green';
  yellow = 'bg-light-orange-1 text-text-orange-1';
  orange = 'bg-light-orange-2 text-text-orange-2';
  red = 'bg-light-red text-text-red';
}

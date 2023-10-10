import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-risk-label',
	templateUrl: './risk-label.component.html',
	styleUrls: ['./risk-label.component.css'],
})
export class RiskLabelComponent {
	@Input() risk = 'Incomplete';
	@Input() riskClass = 0;
}

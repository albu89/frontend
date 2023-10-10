import { Component, Input } from '@angular/core';
import { Warning } from '../shared/ScoringResponseSchema';

@Component({
	selector: 'app-warning',
	templateUrl: './warning.component.html',
	styleUrls: ['./warning.component.css'],
})
export class WarningComponent {
	@Input() warningHeader = '';
	@Input() warnings: Warning[] = [];
}

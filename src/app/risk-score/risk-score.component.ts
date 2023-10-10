import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-risk-score',
	templateUrl: './risk-score.component.html',
	styleUrls: ['./risk-score.component.css'],
})
export class RiskScoreComponent {
	@Input() ScoreHeader = '';
	@Input() ScoreValue = 0;
	@Input() RiskHeader = '';
	@Input() RiskValue = '';
	@Input() RecommendationHeader = '';
	@Input() Recommendation = '';
	@Input() RecommendationLong = '';
	@Input() RiskClass = 0;

	isLongTextVisible = false;

	showLongText() {
		this.isLongTextVisible = !this.isLongTextVisible;
	}
}

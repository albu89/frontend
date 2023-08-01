import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-risk-score',
  templateUrl: './risk-score.component.html',
  styleUrls: ['./risk-score.component.css']
})
export class RiskScoreComponent {
  @Input() ScoreHeader = "";
  @Input() ScoreValue = 0;
  @Input() RiskHeader = "";
  @Input() RiskValue = "";
  @Input() RecommendationHeader = "";
  @Input() Recommendation = "";
  @Input() RecommendationLong = "";
  @Input() RiskClass: number | string = 0;

  isLongTextVisible = false;

  showLongText() {
    this.isLongTextVisible = !this.isLongTextVisible;
  }

  grey = 'bg-label-2 text-white';
  green = 'bg-text-green text-white';
  orange = 'text-white bg-text-orange-1';
  yellow = 'bg-yellow text-white';
  red = 'bg-text-red text-white';
}

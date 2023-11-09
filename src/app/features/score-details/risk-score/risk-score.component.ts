import { Component, Input } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'ce-risk-score',
  templateUrl: './risk-score.component.html',
  styleUrls: ['./risk-score.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
  standalone: true,
})
export class RiskScoreComponent {
  @Input() public ScoreHeader = '';
  @Input() public ScoreValue = 0;
  @Input() public RiskHeader = '';
  @Input() public RiskValue = '';
  @Input() public RecommendationHeader = '';
  @Input() public Recommendation = '';
  @Input() public RecommendationLong = '';
  @Input() public RiskClass = 0;

  public isLongTextVisible = false;

  public showLongText() {
    this.isLongTextVisible = !this.isLongTextVisible;
  }
}

import { Component, Input } from '@angular/core';
import { RecommendationCategory } from '../shared/ScoringResponseSchema';

@Component({
  selector: 'ce-recommendation-table',
  templateUrl: './recommendation-table.component.html',
  styleUrls: ['./recommendation-table.component.scss'],
})
export class RecommendationTableComponent {
  @Input() public categories: RecommendationCategory[] = [];
  @Input() public recommendationHeader = '';
  @Input() public scoreRangeHeader = '';
  @Input() public probabilityHeader = '';
}

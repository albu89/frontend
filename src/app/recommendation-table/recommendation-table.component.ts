import { Component, Input } from '@angular/core';
import { RecommendationCategory } from '../shared/ScoringResponseSchema';

@Component({
  selector: 'app-recommendation-table',
  templateUrl: './recommendation-table.component.html',
  styleUrls: ['./recommendation-table.component.css']
})
export class RecommendationTableComponent {
   @Input() categories: RecommendationCategory[] = [];
  @Input() recommendationHeader = "";
  @Input() scoreRangeHeader = "";
  @Input() probabilityHeader = "";
}

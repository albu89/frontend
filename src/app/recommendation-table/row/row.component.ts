import { Component, Input } from '@angular/core';
import { RecommendationCategory } from 'src/app/shared/ScoringResponseSchema';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent {
  @Input() category?: RecommendationCategory;

  longTextVisible = false;

  toggleLongText() {
    this.longTextVisible = !this.longTextVisible;
  }
}
import { Component, Input } from '@angular/core';
import { RecommendationCategory } from 'src/app/shared/ScoringResponseSchema';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[ce-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent {
  @Input() public category?: RecommendationCategory;

  public longTextVisible = false;

  public toggleLongText() {
    this.longTextVisible = !this.longTextVisible;
  }
}

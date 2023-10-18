import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecommendationCategory } from '@models/scoring/scoring-recommendation-category.model';
import { SharedModule } from '@shared/shared.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[ce-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
  standalone: true,
})
export class RowComponent {
  @Input() public category?: RecommendationCategory;

  public longTextVisible = false;

  public toggleLongText() {
    this.longTextVisible = !this.longTextVisible;
  }
}

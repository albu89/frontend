import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RowComponent } from '@features/score-details/recommendation-table/row/row.component';
import { RecommendationCategory } from '@models/scoring/scoring-recommendation-category.model';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'ce-recommendation-table',
  templateUrl: './recommendation-table.component.html',
  styleUrls: ['./recommendation-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, RowComponent],
  standalone: true,
})
export class RecommendationTableComponent {
  @Input() public categories: RecommendationCategory[] = [];
  @Input() public recommendationHeader = '';
  @Input() public scoreRangeHeader = '';
  @Input() public probabilityHeader = '';
}

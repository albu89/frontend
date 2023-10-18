import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Warning } from '@models/scoring/scoring-warning.model';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'ce-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
  standalone: true,
})
export class WarningComponent {
  @Input() public warningHeader = '';
  @Input() public warnings: Warning[] = [];
}

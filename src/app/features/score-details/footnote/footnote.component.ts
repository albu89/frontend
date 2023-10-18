import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[ce-footnote]',
  templateUrl: './footnote.component.html',
  styleUrls: ['./footnote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
  standalone: true,
})
export class FootnoteComponent {
  @Input() public header = '';
  @Input() public text = '';
}

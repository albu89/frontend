import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ce-loading-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent {}

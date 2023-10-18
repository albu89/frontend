import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VersionComponent } from '@layout/version/version.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'ce-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, VersionComponent],
  standalone: true,
})
export class FooterComponent {}

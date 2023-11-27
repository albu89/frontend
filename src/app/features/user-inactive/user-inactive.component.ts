import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MsalService } from '@azure/msal-angular';
import { PageLinks } from '@core/enums/page-links.enum';

@Component({
  selector: 'ce-user-inactive',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './user-inactive.component.html',
  styleUrls: ['./user-inactive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInactiveComponent {
  public constructor(private readonly authService: MsalService) {}

  public logout() {
    const currentAccount = this.authService.instance.getAllAccounts()[0];
    this.authService.logoutPopup({ account: currentAccount, mainWindowRedirectUri: PageLinks.ROOT });
  }
}

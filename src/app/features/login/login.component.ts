import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { FooterComponent } from '@layout/footer/footer.component';
import { SharedModule } from '@shared/shared.module';
import { UserService } from '@services/user.service';
import { PageLinks } from '@core/enums/page-links.enum';
import { MessageService } from '@services/message.service';

@Component({
  selector: 'ce-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, FooterComponent],
  standalone: true,
})
export class LoginComponent {
  // TODO: Please implement proper Angular form validation
  public requestingAccess = false;
  public accessRequested = false;
  public emailValid = true;
  public phoneValid = true;
  public nameValid = true;
  public lastNameValid = true;

  private emailRegex = /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*$/;
  private phoneRegex =
    /^(?:(?:\+|0{2})(49|1)[\s.-]*|\b([01]))[1-9]\d*(?:[\s.-]*\d+){3}$|^(?:\+1|1)?[ .-]?\(?[2-9]\d{2}\)?[ .-]?\d{3}[ .-]?\d{4}$/;

  public constructor(
    private readonly authService: MsalService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {}

  public login() {
    this.authService.loginPopup().subscribe({
      next: () => {
        this.router.navigate([PageLinks.ROOT]);
      },
      error: error => this.messageService.showLoginError(error),
    });
  }

  public sendRequest(
    name: string,
    lastname: string,
    email: string,
    telephone: string,
    country: string,
    organization: string
  ): boolean {
    if (!name || !lastname || !email || !telephone) {
      return false;
    }

    this.userService.requestAccess(name, lastname, email, telephone, country, organization).subscribe({
      next: () => {
        this.accessRequested = true;
      },
      error: error => this.messageService.showAccessRequestError(error),
    });

    return true;
  }

  public validateMail(mail: string) {
    this.emailValid = mail.match(this.emailRegex) !== null;
  }

  public validatePhone(phone: string) {
    this.phoneValid = phone.match(this.phoneRegex) !== null;
  }

  public validateName(text: string) {
    this.nameValid = text.length > 1;
  }

  public validateLastName(text: string) {
    this.lastNameValid = text.length > 1;
  }

  // TODO: Country and organisation not required fields and not validated?
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  requestingAccess = false;
  accessRequested = false;

  constructor(private authService: MsalService, private router: Router, private userService: UserService) { }

  login() {
    this.authService.loginPopup()
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => console.log(error)
      });
  }

  requestAccess() {
    this.requestingAccess = true;
  }

  sendRequest(name: string, lastname: string, email: string, telephone: string, country: string, organization: string): boolean {
    if (!name || !lastname || !email || !telephone) {
      return false;
    }

    this.userService.requestAccess(name, lastname, email, telephone, country, organization)
      .subscribe({
        next: () => {
          this.accessRequested = true;
        },
        error: (error) => console.log(error)
      });

    return true
  }

}

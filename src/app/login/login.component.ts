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
  inputClassBase = 'basis-1/2 rounded-md border py-1.5 pl-2 focus:ring-2 focus:ring-inset focus:outline-none sm:text-sm sm:leading-6 ';
  inputClassValid = 'border-tone-2 focus:ring-primary';
  inputClassInvalid = 'border-text-red ring-text-red';
  emailValid = true;
  phoneValid = true;
  nameValid = true;
  lastNameValid = true;
  
  emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  phoneRegex = /^(?:(?:\+|00)(49|1)[\s.-]*|\b(0|1))[1-9][0-9]*[\s.-]*[0-9]+[\s.-]*[0-9]+[\s.-]*[0-9]+$|^(?:\+1|1)?[-. ]?\(?[2-9]\d{2}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
  
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

  validateMail(mail : string) {
    this.emailValid = mail.match(this.emailRegex) !== null;
  }

  validatePhone(phone : string) {
    this.phoneValid = phone.match(this.phoneRegex) !== null;
  }

  validateName(text : string) {
    this.nameValid = text.length > 1;
  }

  validateLastName(text : string) {
    this.lastNameValid = text.length > 1;
  }

}

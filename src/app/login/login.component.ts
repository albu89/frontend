import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { UserService } from '../service/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	// TODO: Please implement proper Angular form validation
	requestingAccess = false;
	accessRequested = false;
	emailValid = true;
	phoneValid = true;
	nameValid = true;
	lastNameValid = true;

	emailRegex = /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*$/;
	phoneRegex =
		/^(?:(?:\+|0{2})(49|1)[\s.-]*|\b([01]))[1-9]\d*(?:[\s.-]*\d+){3}$|^(?:\+1|1)?[ .-]?\(?[2-9]\d{2}\)?[ .-]?\d{3}[ .-]?\d{4}$/;

	constructor(
		private authService: MsalService,
		private router: Router,
		private userService: UserService
	) {}

	login() {
		this.authService.loginPopup().subscribe({
			next: () => {
				this.router.navigate(['/']);
			},
			error: error => console.log(error),
		});
	}

	requestAccess() {
		this.requestingAccess = true;
	}

	sendRequest(
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
			error: error => console.log(error),
		});

		return true;
	}

	validateMail(mail: string) {
		this.emailValid = mail.match(this.emailRegex) !== null;
	}

	validatePhone(phone: string) {
		this.phoneValid = phone.match(this.phoneRegex) !== null;
	}

	validateName(text: string) {
		this.nameValid = text.length > 1;
	}

	validateLastName(text: string) {
		this.lastNameValid = text.length > 1;
	}

	// TODO: Country and organisation not required fields and not validated?
}

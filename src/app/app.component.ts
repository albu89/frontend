import { MsalService } from '@azure/msal-angular';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';
import {LanguageService} from "./service/language.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CE-UI';
  isIframe = false;
  isLoggedIn$ = inject(UserService).isLoggedIn;

  selectedLocale = 'en-GB';

  constructor(private authService: MsalService, public router: Router, private userService: UserService, public languageService: LanguageService) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.languageService.getLanguageObservable().subscribe({
      next: value => this.selectedLocale = value
    })
  }

  login() {
    this.authService.loginPopup();
  }

   logout() { // Add log out function here
    const currentAccount = this.authService.instance.getAllAccounts()[0];
    this.authService.logoutPopup({account: currentAccount, mainWindowRedirectUri: "/"});
  }

  selectionChanged() {
    this.languageService.setLanguage(this.selectedLocale);
  }
}

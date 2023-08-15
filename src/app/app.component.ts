import { MsalService } from '@azure/msal-angular';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CE-UI';
  isIframe = false;
  isLoggedIn$ = inject(UserService).isLoggedIn;

  constructor(private authService: MsalService, public router: Router, private userService: UserService) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
  }

  login() {
    this.authService.loginPopup();
  }

   logout() { // Add log out function here
    const currentAccount = this.authService.instance.getAllAccounts()[0];
    this.authService.logoutPopup({account: currentAccount, mainWindowRedirectUri: "/"});
  }
}
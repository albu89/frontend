import { MsalService } from '@azure/msal-angular';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CE-UI';
  isIframe = false;
  isLoggedIn$ = inject(UserService).isLoggedIn;

  constructor(private authService: MsalService) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
  }

  login() {
    this.authService.loginPopup();
  }

   logout() { // Add log out function here
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
  }
}
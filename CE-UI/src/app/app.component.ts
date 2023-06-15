import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CE-UI';
  isIframe = false;
  loginDisplay = false;

  constructor(private authService: MsalService) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  login() {
    this.authService.loginPopup()
      .subscribe({
        next: (result) => {
          console.log(result);
          this.setLoginDisplay();
        },
        error: (error) => console.log(error)
      });
  }

   logout() { // Add log out function here
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}
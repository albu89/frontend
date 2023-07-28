import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';
import { EventType } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CE-UI';
  isIframe = false;
  isLoggedIn = false;

  constructor(private authService: MsalService, private broadCastService: MsalBroadcastService) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.isLoggedIn = this.authService.instance.getAllAccounts().length > 0;

    // Subscription notifies us of changes to the users authentication
    this.broadCastService.msalSubject$.subscribe((value) => {
      if(value.eventType === EventType.LOGIN_SUCCESS || value.eventType === EventType.ACQUIRE_TOKEN_SUCCESS){
          this.isLoggedIn = true;
      }
    });
  }

  login() {
    this.authService.loginPopup()
      .subscribe({
        next: () => {
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
    this.isLoggedIn = this.authService.instance.getAllAccounts().length > 0;
  }
}
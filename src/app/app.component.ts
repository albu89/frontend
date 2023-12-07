import { MsalService } from '@azure/msal-angular';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from '@services/language.service';
import { initFlowbite } from 'flowbite';
import { filter, map } from 'rxjs/operators';
import { PageLinks } from '@core/enums/page-links.enum';

@Component({
  selector: 'ce-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  public LOCALE_DISPLAY = new Map<string, string>().set('en-GB', '🇬🇧 English').set('de-DE', '🇩🇪 Deutsch');

  public isIframe = false;
  public isLoginPage = false;
  public limitedUI: Boolean = false;
  public selectedLocaleDisplay = this.LOCALE_DISPLAY.get('en-GB');

  protected readonly PageLinks = PageLinks;

  public constructor(
    private readonly authService: MsalService,
    private readonly router: Router,
    private readonly languageService: LanguageService // private readonly userService: UserService
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => event as NavigationEnd)
      )
      .subscribe(event => {
        this.isLoginPage = event.url === '/login';
        this.limitedUI = event.url === '/inactive';
      });
  }

  public ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.languageService.getLanguageObservable().subscribe(locale => {
      this.selectedLocaleDisplay = this.LOCALE_DISPLAY.get(locale);
    });
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      initFlowbite();
    }, 1500);
  }

  public login() {
    this.authService.loginPopup();
  }

  public logout() {
    // Add log out function here
    const currentAccount = this.authService.instance.getAllAccounts()[0];
    this.authService.logoutPopup({ account: currentAccount, mainWindowRedirectUri: PageLinks.ROOT });
  }

  public selectLanguage(locale: string) {
    // TODO: Any way to better handle locales than unrestricted strings? Enum? Also check the LOCALE_DISPLAY map above.
    this.languageService.setLanguage(locale, false);
  }
}

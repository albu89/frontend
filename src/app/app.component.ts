import { MsalService } from '@azure/msal-angular';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from './service/language.service';
import { Dropdown, initFlowbite } from 'flowbite';
import { filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
	LOCALE_DISPLAY = new Map<string, string>().set('en-GB', '🇬🇧 English').set('de-DE', '🇩🇪 Deutsch');

	@ViewChild('userDdtrigger')
	userDdtrigger!: ElementRef;
	@ViewChild('userDdTarget')
	userDdTarget!: ElementRef;

	userDropdown!: Dropdown;

	title = 'CE-UI';
	isIframe = false;
	isLoginPage = false;

	selectedLocaleDisplay = this.LOCALE_DISPLAY.get('en-GB');

	constructor(
		private authService: MsalService,
		public router: Router,
		public languageService: LanguageService
	) {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				map(event => event as NavigationEnd)
			)
			.subscribe(event => {
				this.isLoginPage = event.url === '/login';
			});
	}

	ngOnInit() {
		this.isIframe = window !== window.parent && !window.opener;
		this.languageService.getLanguageObservable().subscribe(locale => {
			this.selectedLocaleDisplay = this.LOCALE_DISPLAY.get(locale);
		});
	}

	ngAfterViewInit() {
		initFlowbite();
		this.userDropdown = new Dropdown(this.userDdTarget.nativeElement, this.userDdtrigger.nativeElement);
	}

	login() {
		this.authService.loginPopup();
	}

	logout() {
		// Add log out function here
		const currentAccount = this.authService.instance.getAllAccounts()[0];
		this.authService.logoutPopup({ account: currentAccount, mainWindowRedirectUri: '/' });
	}

	selectLanguage(locale: string) {
		// TODO: Any way to better handle locales than unrestricted strings? Enum? Also check the LOCALE_DISPLAY map above.
		this.languageService.setLanguage(locale, false);
	}
}

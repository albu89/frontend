import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, Observable, of, switchMap, map, catchError } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({ providedIn: 'root' })
export class CanActivateGuard {
	constructor(
		private msalService: MsalService,
		private router: Router,
		private msalBroadcastService: MsalBroadcastService,
		private userService: UserService
	) {}

	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		return this.msalBroadcastService.inProgress$.pipe(
			filter((status: InteractionStatus) => status === InteractionStatus.None),
			switchMap(() => {
				if (this.msalService.instance.getAllAccounts().length > 0) {
					return this.userService.getUser().pipe(
						map(res => {
							if (res) {
								return true;
							}
							this.router.navigate(['/onboard']);
							return false;
						}),
						catchError(() => {
							this.router.navigate(['/onboard']);
							return of(false);
						})
					);
				}
				this.router.navigate(['/login']);
				return of(false);
			})
		);
	}
}

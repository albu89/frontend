import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, Observable, of, switchMap, map, catchError } from 'rxjs';
import { UserService } from '@services/user.service';
import { PageLinks } from '@core/enums/page-links.enum';

@Injectable({ providedIn: 'root' })
export class CanActivateGuard {
  public constructor(
    private readonly msalService: MsalService,
    private readonly router: Router,
    private readonly msalBroadcastService: MsalBroadcastService,
    private readonly userService: UserService
  ) {}

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.msalBroadcastService.inProgress$.pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      switchMap(() => {
        if (this.msalService.instance.getAllAccounts().length > 0) {
          return this.userService.getUser().pipe(
            map(user => {
              if (user && user.isActive) {
                return true;
              } else if (user && !user.isActive) {
                this.router.navigate([PageLinks.USER_INACTIVE]);
                return true;
              }
              this.router.navigate([PageLinks.ONBOARD]);
              return false;
            }),
            catchError(err => {
              if (err.status === 403) this.router.navigate([PageLinks.USER_INACTIVE]);
              else this.router.navigate([PageLinks.ONBOARD]);
              return of(false);
            })
          );
        }
        this.router.navigate([PageLinks.LOGIN]);
        return of(false);
      })
    );
  }
}

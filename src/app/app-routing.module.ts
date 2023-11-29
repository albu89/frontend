import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { PageLinks } from '@core/enums/page-links.enum';
import { CanActivateGuard } from '@core/authentication/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/patient-records/patient-records.component').then(m => m.PatientRecordsComponent),
    canActivate: [MsalGuard, CanActivateGuard],
  },
  {
    path: PageLinks.USER_INACTIVE,
    loadComponent: () => import('@features/user-inactive/user-inactive.component').then(m => m.UserInactiveComponent),
  },
  {
    path: PageLinks.PROFILE,
    loadComponent: () => import('@features/user-profile/user-profile.component').then(m => m.UserProfileComponent),
    canActivate: [MsalGuard, CanActivateGuard],
  },
  {
    path: PageLinks.NEW_SCORE,
    loadComponent: () =>
      import('@features/patient-details/patient-details.component').then(m => m.PatientDetailsComponent),
    canActivate: [MsalGuard, CanActivateGuard],
  },
  {
    path: PageLinks.LOGIN,
    loadComponent: () => import('@features/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: PageLinks.ONBOARD,
    loadComponent: () => import('@features/user-profile/user-profile.component').then(m => m.UserProfileComponent),
    canActivate: [MsalGuard, CanActivateGuard],
  },
  {
    path: PageLinks.EDIT_SCORE,
    loadComponent: () =>
      import('@features/patient-details/patient-details.component').then(m => m.PatientDetailsComponent),
    canActivate: [MsalGuard, CanActivateGuard],
  },
  {
    path: '**',
    loadComponent: () => import('@features/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation: 'enabledBlocking', // Set to enabledBlocking to use Angular Universal
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

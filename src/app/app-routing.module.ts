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
    path: PageLinks.SCORE,
    loadComponent: () => import('@features/score-details/score.component').then(m => m.ScoreComponent),
    canActivate: [MsalGuard, CanActivateGuard],
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
    data: undefined,
    canActivate: [MsalGuard, CanActivateGuard],
  },
  {
    path: PageLinks.LOGIN,
    loadComponent: () => import('@features/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: PageLinks.ONBOARD,
    loadComponent: () => import('@features/user-profile/user-profile.component').then(m => m.UserProfileComponent),
  },
  {
    path: PageLinks.EDIT_SCORE,
    loadComponent: () =>
      import('@features/patient-details/patient-details.component').then(m => m.PatientDetailsComponent),
    data: { name: '', lastName: '', dateOfBirth: '', requestId: '' },
    canActivate: [MsalGuard, CanActivateGuard],
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

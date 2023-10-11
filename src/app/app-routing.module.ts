import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ProfileComponent } from './profile/profile.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { ScoreComponent } from './score/score.component';
import { CanActivateGuard } from './authentication/CanActivateGuard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: PatientRecordComponent,
    canActivate: [MsalGuard, CanActivateGuard],
  },
  {
    path: 'score',
    component: ScoreComponent,
    canActivate: [MsalGuard, CanActivateGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard, CanActivateGuard],
  },
  {
    path: 'score/new',
    component: PatientDetailsComponent,
    data: undefined,
    canActivate: [MsalGuard, CanActivateGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'onboard',
    component: ProfileComponent,
  },
  {
    path: 'score/edit',
    component: PatientDetailsComponent,
    data: { name: '', lastName: '', dateOfBirth: '', requestId: '' },
    canActivate: [MsalGuard, CanActivateGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation: 'enabledBlocking', // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

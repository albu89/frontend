import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ProfileComponent } from './profile/profile.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { CanActivateGuard } from './authentication/CanActivateGuard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "",
    component: PatientRecordComponent,
    canActivate: [MsalGuard, CanActivateGuard]

  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [MsalGuard, CanActivateGuard]
  },
  {
    path: "patient/new",
    component: PatientDetailsComponent,
    canActivate: [MsalGuard, CanActivateGuard]
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation: "enabledBlocking", // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})


export class AppRoutingModule { }

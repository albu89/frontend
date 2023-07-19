import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserUtils } from "@azure/msal-browser";
import { MsalGuard } from '@azure/msal-angular';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ProfileComponent } from './profile/profile.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';

const routes: Routes = [
  {
    path: "",
    component: PatientRecordComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [MsalGuard]
  },
  {
    path: "patient/new",
    component: PatientDetailsComponent,
    canActivate: [MsalGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? "enabledNonBlocking"
          : "disabled", // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})


export class AppRoutingModule { }

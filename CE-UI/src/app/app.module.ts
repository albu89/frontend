import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalModule, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientDataFormComponent } from './patient-data-form/patient-data-form.component';
import { BiomarkerComponent } from './biomarker/biomarker.component';
import { CategoryComponent } from './category/category.component';
import { ScoreComponent } from './score/score.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;
@NgModule({
  declarations: [
    AppComponent,
    PatientDetailsComponent,
    PatientDataFormComponent,
    BiomarkerComponent,
    CategoryComponent,
    ScoreComponent,
    PatientRecordComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MatToolbarModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: "7e8be7c1-728f-4dce-af96-c3105974e2ee", // Application (client) ID from the app registration
          authority:
            "https://login.microsoftonline.com/d8a83447-d1d0-41e3-a7cc-6be16c052845", // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
          redirectUri: "http://localhost:4200", // This is your redirect URI
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
      }),
      {
        interactionType: InteractionType.Popup, // MSAL Guard Configuration
        authRequest: {
          scopes: ["user.read"],
        },
      },
      {
        interactionType: InteractionType.Popup, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
          ["https://localhost:7102/", ["api://7e8be7c1-728f-4dce-af96-c3105974e2ee/Files.Read"]],
        ]),
      }
    ),
    BrowserAnimationsModule,
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true,
  },
  MsalGuard,],
  bootstrap: [AppComponent]
})
export class AppModule { }
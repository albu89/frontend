import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalModule, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientDataFormComponent } from './patient-data-form/patient-data-form.component';
import { BiomarkerComponent } from './biomarker/biomarker.component';
import { CategoryComponent } from './category/category.component';
import { ScoreComponent } from './score/score.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './footer/footer.component';
import { RiskScoreComponent } from './risk-score/risk-score.component';
import { RecommendationTableComponent } from './recommendation-table/recommendation-table.component';
import { WarningComponent } from './warning/warning.component';
import { BiomarkerInfoComponent } from './biomarker/biomarker-info/biomarker-info.component';
import { DatePipe } from '@angular/common';
import { RiskLabelComponent } from './components/risk-label/risk-label.component';
import { LoginComponent } from './login/login.component';
import { FootnoteComponent } from './score/footnote/footnote.component';
import { YesnoPipe } from './pipes/yesno.pipe';
import { RowComponent } from './recommendation-table/row/row.component';
import { VersionComponent } from './version/version.component';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

const isIE =
  window.navigator.userAgent.indexOf("MSIE ") > -1 ||
  window.navigator.userAgent.indexOf("Trident/") > -1;

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    PatientDetailsComponent,
    PatientDataFormComponent,
    BiomarkerComponent,
    CategoryComponent,
    ScoreComponent,
    PatientRecordComponent,
    ProfileComponent,
    FooterComponent,
    RiskScoreComponent,
    RecommendationTableComponent,
    WarningComponent,
    BiomarkerInfoComponent,
    RiskLabelComponent,
    LoginComponent,
    FootnoteComponent,
    YesnoPipe,
    RowComponent,
    VersionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatToolbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: "7e8be7c1-728f-4dce-af96-c3105974e2ee", // Application (client) ID from the app registration
          authority:
            "https://login.microsoftonline.com/d8a83447-d1d0-41e3-a7cc-6be16c052845", // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
          redirectUri: environment.frontendUrl, // This is your redirect URI
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
      }),
      {
        interactionType: InteractionType.Popup, // MSAL Guard Configuration
        authRequest: {
          scopes: ["user.read", "Default"],
        },
      },
      {
        interactionType: InteractionType.Popup, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
          [environment.backendUrl + "/api/user/request", null],
          [environment.backendUrl + "/health", null],
          [environment.backendUrl, ["api://7e8be7c1-728f-4dce-af96-c3105974e2ee/Default"]],
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
  DatePipe,
  MsalGuard,],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientDataFormComponent } from './patient-data-form/patient-data-form.component';
import { BiomarkerComponent } from './biomarker/biomarker.component';
import { CategoryComponent } from './category/category.component';
import { ScoreComponent } from './score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientDetailsComponent,
    PatientDataFormComponent,
    BiomarkerComponent,
    CategoryComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
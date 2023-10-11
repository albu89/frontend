import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Biomarker } from '../shared/biomarker';
import { environment } from 'src/environments/environment';
import { ScoringResponseSchema } from '../shared/ScoringResponseSchema';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class SchemasService {
  public baseUrl = environment.backendUrl + '/api/schemas';

  public constructor(
    private readonly http: HttpClient,
    private readonly languageService: LanguageService
  ) {}

  public getBiomarkers() {
    return this.http.get<Biomarker[]>(this.baseUrl + '/biomarkers', this.createLanguageParams());
  }

  public getResponseSchema() {
    const url = this.baseUrl + '/scoring';
    return this.http.get<ScoringResponseSchema>(url, this.createLanguageParams());
  }

  public createLanguageParams() {
    return { params: new HttpParams().set('locale', this.languageService.getLanguageSubject().getValue()) };
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScoringResponseSchema } from '@models/scoring/scoring-response-schema.model';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class SchemasService {
  private baseUrl = environment.backendUrl + '/api/schemas';

  public constructor(
    private readonly http: HttpClient,
    private readonly languageService: LanguageService
  ) {}

  public getBiomarkers(): Observable<Biomarker> {
    return this.http.get<Biomarker>(this.baseUrl + '/biomarkers', this.createLanguageParams());
  }

  public getResponseSchema(): Observable<ScoringResponseSchema> {
    const url = this.baseUrl + '/scoring';
    return this.http.get<ScoringResponseSchema>(url, this.createLanguageParams());
  }

  private createLanguageParams(): { params: HttpParams } {
    return { params: new HttpParams().set('locale', this.languageService.getLanguageSubject().getValue()) };
  }
}

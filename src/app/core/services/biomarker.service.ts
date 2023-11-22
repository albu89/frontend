import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScoringRequestWithPatientData } from '@models/scoring/scoring-request-with-patient.model';
import { ScoringResponse } from '@models/scoring/scoring-response.model';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class BiomarkerService {
  public constructor(private readonly http: HttpClient) {}

  public sendRequest(request: ScoringRequestWithPatientData): Observable<ScoringResponse> {
    const url = environment.backendUrl + '/api/scores/request';
    return this.http.post<ScoringResponse>(url, request);
  }

  public editRequest(request: ScoringRequestWithPatientData, id: string): Observable<ScoringResponse> {
    const url = environment.backendUrl + '/api/scores/' + id;
    return this.http.put<ScoringResponse>(url, request);
  }

  public saveAsDraft(request: ScoringRequestWithPatientData): Observable<ScoringResponse> {
    const url = environment.backendUrl + '/api/scores';
    return this.http.post<ScoringResponse>(url, request);
  }
}

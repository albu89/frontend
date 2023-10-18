import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScoringResponse } from '@models/scoring/scoring-response.model';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PatientRecord } from '@models/patient/patient-record.model';

@Injectable({
  providedIn: 'root',
})
export class PatientRecordService {
  private baseUrl = environment.backendUrl + '/api/scores';
  public constructor(private readonly http: HttpClient) {}

  public getRecords(): Observable<PatientRecord[]> {
    return this.http.get<PatientRecord[]>(this.baseUrl, { withCredentials: true, responseType: 'json' });
  }

  public getSpecificRecords(
    patientName: string,
    patientLastName: string,
    patientBirthdate: string
  ): Observable<PatientRecord[]> {
    const encodedName = encodeURIComponent(patientName);
    const encodedLastName = encodeURIComponent(patientLastName);
    const headers = new HttpHeaders({ name: encodedName, lastname: encodedLastName, dateOfBirth: patientBirthdate });
    return this.http.get<PatientRecord[]>(this.baseUrl, {
      headers: headers,
      withCredentials: true,
      responseType: 'json',
    });
  }

  public getSpecificRecordById(
    patientName: string,
    patientLastName: string,
    patientBirthdate: string,
    requestId: string
  ): Observable<ScoringResponse> {
    const encodedName = encodeURIComponent(patientName);
    const encodedLastName = encodeURIComponent(patientLastName);
    const headers = new HttpHeaders({ name: encodedName, lastname: encodedLastName, dateOfBirth: patientBirthdate });
    return this.http.get<ScoringResponse>(this.baseUrl + `/${requestId}`, { headers, responseType: 'json' });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PatientRecord } from '../shared/PatientRecord';
import { ScoringResponse } from '../shared/ScoringResponse';

@Injectable({
  providedIn: 'root',
})
export class PatientRecordService {
  public baseUrl = environment.backendUrl + '/api/scores';
  public constructor(private readonly http: HttpClient) {}

  public getRecords() {
    return this.http.get<PatientRecord[]>(this.baseUrl, { withCredentials: true, responseType: 'json' });
  }

  public getSpecificRecords(patientName: string, patientLastName: string, patientBirthdate: string) {
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
  ) {
    const encodedName = encodeURIComponent(patientName);
    const encodedLastName = encodeURIComponent(patientLastName);
    const headers = new HttpHeaders({ name: encodedName, lastname: encodedLastName, dateOfBirth: patientBirthdate });
    return this.http.get<ScoringResponse>(this.baseUrl + `/${requestId}`, { headers, responseType: 'json' });
  }
}

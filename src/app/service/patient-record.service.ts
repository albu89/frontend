import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PatientRecord } from '../shared/PatientRecord';
import { ScoringResponse } from '../shared/ScoringResponse';

@Injectable({
  providedIn: 'root'
})
export class PatientRecordService {
  baseUrl = environment.backendUrl + '/api/scores';
  constructor(private http: HttpClient) { }

  getRecords() {
    return this.http.get<PatientRecord[]>(this.baseUrl, {withCredentials: true, responseType: 'json'});
  }

  getSpecificRecords(patientName : string, patientLastName : string, patientBirthdate : string) {
    const headers = new HttpHeaders({name: patientName, lastname: patientLastName, dateOfBirth: patientBirthdate});
    return this.http.get<PatientRecord[]>(this.baseUrl, {headers: headers, withCredentials: true, responseType: 'json'})
  }

  getSpecificRecordById(patientName: string, patientLastName: string, patientBirthdate: string, requestId: string) {
    const headers = new HttpHeaders({name: patientName, lastname: patientLastName, dateOfBirth: patientBirthdate});
    return this.http.get<ScoringResponse>(this.baseUrl + `/${requestId}`, {headers, responseType: 'json'});
  }
}
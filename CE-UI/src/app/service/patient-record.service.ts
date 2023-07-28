import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PatientRecord } from '../shared/PatientRecord';

@Injectable({
  providedIn: 'root'
})
export class PatientRecordService {

  constructor(private http: HttpClient) { }

  getRecords() {
    return this.http.get<PatientRecord[]>(environment.backendUrl + '/api/scores', {withCredentials: true, responseType: 'json'});
  }

  getSpecificRecords(patientName : string, patientLastName : string, patientBirthdate : string) {
    const headers = new HttpHeaders({name: patientName, lastname: patientLastName, dateOfBirth: patientBirthdate});
    return this.http.get<PatientRecord[]>(environment.backendUrl + '/api/scores', {headers: headers, withCredentials: true, responseType: 'json'})
  }
}
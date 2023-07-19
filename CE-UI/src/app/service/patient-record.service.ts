import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PatientRecord } from '../shared/PatientRecord';

@Injectable({
  providedIn: 'root'
})
export class PatientRecordService {

  constructor(private http: HttpClient) { }

  getRecords() {
    return this.http.get<PatientRecord[]>(environment.backendUrl + '/api/score', {withCredentials: true, responseType: 'json'});
  }

  getSpecificRecords(patientName : string, patientLastName : string, patientBirthdate : string) {
    return this.http.get<PatientRecord[]>(environment.backendUrl + '/api/Score/patient', {params: {name: patientName, lastname: patientLastName, dateOfBirth: patientBirthdate},withCredentials: true, responseType: 'json'})
  }
}
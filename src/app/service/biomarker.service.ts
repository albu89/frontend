import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScoringRequestWithPatientData } from '../shared/ScoringRequest';
import { ScoringResponse } from '../shared/ScoringResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BiomarkerService {

  constructor(private http: HttpClient) { 
  }

  sendRequest(request: ScoringRequestWithPatientData) {
    const url = environment.backendUrl + '/api/scores/request'; 
    return this.http.post<ScoringResponse>(url, request);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Biomarker } from '../shared/biomarker';
import { ScoringRequest } from '../shared/ScoringRequest';
import { ScoringResponse } from '../shared/ScoringResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BiomarkerService {

  constructor(private http: HttpClient) { 
  }

  getBiomarkers() {
     return this.http.get<Biomarker[]>(environment.backendUrl + '/api/Biomarkers/schema');
  }

  sendRequest(request: ScoringRequest) {
    const url = environment.backendUrl + '/api/Score'; // Replace with your actual API endpoint
    return this.http.post<ScoringResponse>(url, request);
  }
}
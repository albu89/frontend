import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Biomarker } from '../shared/biomarker';
import { environment } from 'src/environments/environment';
import { ScoringResponseSchema } from '../shared/ScoringResponseSchema';

@Injectable({
  providedIn: 'root'
})
export class SchemasService {

  constructor(private http: HttpClient) { 
  }
  baseUrl = environment.backendUrl + '/api/schemas';

  getBiomarkers() {
    return this.http.get<Biomarker[]>(this.baseUrl + '/biomarkers');
  }
  
  getResponseSchema() {
    const url = this.baseUrl + '/scoring';
    return this.http.get<ScoringResponseSchema>(url);    
  }

 
}

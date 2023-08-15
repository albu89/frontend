import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VERSION } from 'src/environments/version';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent {
  apiVersion = '';
  uiVersion = VERSION.hash;

  constructor(httpClient: HttpClient){
    console.log('Getting Version');
    httpClient.get<string>(environment.backendUrl + '/health', {observe: 'response'}).subscribe(
      {
        next: response => this.setApiVersion(response),
        error: response => this.setApiVersion(response)
      }
    );
  }

  setApiVersion(response: HttpResponse<string>){
    this.apiVersion = response.headers.get('x-api-version') ?? '';
  }
}

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VERSION } from 'src/environments/version';

@Component({
  selector: 'ce-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
})
export class VersionComponent {
  public apiVersion = '';
  public uiVersion = VERSION.hash;

  public constructor(httpClient: HttpClient) {
    httpClient.get<string>(environment.backendUrl + '/health', { observe: 'response' }).subscribe({
      next: response => this.setApiVersion(response),
      error: response => this.setApiVersion(response),
    });
  }

  private setApiVersion(response: HttpResponse<string>) {
    this.apiVersion = response.headers.get('x-api-version') ?? '';
  }
}

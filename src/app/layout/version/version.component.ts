import { HttpClient, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { environment } from '@env/environment';
import { VERSION } from '@env/version';

@Component({
  selector: 'ce-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
  standalone: true,
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

import { Injectable } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseConfiguration: Partial<IndividualConfig> = {
    closeButton: true,
    positionClass: 'toast-top-right',
  };

  public constructor(private readonly toastrService: ToastrService) {}

  public showSuccess(
    message?: string | undefined,
    title?: string | undefined,
    override?: Partial<IndividualConfig> | undefined
  ): ActiveToast<any> {
    const configuration = this.mergeConfigurations(this.baseConfiguration, override);
    return this.toastrService.success(message, title, configuration);
  }

  public showError(
    message?: string | undefined,
    title?: string | undefined,
    override?: Partial<IndividualConfig> | undefined
  ): ActiveToast<any> {
    const configuration = this.mergeConfigurations(this.baseConfiguration, override);
    return this.toastrService.error(message, title, configuration);
  }

  public showWarning(
    message?: string | undefined,
    title?: string | undefined,
    override?: Partial<IndividualConfig> | undefined
  ): ActiveToast<any> {
    const configuration = this.mergeConfigurations(this.baseConfiguration, override);
    return this.toastrService.warning(message, title, configuration);
  }

  public showInfo(
    message?: string | undefined,
    title?: string | undefined,
    override?: Partial<IndividualConfig> | undefined
  ): ActiveToast<any> {
    const configuration = this.mergeConfigurations(this.baseConfiguration, override);
    return this.toastrService.info(message, title, configuration);
  }

  private mergeConfigurations(
    baseConfiguration: Partial<IndividualConfig>,
    overrideConfiguration: Partial<IndividualConfig> | undefined
  ): Partial<IndividualConfig> {
    if (overrideConfiguration === undefined) {
      return baseConfiguration;
    }

    return Object.assign(baseConfiguration, overrideConfiguration) as Partial<IndividualConfig>;
  }
}

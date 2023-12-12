import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { Profile } from '@models/user/user-profile.model';
import countryData from '@core/data/countries.json';
import { FormBuilder, Validators } from '@angular/forms';
import { Country } from '@models/country/country.model';
import { initFlowbite } from 'flowbite';
import { CLINICAL_SETTINGS } from '@shared/constants';
import { BillingForm, FormModel } from '@features/user-profile/_models/form.model';
import { ProfileSchema } from '@models/user/profile-schema.model';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '@services/message.service';
import { hasFormError, isFormFieldInvalid } from '@shared/utils/form-utils';
import { LoadingIndicatorComponent } from '@shared/components/loading-indicator/loading-indicator.component';
import { UserService } from '@services/user.service';
import { ProfileRequest } from '@models/user/user-profile-request.model';
import { PageLinks } from '@core/enums/page-links.enum';
import { Router } from '@angular/router';
import { ClinicalSetting } from '@core/enums/clinical-setting.enum';
import { LanguageService } from '@services/language.service';

@Component({
  selector: 'ce-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  imports: [SharedModule, LoadingIndicatorComponent],
  standalone: true,
})
export class UserProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  public clinicalSettingsSpecs = Object.entries(CLINICAL_SETTINGS).map(([, value]) => value);
  public countryCodes: Country[] = countryData;
  public schema!: ProfileSchema;
  public userExistedPreviously = false;
  public isLoading = false;

  public formGroup = this.formBuilder.group<FormModel>({
    eMailAddress: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(256)]),
    salutation: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(256)]),
    title: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(256)]),
    firstName: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(256)]),
    surname: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(256)]),
    professionalSpecialisation: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(256),
    ]),
    department: this.formBuilder.control(null, [Validators.maxLength(256)]),
    address: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(256)]),
    zipCode: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(256)]),
    city: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(256)]),
    country: this.formBuilder.nonNullable.control('Switzerland', [Validators.required, Validators.maxLength(256)]),
    telephoneNumber: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(256)]),
    language: this.formBuilder.nonNullable.control('english', [Validators.required, Validators.maxLength(256)]),
    preferredLab: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(256)]),
    clinicalSetting: this.formBuilder.nonNullable.control(ClinicalSetting.PrimaryCare, [
      Validators.required,
      Validators.maxLength(256),
    ]),
    clinicalSettingConfirm: this.formBuilder.nonNullable.control(false),
    countryCode: this.formBuilder.nonNullable.control(''),
    isActive: this.formBuilder.nonNullable.control(false),
    unitLabValues: this.formBuilder.nonNullable.control(''),
    organization: this.formBuilder.control(''),
    isSeparateBilling: this.formBuilder.nonNullable.control(false),
    billing: this.formBuilder.group<BillingForm>({
      billingName: this.formBuilder.control(null),
      billingAddress: this.formBuilder.control(null),
      billingZip: this.formBuilder.control(null),
      billingCity: this.formBuilder.control(null),
      billingCountry: this.formBuilder.control(null),
      billingCountryCode: this.formBuilder.control(null),
      billingPhone: this.formBuilder.control(null),
    }),
  });

  private destroy$ = new Subject<void>();

  public constructor(
    private readonly languageService: LanguageService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public ngOnInit() {
    this.getProfile();
    this.getSchema();
  }

  public ngAfterViewInit() {
    //set timeout so the data is loaded before initFlowbite
    setTimeout(() => {
      initFlowbite();
    }, 1500);
  }

  public onSubmit() {
    this.updateBillingFormGroup();

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.formGroup.controls.billing.markAllAsTouched();
      return this.messageService.showUserSavingControlValuesRequiredInfo();
    }

    if (
      this.formGroup.get('clinicalSettingConfirm')?.hasValidator(Validators.required) &&
      !this.formGroup.controls.clinicalSettingConfirm.getRawValue()
    ) {
      return this.messageService.showUserConfirmationRequired();
    }
    this.isLoading = true;
    const profile: ProfileRequest = this.formGroup.getRawValue();
    if (this.userExistedPreviously) {
      this.userService
        .updateUser(profile)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: res => {
            if (this.router.url.includes(PageLinks.ONBOARD)) this.router.navigateByUrl(PageLinks.ROOT);
            else this.handleExistingUser(res);
            this.messageService.showUpdateUserSuccess();
            this.isLoading = false;
          },
          error: error => {
            this.messageService.showUpdateUserHttpError(error);
            this.isLoading = false;
          },
        });
    } else {
      this.userService
        .createUser(profile)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: res => {
            if (this.router.url.includes(PageLinks.ONBOARD)) this.router.navigateByUrl(PageLinks.ROOT);
            else this.handleExistingUser(res);

            this.messageService.showCreateUserSuccess();
            this.isLoading = false;
          },
          error: error => {
            this.messageService.showCreateUserHttpError(error);
            this.isLoading = false;
          },
        });
    }
  }

  public isFieldInvalid(name: string) {
    return isFormFieldInvalid(name, this.formGroup) && this.hasError(name, 'required');
  }

  public hasError(name: string, required: string) {
    return hasFormError(name, required, this.formGroup);
  }

  private updateBillingFormGroup() {
    if (this.formGroup.controls.isSeparateBilling.getRawValue()) {
      this.formGroup.controls.billing.controls.billingName.setValidators([Validators.required]);
      this.formGroup.controls.billing.controls.billingAddress.setValidators([Validators.required]);
      this.formGroup.controls.billing.controls.billingZip.setValidators([Validators.required]);
      this.formGroup.controls.billing.controls.billingCity.setValidators([Validators.required]);
      this.formGroup.controls.billing.controls.billingCountry.setValidators([Validators.required]);
      this.formGroup.controls.billing.controls.billingPhone.setValidators([Validators.required]);
    } else {
      this.formGroup.controls.billing.controls.billingName.setValidators(null);
      this.formGroup.controls.billing.controls.billingAddress.setValidators(null);
      this.formGroup.controls.billing.controls.billingZip.setValidators(null);
      this.formGroup.controls.billing.controls.billingCity.setValidators(null);
      this.formGroup.controls.billing.controls.billingCountry.setValidators(null);
      this.formGroup.controls.billing.controls.billingPhone.setValidators(null);
    }
    this.formGroup.controls.billing.controls.billingName.updateValueAndValidity();
    this.formGroup.controls.billing.controls.billingAddress.updateValueAndValidity();
    this.formGroup.controls.billing.controls.billingZip.updateValueAndValidity();
    this.formGroup.controls.billing.controls.billingCity.updateValueAndValidity();
    this.formGroup.controls.billing.controls.billingCountry.updateValueAndValidity();
    this.formGroup.controls.billing.controls.billingPhone.updateValueAndValidity();
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.userExistedPreviously = false;
      this.formGroup.controls.clinicalSettingConfirm.setValidators([Validators.required, Validators.requiredTrue]);
      this.formGroup.controls.clinicalSettingConfirm.updateValueAndValidity();
      this.getProfile();
    } else this.messageService.showLoadUserHttpError(error);
  }
  private handleExistingUser(value: Profile | null): void {
    if (!value) return;
    this.formGroup.patchValue(value);

    this.formGroup.controls.clinicalSettingConfirm.setValidators(null);

    this.formGroup.controls.clinicalSetting.disable();
    this.formGroup.updateValueAndValidity();
    this.userExistedPreviously = true;
  }

  private getSchema() {
    this.languageService
      .getLanguageObservable()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.userService.getProfileSchema())
      )
      .subscribe({
        next: response => {
          this.schema = response;
          this.userService
            .getUser()
            .subscribe({ next: () => this.handleExistingUser(this.schema), error: err => this.handleError(err) });
        },
        error: error => this.handleError(error),
      });
  }

  private getProfile() {
    this.userService.getAdProfile().subscribe(res => {
      this.formGroup.controls.eMailAddress.patchValue(res.mail);
    });
  }
}

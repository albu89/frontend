import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProfileType } from '@models/user/profile-type.model';
import { SharedModule } from '@shared/shared.module';
import { Profile } from '@models/user/user-profile.model';
import countryData from '@core/data/countries.json';
import { UserService } from '@services/user.service';
import { FormBuilder } from '@angular/forms';
import { Country } from '@models/country/country.model';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { PageLinks } from '@core/enums/page-links.enum';
import { environment } from '@env/environment';
import { CLINICAL_SETTINGS } from '@shared/constants';
import { BiomarkerUnitType } from '@core/enums/biomarker-unit-type.enum';

@Component({
  selector: 'ce-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
  standalone: true,
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  public biomarkerUnitType = Object.entries(BiomarkerUnitType).map(([, value]) => value);
  public clinicalSettingsSpecs = Object.entries(CLINICAL_SETTINGS).map(([, value]) => value);
  public updatedUserProfile = new Profile();
  public countryCodes: Country[] = countryData;
  public updatedUser = this.formBuilder.group<Profile>(this.updatedUserProfile);
  public userExistedPreviously = false;

  private adProfile!: ProfileType | undefined;

  public constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  public ngOnInit() {
    this.getProfile();
    this.userService.getUser().subscribe({
      next: value => this.handleExistingUser(value),
      error: error => this.handleError(error),
    });
  }

  public ngAfterViewInit() {
    initFlowbite();
  }

  public onSubmit() {
    // TODO: Handle form validation, including clinicalSetting consent checkbox.
    // TODO: clinicalSetting consent check as a checkbox (as currently) or a popup modal (see here: https://flowbite.com/docs/components/modal/#pop-up-modal)?
    this.updatedUser.value.emailAddress = this.adProfile?.mail ?? this.adProfile?.userPrincipalName ?? '';
    this.updatedUser.value.countryCode =
      this.countryCodes.find(x => x.name === this.updatedUserProfile.country)?.alpha2 ?? '';
    if (this.userExistedPreviously) {
      this.userService.updateUser(this.updatedUser.value as Profile).subscribe(data => {
        this.updatedUser = this.formBuilder.group(data);
        if (this.router.url.includes(PageLinks.ONBOARD)) {
          this.router.navigate([PageLinks.ROOT]);
        }
      });
    } else {
      this.userService.createUser(this.updatedUser.value as Profile).subscribe(data => {
        this.updatedUser = this.formBuilder.group(data);
        if (this.router.url.includes(PageLinks.ONBOARD)) {
          this.router.navigate([PageLinks.ROOT]);
        }
      });
    }
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.userExistedPreviously = false;
      this.updatedUserProfile.country = 'Switzerland';
      this.updatedUserProfile.language = 'english';
      this.updatedUserProfile.unitLabValues = 'si';
    }
  }
  private handleExistingUser(value: Profile | null): void {
    if (!value) {
      return;
    }
    this.userExistedPreviously = true;
    this.updatedUserProfile = value;
    this.updatedUser.controls.clinicalSetting.disable();
  }

  // Todo move to service, no http calls outside of services
  private getProfile() {
    this.http.get(environment.graphEndpoint).subscribe(profile => {
      this.adProfile = profile as ProfileType;
      this.updatedUserProfile.username = this.adProfile.userPrincipalName ?? '';
      this.updatedUserProfile.emailAddress = this.adProfile.mail ?? this.adProfile.userPrincipalName ?? '';
    });
  }
}

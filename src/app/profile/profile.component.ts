import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../shared/profile';
import countryData from './countries.json';
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';
import { Country } from '../shared/countries';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string;
  surname?: string;
  userPrincipalName?: string;
  id?: string;
  mail: string;
  displayName: string;
};

@Component({
  selector: 'ce-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  public readonly CLINICAL_SETTINGS: { name: string; descr: string }[] = [
    { name: 'PrimaryCare', descr: 'Risk stratification or screening in primary care' },
    { name: 'SecondaryCare', descr: 'Evaluation by a cardiologist or in a hospital setting (secondary care)' },
  ];
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
        if (this.router.url.includes('onboard')) {
          this.router.navigate(['/']);
        }
      });
    } else {
      this.userService.createUser(this.updatedUser.value as Profile).subscribe(data => {
        this.updatedUser = this.formBuilder.group(data);
        if (this.router.url.includes('onboard')) {
          this.router.navigate(['/']);
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

  private getProfile() {
    this.http.get(GRAPH_ENDPOINT).subscribe(profile => {
      this.adProfile = profile as ProfileType;
      this.updatedUserProfile.username = this.adProfile.userPrincipalName ?? '';
      this.updatedUserProfile.emailAddress = this.adProfile.mail ?? this.adProfile.userPrincipalName ?? '';
    });
  }
}

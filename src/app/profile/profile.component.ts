import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../shared/profile';
import countryData from './countries.json'
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';
import { Country } from '../shared/countries';
import { Router } from '@angular/router';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string,
  mail: string,
  displayName: string,
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  adProfile!: ProfileType | undefined;
  updatedUserProfile = new Profile();
  countryCodes: Country[] = countryData;
  selectedCountry?: string;
  updatedUser = this.formBuilder.group<Profile>(this.updatedUserProfile)
  userExistedPreviously = false;
  firstStyle = 'bg-tone-1 text-text';
  secondStyle = 'bg-tone-1 text-text';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProfile();
    this.userService.getUser()
      .subscribe({
        next: value => this.handleExistingUser(value),
        error: error => this.handleError(error)
      });

  }
  handleError(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.userExistedPreviously = false;
      this.updatedUserProfile.country = "Switzerland";
      this.updatedUserProfile.language = "english";
      this.updatedUserProfile.unitLabValues = "si";
    }
  }
  handleExistingUser(value: Profile | null): void {
    if (!value) {
      return;
    }
    this.userExistedPreviously = true;
    this.updatedUserProfile = value;
    this.updatedUser.controls['clinicalSetting'].disable();
    this.setValid(this.updatedUserProfile.clinicalSetting);
  }

  setValid(value: string) {
    switch (value) {
      case 'PrimaryCare':
        this.firstStyle = 'border border-primary bg-primary text-white';
        this.secondStyle = 'bg-tone-1 text-text'
        break;
      case 'SecondaryCare':
        this.secondStyle = 'border border-primary bg-primary text-white';
        this.firstStyle = 'bg-tone-1 text-text'
        break;
    }
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.adProfile = profile as ProfileType;
        this.updatedUserProfile.username = this.adProfile.userPrincipalName ?? "";
        this.updatedUserProfile.emailAddress = this.adProfile.mail ?? this.adProfile.userPrincipalName ?? "";
      });
  }

  onSubmit() {
    this.updatedUser.value.emailAddress = this.adProfile?.mail ?? this.adProfile?.userPrincipalName ?? "";
    this.updatedUser.value.countryCode = this.countryCodes.find(x => x.name === this.updatedUserProfile.country)?.alpha2 ?? '';
    if (this.userExistedPreviously) {
      this.userService.updateUser(this.updatedUser.value as Profile)
        .subscribe(data => {
          this.updatedUser = this.formBuilder.group(data);
          this.selectedCountry = this.updatedUserProfile?.country;
          if (this.router.url.includes('onboard')) {
            this.router.navigate(['/']);
          }
        });
    } else {
      this.userService.createUser(this.updatedUser.value as Profile)
        .subscribe(data => {
          this.updatedUser = this.formBuilder.group(data);
          this.selectedCountry = this.updatedUserProfile?.country;
          if (this.router.url.includes('onboard')) {
            this.router.navigate(['/']);
          }
        });
    }
  }
}
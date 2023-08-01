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
  profile!: ProfileType | undefined;
  userProfile?: Profile;
  updatedUserProfile = new Profile();
  countryCodes: Country[] = countryData;
  selectedCountry?: string;
  updatedUser = this.formBuilder.group<Profile>(this.updatedUserProfile)
  userExistedPreviously = false;

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
    }
  }
  handleExistingUser(value: Profile | null): void {
    if(!value) {
      return;
    }
    this.userExistedPreviously = true;
    this.userProfile = value;
    this.updatedUserProfile = value;
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile as ProfileType;
        this.updatedUserProfile.username = this.profile.userPrincipalName ?? "";
        this.updatedUserProfile.emailAddress = this.profile.mail ?? this.profile.userPrincipalName ?? "";
      });
  }

  getSelectedCountry(country: string) {
    this.selectedCountry = country;
    this.updatedUser.value.country = country;
  }

  onSubmit() {
    this.updatedUser.value.emailAddress = this.profile?.mail ?? this.profile?.userPrincipalName ?? "";
    if (this.userExistedPreviously) {
      this.userService.updateUser(this.updatedUser.value as Profile)
        .subscribe(data => {
          this.userProfile = data;
          this.updatedUser = this.formBuilder.group(data);
          this.selectedCountry = this.userProfile?.country;
          if (this.router.url.includes('onboard')) {
            this.router.navigate(['/']);
          }
        });
    } else {
      this.userService.createUser(this.updatedUser.value as Profile)
        .subscribe(data => {
          this.userProfile = data;
          this.updatedUser = this.formBuilder.group(data);
          this.selectedCountry = this.userProfile?.country;
          if (this.router.url.includes('onboard')) {
            this.router.navigate(['/']);
          }
        });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../shared/profile';
import countryData from './countries.json'
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';
import { Country } from '../shared/countries';

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
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile!: ProfileType | undefined;
  userProfile ?: Profile;
  updatedUserProfile = new Profile();
  countryCodes : Country[] = countryData;
  selectedCountry ?: string;
  updatedUser = this.formBuilder.group<Profile>(this.updatedUserProfile)

  constructor(
    private http: HttpClient,
    private userService : UserService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.getProfile();
    this.userService.getUser().subscribe((data) => {
      this.userProfile = data;
      this.updatedUserProfile = data;
    });
    
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile as ProfileType;
        this.updatedUserProfile.username = this.profile.userPrincipalName?? "";
        this.updatedUserProfile.emailAdress = this.profile.mail;
      });
  }

  getSelectedCountry(country : string) {
    this.selectedCountry = country;
    this.updatedUser.value.country = country;
  }

  onSubmit() {
    this.userService.updateUser(this.updatedUser.value as Profile)
    .subscribe(data => {
        this.userProfile = data;
        this.updatedUser = this.formBuilder.group(data);
        this.selectedCountry = this.userProfile?.country;
    });
  }
}
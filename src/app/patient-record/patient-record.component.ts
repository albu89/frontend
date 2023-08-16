import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PatientRecordService } from '../service/patient-record.service';
import { PatientRecord } from '../shared/PatientRecord';
import { ScoringResponse } from '../shared/ScoringResponse';
import { NavigationSkipped, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent {

  patientRecords?: PatientRecord[];
  showDetailsButton = false;
  patientName = ''
  patientLastName = ''
  patientBirthdate = new Date

  currentScore?: ScoringResponse;

  subscription?: Subscription;

  constructor(private patientRecordService: PatientRecordService, public datepipe: DatePipe, private router: Router) { 
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationSkipped)
    ).subscribe(() => {
      this.currentScore = undefined;
      this.patientName = ''
      this.patientLastName = ''
      this.patientBirthdate = new Date
      this.patientRecordService.getRecords().subscribe((records) => this.patientRecords = records.sort((a, b) => {
        return new Date(b.requestTimeStamp).getTime() - new Date(a.requestTimeStamp).getTime();
      }));
    })
  }

  ngOnInit() {
    this.patientRecordService.getRecords().subscribe((records) => this.patientRecords = records.sort((a, b) => {
      return new Date(b.requestTimeStamp).getTime() - new Date(a.requestTimeStamp).getTime();
    }));
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  getSpecificRecords(patientName: string, patientLastName: string, patientBirthdate: string) {
    this.patientRecordService
      .getSpecificRecords(patientName, patientLastName, patientBirthdate)
      .subscribe((records: PatientRecord[]) => {
        this.showDetailsButton = patientName && patientLastName && patientBirthdate ? true : false;
        this.patientName = this.showDetailsButton ? patientName : '';
        this.patientLastName = this.showDetailsButton ? patientLastName : '';
        this.patientBirthdate = this.showDetailsButton ? new Date(patientBirthdate) : new Date;
        this.patientRecords = records.sort((a, b) => {
          return new Date(b.requestTimeStamp).getTime() - new Date(a.requestTimeStamp).getTime();
        })
      })
  }

  openSpecificScore(requestId: string) {
    this.patientRecordService.getSpecificRecordById(this.patientName, this.patientLastName, this.patientBirthdate.toDateString(), requestId)
      .subscribe((score) => {
        this.currentScore = score;
      });
  }
}
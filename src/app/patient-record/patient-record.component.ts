import { Component, OnDestroy, OnInit } from '@angular/core';
import { PatientRecordService } from '../service/patient-record.service';
import { PatientRecord } from '../shared/PatientRecord';
import { ScoringResponse } from '../shared/ScoringResponse';
import { NavigationSkipped, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'ce-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss'],
})
export class PatientRecordComponent implements OnInit, OnDestroy {
  public patientRecords?: PatientRecord[];
  public showDetailsButton = false;
  public patientName = '';
  public patientLastName = '';
  public patientBirthdate = new Date();

  public currentScore?: ScoringResponse;

  private subscription?: Subscription;

  public constructor(
    private readonly patientRecordService: PatientRecordService,
    private readonly router: Router
  ) {
    this.subscription = this.router.events.pipe(filter(event => event instanceof NavigationSkipped)).subscribe(() => {
      this.currentScore = undefined;
      this.patientName = '';
      this.patientLastName = '';
      this.patientBirthdate = new Date();
      this.showDetailsButton = false;
      this.patientRecordService.getRecords().subscribe(
        records =>
          (this.patientRecords = records.sort((a, b) => {
            return new Date(b.requestTimeStamp).getTime() - new Date(a.requestTimeStamp).getTime();
          }))
      );
    });
  }

  public ngOnInit() {
    this.patientRecordService.getRecords().subscribe(
      records =>
        (this.patientRecords = records.sort((a, b) => {
          return new Date(b.requestTimeStamp).getTime() - new Date(a.requestTimeStamp).getTime();
        }))
    );
    this.showDetailsButton = false;
  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  public getSpecificRecords(patientName: string, patientLastName: string, patientBirthdate: string) {
    this.patientRecordService
      .getSpecificRecords(patientName, patientLastName, patientBirthdate)
      .subscribe((records: PatientRecord[]) => {
        this.showDetailsButton = !!(patientName && patientLastName && patientBirthdate);
        this.patientName = this.showDetailsButton ? patientName : '';
        this.patientLastName = this.showDetailsButton ? patientLastName : '';
        this.patientBirthdate = this.showDetailsButton ? new Date(patientBirthdate) : new Date();
        this.patientRecords = records.sort((a, b) => {
          return new Date(b.requestTimeStamp).getTime() - new Date(a.requestTimeStamp).getTime();
        });
      });
  }

  public editSpecificScore(requestId: string) {
    this.router.navigateByUrl('/score/edit', {
      state: {
        name: this.patientName,
        lastName: this.patientLastName,
        dateOfBirth: this.patientBirthdate.toDateString(),
        requestId: requestId,
      },
    });
  }

  public openSpecificScore(requestId: string) {
    this.patientRecordService
      .getSpecificRecordById(this.patientName, this.patientLastName, this.patientBirthdate.toDateString(), requestId)
      .subscribe(score => {
        this.currentScore = score;
      });
  }
}

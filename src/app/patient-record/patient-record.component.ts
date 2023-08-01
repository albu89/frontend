import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PatientRecordService } from '../service/patient-record.service';
import { PatientRecord } from '../shared/PatientRecord';
import { ScoringResponse } from '../shared/ScoringResponse';

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

  constructor(private patientRecordService: PatientRecordService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.patientRecordService.getRecords().subscribe((records) => this.patientRecords = records.sort((a, b) => {
      return new Date(b.requestTimeStamp).getTime() - new Date(a.requestTimeStamp).getTime();
    }));
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
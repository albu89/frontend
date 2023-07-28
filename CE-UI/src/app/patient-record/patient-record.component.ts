import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PatientRecordService } from '../service/patient-record.service';
import { PatientRecord } from '../shared/PatientRecord';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent {

  patientRecords?: PatientRecord[];
  showDetailsButton = false;

  constructor(private patientRecordService: PatientRecordService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.patientRecordService.getRecords().subscribe((records) => this.patientRecords = records);
  }

  getSpecificRecords(patientName: string, patientLastName: string, patientBirthdate: string) {
    this.patientRecordService
      .getSpecificRecords(patientName, patientLastName, patientBirthdate)
      .subscribe((records: PatientRecord[]) => { 
        this.showDetailsButton = patientName && patientLastName && patientBirthdate ? true : false;
        this.patientRecords = records })
  }
}
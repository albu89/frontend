import { Component } from '@angular/core';
import { PatientRecordService } from '../service/patient-record.service';
import { PatientRecord } from '../shared/PatientRecord';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent {

  patientRecords ?: PatientRecord[];

  constructor(private patientRecordService : PatientRecordService) {}

  ngOnInit() {
    this.patientRecordService.getRecords().subscribe((records) => this.patientRecords = records);
  }

  getSpecificRecords(patientName : string, patientLastName : string, patientBirthdate : string) {
    this.patientRecordService
    .getSpecificRecords(patientName, patientLastName, patientBirthdate)
    .subscribe((records: PatientRecord[]) => this.patientRecords = records)
  }
}
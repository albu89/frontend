import { AfterViewInit, Component, Input } from '@angular/core';
import { CategoryComponent } from '@features/patient-details/category/category.component';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { Patient } from '@models/patient/patient.model';
import { SharedModule } from '@shared/shared.module';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'ce-patient-data-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [SharedModule, CategoryComponent],
  standalone: true,
})
export class PatientDataFormComponent implements AfterViewInit {
  @Input() public uniqueCategories: string[] = [];
  @Input() public biomarkers!: Biomarker;
  @Input() public patient!: Patient;
  @Input() public canEdit = true;

  public ngAfterViewInit() {
    initFlowbite();
  }

  public setDateOfBirth(input: Date) {
    this.patient.dateOfBirth = input;
  }
}

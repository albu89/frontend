import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PatientRecordService } from '@services/patient-record.service';
import { PatientDetailsState } from '@features/patient-details/_models/patient-details.state';
import {
  editPatientDetails,
  loadBiomarkerSchema,
  loadPatientDetails,
  saveDraftScore,
  savePatientDetails,
  updateUserPreferences,
} from '@features/patient-details/_store/patient-details.effects';
import { SchemasService } from '@services/schemas.service';
import { FormMode } from '@features/patient-details/_models/form-mode';
import { BiomarkerService } from '@services/biomarker.service';
import { MedicalHistoryBiomarkerFiltered } from '@features/patient-details/_models/medical-history-biomarker-filtered.model';
import { UserService } from '@services/user.service';
import { MessageService } from '@services/message.service';

@Injectable()
export class PatientDetailsStore extends ComponentStore<PatientDetailsState> {
  public constructor(
    public readonly biomarkerService: BiomarkerService,
    public readonly schemaService: SchemasService,
    public readonly patientRecordService: PatientRecordService,
    public readonly messageService: MessageService,
    public readonly userService: UserService
  ) {
    super({
      isLoading: false,
      currentScore: undefined,
      patient: { lastname: '', firstname: '', dateOfBirth: null, requestId: undefined },
      biomarkerTemplate: undefined,
      patientData: undefined,
      formMode: FormMode.add,
      isEditingEnabled: false,
    });
  }

  //
  // *********** Selectors *********** //
  //
  // public readonly isLoading$ = this.select(state => state.isLoading);
  public readonly isEditingEnabled$ = this.select(state => state.isEditingEnabled);
  public readonly currentScore$ = this.select(state => state.currentScore);
  public readonly patient$ = this.select(state => state.patient);
  //TODO: check if sorting works properly after backend is up-to-date
  public readonly biomarkerTemplate$ = this.select(state => {
    state.biomarkerTemplate?.labResults.sort((a, b) => a.orderIndex - b.orderIndex);
    state.biomarkerTemplate?.medicalHistory.sort((a, b) => a.orderIndex - b.orderIndex);
    return state.biomarkerTemplate;
  });
  public readonly fixedBiomarkersByCategory$ = this.select(this.biomarkerTemplate$, template => {
    if (!template) return [];
    const filteredList: MedicalHistoryBiomarkerFiltered[] = [];
    Object.entries(template.categories.medicalHistory).forEach(([categoryKey, categoryName]) => {
      const biomarkerListByCategory = template?.medicalHistory.filter(i => i.categoryId === categoryKey);
      filteredList.push({
        name: categoryName,
        list: biomarkerListByCategory,
      });
    });
    return filteredList;
  });
  public readonly patientData$ = this.select(state => state.patientData);
  public readonly formMode$ = this.select(state => state.formMode);

  //
  // *********** Updaters *********** //
  //
  public readonly setFormMode = this.updater((state, formMode: FormMode) => ({
    ...state,
    formMode: formMode,
  }));

  public readonly setIsEditingEnabled = this.updater((state, isEditingEnabled: boolean) => ({
    ...state,
    isEditingEnabled: isEditingEnabled,
  }));

  //
  // *********** Effect *********** //
  //
  public readonly loadBiomarkerSchema = this.effect(loadBiomarkerSchema(this));
  public readonly savePatientDetails = this.effect(savePatientDetails(this));
  public readonly saveDraftScore = this.effect(saveDraftScore(this));
  public readonly editPatientDetails = this.effect(editPatientDetails(this));
  public readonly loadPatientDetails = this.effect(loadPatientDetails(this));
  public readonly saveUserPreferences = this.effect(updateUserPreferences(this));
}

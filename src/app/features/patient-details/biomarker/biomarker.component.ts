import { AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, Input, OnInit } from '@angular/core';
import { BiomarkerUnitType } from '@core/enums/biomarker-unit-type.enum';
import { BiomarkerUnit } from '@models/biomarker/biomarker-unit.model';
import { Biomarker } from '@models/biomarker/biomarker.model';
import { UserService } from '@services/user.service';
import { LanguageService } from '@services/language.service';
import { SharedModule } from '@shared/shared.module';
import { validateBiomarkerEntry } from '@shared/utils/biomarker-utils';
import { initFlowbite } from 'flowbite';
import { ClinicalSetting } from '@core/enums/clinical-setting.enum';

@Component({
  selector: 'ce-biomarker',
  templateUrl: './biomarker.component.html',
  styleUrls: ['./biomarker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
  standalone: true,
})
export class BiomarkerComponent implements OnInit, AfterViewInit, DoCheck {
  @Input() public biomarker!: Biomarker;
  @Input() public sideEffectMarkers: Biomarker[] = [];
  @Input() public unitTypeEditable = false;

  public inputTypeEnum: typeof InputType = InputType;
  public requiredType: InputType = InputType.Selection;
  private timerId?: NodeJS.Timeout;

  public constructor(
    private readonly userService: UserService,
    private readonly langService: LanguageService
  ) {}

  public onChange(newValue: BiomarkerUnit) {
    this.biomarker.selectedUnit = newValue;
    this.biomarker.preferredUnit = newValue.unitType;
    validateBiomarkerEntry(this.biomarker, this.langService);
  }

  // TODO: This is not super elegant. Let's find a solution with Xavier.
  public onValueChanged() {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      validateBiomarkerEntry(this.biomarker, this.langService);
    }, 350);
  }

  public ngOnInit() {
    // Special handling for Input range for qwave
    if (this.biomarker.id === 'q_wave') {
      const currentUser = this.userService.currentUserSubject.getValue();
      const priorCAD = this.sideEffectMarkers.find(marker => marker.id === 'prior_CAD');
      const higherPrevalence = !!(currentUser?.clinicalSetting === ClinicalSetting.SecondaryCare || priorCAD?.value);
      const filter = higherPrevalence ? ClinicalSetting.SecondaryCare : ClinicalSetting.PrimaryCare;
      const a = this.biomarker.units.find(unit => unit.clinicalSetting === filter) ?? this.biomarker.units[0];
      this.biomarker.selectedUnit = a;
      this.biomarker.preferredUnit = BiomarkerUnitType[this.biomarker.selectedUnit.unitType];
    } else {
      if (this.biomarker.units.length > 1) {
        this.biomarker.preferredUnit ??= BiomarkerUnitType[BiomarkerUnitType.SI];
        this.biomarker.selectedUnit =
          this.biomarker.units.filter(unit => BiomarkerUnitType[unit.unitType] === this.biomarker.preferredUnit)[0] ??
          this.biomarker.units[0];
        this.biomarker.preferredUnit = BiomarkerUnitType[this.biomarker.selectedUnit.unitType];
      } else if (this.biomarker.units.length === 1) {
        const onlyUnit = this.biomarker.units[0];
        this.biomarker.preferredUnit = BiomarkerUnitType[onlyUnit.unitType];
        this.biomarker.selectedUnit = onlyUnit;
      } else {
        //eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        this.biomarker.selectedUnit = {} as BiomarkerUnit; //TODO: improve (maybe this will be solved by the new biomarker schema)
        this.requiredType = InputType.String;
      }
    }
    switch (this.biomarker.selectedUnit.type.toLowerCase()) {
      case 'string':
        this.requiredType = this.biomarker.selectedUnit.enum ? InputType.Selection : InputType.String;
        break;
      case 'boolean':
        this.requiredType = InputType.Selection;
        break;
      case 'integer':
      case 'float':
        this.requiredType = InputType.Number;
        break;
    }
  }

  public ngAfterViewInit() {
    initFlowbite();
  }

  public ngDoCheck() {
    if (this.biomarker.id === 'q_wave') {
      const currentUser = this.userService.currentUserSubject.getValue();
      const priorCAD = this.sideEffectMarkers.find(marker => marker.id === 'prior_CAD');
      const higherPrevalence = !!(currentUser?.clinicalSetting === ClinicalSetting.SecondaryCare || priorCAD?.value);
      const prevalence = higherPrevalence ? ClinicalSetting.SecondaryCare : ClinicalSetting.PrimaryCare;
      this.biomarker.selectedUnit =
        this.biomarker.units.find(unit => unit.clinicalSetting === prevalence) ?? this.biomarker.units[0];
      this.biomarker.preferredUnit = BiomarkerUnitType[this.biomarker.selectedUnit.unitType];
    }
  }
}

enum InputType {
  Selection,
  Number,
  Boolean,
  String,
}

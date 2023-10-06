import {Component, Input, OnInit} from '@angular/core';
import {
  Biomarker,
  BiomarkerUnit,
  BiomarkerUnitType,
  isStringValue,
  validateEntry,
} from '../shared/biomarker';
import {UserService} from '../service/user.service';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-biomarker',
  templateUrl: './biomarker.component.html',
  styleUrls: ['./biomarker.component.css'],
})
export class BiomarkerComponent implements OnInit {
  @Input() biomarker: Biomarker = {} as Biomarker;
  @Input() sideEffectMarkers: Biomarker[] = [];
  @Input() unitTypeEditable = false;

  inputTypeEnum: typeof InputType = InputType;
  requiredType: InputType = InputType.Selection;
  infotextVisible = false;
  timerId?: NodeJS.Timeout;
  choices?: Map<string, string>

  constructor(private userService: UserService, private langService: LanguageService) {
  }

  onChange(newValue: BiomarkerUnit) {
    this.biomarker.selectedUnit = newValue;
    validateEntry(this.biomarker, this.langService);
  }
  isStringValue = isStringValue;

  onValueChanged() {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      validateEntry(this.biomarker, this.langService);
    }, 350)
  }

  ngOnInit() {
    // Special handling for Input range for qwave
    if (this.biomarker.id === 'q_wave') {
      const currentUser = this.userService.currentUserSubject.getValue();
      const priorCAD = this.sideEffectMarkers.find(marker => marker.id === 'prior_CAD');
      const higherPrevalence = !!(currentUser?.clinicalSetting === 'SecondaryCare' || priorCAD?.value);
      const filter = higherPrevalence ? 'SecondaryCare' : 'PrimaryCare';
      const a = this.biomarker.units.find(unit => unit.clinicalSetting === filter) ?? this.biomarker.units[0];
      this.biomarker.selectedUnit = a;
      this.biomarker.preferredUnit = BiomarkerUnitType[this.biomarker.selectedUnit.unitType];
    } else {
      if (this.biomarker.units.length > 1) {
        this.biomarker.preferredUnit ??= BiomarkerUnitType[BiomarkerUnitType.SI];
        this.biomarker.selectedUnit = this.biomarker.units.filter((unit) =>
          BiomarkerUnitType[unit.unitType] === this.biomarker.preferredUnit)[0] ?? this.biomarker.units[0];
        this.biomarker.preferredUnit = BiomarkerUnitType[this.biomarker.selectedUnit.unitType];
      } else if (this.biomarker.units.length === 1) {
        const onlyUnit = this.biomarker.units[0];
        this.biomarker.preferredUnit = BiomarkerUnitType[onlyUnit.unitType];
        this.biomarker.selectedUnit = onlyUnit;
      } else {
        this.biomarker.selectedUnit = {} as BiomarkerUnit;
        this.requiredType = InputType.String;
      }
    }
    switch (this.biomarker.selectedUnit.type.toLowerCase()) {
      case "string":
        this.requiredType = this.biomarker.selectedUnit.enum ? InputType.Selection : InputType.String;
        break;
      case "boolean":
        this.requiredType = InputType.Selection;
        break;
      case "integer":
      case "float":
        this.requiredType = InputType.Number;
        break;
    }
    const displayNames = this.biomarker.selectedUnit.displayNames;
    const enums = this.biomarker.selectedUnit?.enum ? new Map<string, string>(this.biomarker.selectedUnit?.enum?.map((obj) => [obj, obj])) : undefined;
    const values = this.biomarker.selectedUnit?.values ? new Map<string, string>(this.biomarker.selectedUnit?.values?.map((obj) => [obj, obj])) : undefined
    this.choices = displayNames || enums || values;
  }

  ngDoCheck() {
    if (this.biomarker.id === 'q_wave') {
      const currentUser = this.userService.currentUserSubject.getValue();
      const priorCAD = this.sideEffectMarkers.find(marker => marker.id === 'prior_CAD');
      const higherPrevalence = !!(currentUser?.clinicalSetting === 'SecondaryCare' || priorCAD?.value);
      const prevalence = higherPrevalence ? 'SecondaryCare' : 'PrimaryCare';
      this.biomarker.selectedUnit = this.biomarker.units.find(unit => unit.clinicalSetting === prevalence) ?? this.biomarker.units[0];
      const displayNames = this.biomarker.selectedUnit.displayNames;
      const enums = this.biomarker.selectedUnit?.enum ? new Map<string, string>(this.biomarker.selectedUnit?.enum?.map((obj) => [obj, obj])) : undefined;
      const values = this.biomarker.selectedUnit?.values ? new Map<string, string>(this.biomarker.selectedUnit?.values?.map((obj) => [obj, obj])) : undefined
      this.choices = displayNames || enums || values;
      this.biomarker.preferredUnit = BiomarkerUnitType[this.biomarker.selectedUnit.unitType];
    }
  }

  setValue(value: string) {
    if (this.biomarker.selectedUnit.type.toUpperCase() === 'Boolean'.toUpperCase()) {
      this.biomarker.value = 'Yes'.toUpperCase() === value.toUpperCase();
    } else {
      this.biomarker.value = value;
    }
    validateEntry(this.biomarker, this.langService);
  }
}

enum InputType {
  Selection,
  Number,
  Boolean,
  String
}

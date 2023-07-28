import { Component, Input } from '@angular/core';
import {
  Biomarker,
  BiomarkerUnit,
  BiomarkerUnitType,
} from '../shared/biomarker';

@Component({
  selector: 'app-biomarker',
  templateUrl: './biomarker.component.html',
  styleUrls: ['./biomarker.component.css'],
})
export class BiomarkerComponent {
  @Input() biomarker: Biomarker = {} as Biomarker;
  inputTypeEnum: typeof InputType = InputType;
  requiredType: InputType = InputType.Selection;
  infotextVisible = false;

  ngOnInit() {
    if (this.biomarker.units.length > 1) {
      this.biomarker.preferredUnit ??= BiomarkerUnitType[BiomarkerUnitType.SI];
      this.biomarker.selectedUnit = this.biomarker.units.filter((unit) =>
          BiomarkerUnitType[unit.unitType] === this.biomarker.preferredUnit)[0] ?? this.biomarker.units[0];
      this.biomarker.preferredUnit = BiomarkerUnitType[this.biomarker.selectedUnit.unitType];
    } else if(this.biomarker.units.length === 1){
      const onlyUnit = this.biomarker.units[0];
      this.biomarker.preferredUnit = BiomarkerUnitType[onlyUnit.unitType];
      this.biomarker.selectedUnit = onlyUnit;
    }    
    else {
      this.biomarker.selectedUnit = {} as BiomarkerUnit;
      this.requiredType = InputType.String;
    }

    switch(this.biomarker.selectedUnit.type.toLowerCase()){
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
  }

  setValue(value: string) {
    if (this.biomarker.selectedUnit.type.toUpperCase() === 'Boolean'.toUpperCase()) {
      this.biomarker.value = 'Yes'.toUpperCase() === value.toUpperCase();
    } else {
      this.biomarker.value = value;
    }
  }

  showInfoText() {
    this.infotextVisible = !this.infotextVisible;
  }
}

enum InputType {
  Selection,
  Number,
  Boolean,
  String
}

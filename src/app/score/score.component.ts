import { Component, Input } from '@angular/core';
import { ScoringResponse } from '../shared/ScoringResponse';
import { SchemasService } from '../service/schemas.service';
import { ScoringResponseSchema } from '../shared/ScoringResponseSchema';
import { BiomarkersInfo } from '../shared/biomarkersInfo';
import { Biomarker } from '../shared/biomarker';
import { MockedScoringResponse } from '../shared/Mock/MockedScoringResponse';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {

  @Input() score: ScoringResponse = new MockedScoringResponse;
  @Input() firstname = '';
  @Input() lastname = '';
  @Input() birthdate = new Date;
  schema: ScoringResponseSchema = {} as ScoringResponseSchema;
  abbreviationKeys: string[] = [];

  anamnesisMarkers: Biomarker[] = [];
  medicationMarkers: Biomarker[] = [];
  valueMarkers: Biomarker[] = [];

  constructor(private schemaService: SchemasService) {
  }

  ngOnInit() {
    this.schemaService.getResponseSchema().subscribe(
      (response) => {
        this.schema = response;
        this.abbreviationKeys = Object.keys(this.schema.abbreviations);
        this.anamnesisMarkers = this.schema.biomarkers.filter(x => x.category === 'Anamnesis');
        this.medicationMarkers = this.schema.biomarkers.filter(x => x.category === 'Medication' || x.category === 'Clinical findings');
        this.valueMarkers = this.schema.biomarkers.filter(x => x.category === 'Enzymes' || x.category === 'Blood Sugar' || x.category === 'Metabolite' || x.category === 'Lipids' || x.category === 'Protein' || x.category === '');
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getBiomarkerValue(id: string): number | Date | string | boolean {
    id = id.replace(/_/g, "");
    return this.score.biomarkers[id as keyof BiomarkersInfo];
  }

  getBiomarkerUnit(id: string): string {
    const idClean = id.replace(/_/g, "");
    const resUnit = this.score.biomarkers[`${idClean}Unit` as keyof BiomarkersInfo]
    const [marker] = this.schema.biomarkers.filter(b => b.id === id);
    const [unit] =  marker.units.filter(unit => unit.unitType === resUnit);
    return unit?.name;
  }

  tableHidden = true;

  toggleTable() {
    this.tableHidden = !this.tableHidden;
  }

}
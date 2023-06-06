import { Component, Input } from '@angular/core';
import { ScoringResponse } from '../shared/ScoringResponse';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  @Input() score: ScoringResponse = {} as ScoringResponse;

}

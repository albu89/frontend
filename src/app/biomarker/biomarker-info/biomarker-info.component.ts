import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ce-biomarker-info',
  templateUrl: './biomarker-info.component.html',
  styleUrls: ['./biomarker-info.component.scss'],
})
export class BiomarkerInfoComponent implements OnInit {
  @Input() public Header = '';
  @Input() public Value?: number | Date | boolean | string;
  @Input() public InfoText = '';
  @Input() public Unit = '';
  @Input() public isDate = false;

  public DateValue: number | null = null;
  public isBoolean = false;

  public ngOnInit() {
    this.DateValue = this.isDate ? Date.parse(this.Value as string) : null;
    this.isBoolean = typeof this.Value === 'boolean';
  }
}

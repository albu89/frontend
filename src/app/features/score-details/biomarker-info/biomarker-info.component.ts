import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';

@Component({
  selector: 'ce-biomarker-info',
  templateUrl: './biomarker-info.component.html',
  styleUrls: ['./biomarker-info.component.scss'],
  imports: [SharedModule, TooltipComponent],
  standalone: true,
})
export class BiomarkerInfoComponent implements OnInit {
  @Input() public Header = '';
  @Input() public Value?: number | Date | boolean | string | null;
  @Input() public InfoText = '';
  @Input() public Unit? = '';
  @Input() public isDate = false;

  public DateValue: number | null = null;
  public isBoolean = false;

  public ngOnInit() {
    this.DateValue = this.isDate ? Date.parse(this.Value as string) : null;
    this.isBoolean = typeof this.Value === 'boolean';
  }
}

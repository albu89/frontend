import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'ce-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements AfterViewInit {
  @Input() public infoText!: string;
  @Input() public tooltipId!: string;

  public ngAfterViewInit() {
    initFlowbite();
  }
}

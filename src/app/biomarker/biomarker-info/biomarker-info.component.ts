import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-biomarker-info',
	templateUrl: './biomarker-info.component.html',
	styleUrls: ['./biomarker-info.component.css'],
})
export class BiomarkerInfoComponent implements OnInit {
	@Input() Header = '';
	@Input() Value?: number | Date | boolean | string;
	@Input() InfoText = '';
	@Input() Unit = '';
	@Input() isDate = false;

	DateValue: number | null = null;
	isBoolean = false;

	ngOnInit() {
		this.DateValue = this.isDate ? Date.parse(this.Value as string) : null;
		this.isBoolean = typeof this.Value === 'boolean';
	}
}

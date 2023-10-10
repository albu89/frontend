import { Component, Input } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'tr[app-footnote]',
	templateUrl: './footnote.component.html',
	styleUrls: ['./footnote.component.css'],
})
export class FootnoteComponent {
	@Input() header = '';
	@Input() text = '';
}

import { Component, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[ce-footnote]',
  templateUrl: './footnote.component.html',
  styleUrls: ['./footnote.component.scss'],
})
export class FootnoteComponent {
  @Input() public header = '';
  @Input() public text = '';
}

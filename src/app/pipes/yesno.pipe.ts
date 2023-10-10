import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../service/language.service';
import { Observable } from 'rxjs';

@Pipe({
	name: 'yesno',
})
export class YesnoPipe implements PipeTransform {
	constructor(private languageService: LanguageService) {}

	transform(value: boolean): Observable<string> {
		return value ? this.languageService.translate.get('yes') : this.languageService.translate.get('no');
	}
}

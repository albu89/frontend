import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Biomarker} from "../../shared/biomarker";

@Component({
    selector: 'app-category-list-flexible',
    templateUrl: './category-list-flexible.component.html',
    styleUrls: ['./category-list-flexible.component.css']
})
export class CategoryListFlexibleComponent {
    @Input() public biomarkers!: Biomarker[];
    @Output() public isEditingEnabled = new EventEmitter<boolean>();

  protected enableEditMode(): void {
        this.isEditingEnabled.emit(true);
    }
}

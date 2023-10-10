import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Biomarker, BiomarkerDragItem } from '../../shared/biomarker';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
	selector: 'app-category-list-flexible-edit',
	templateUrl: './category-list-flexible-edit.component.html',
	styleUrls: ['./category-list-flexible-edit.component.css'],
})
export class CategoryListFlexibleEditComponent {
	@Input() public biomarkers!: Biomarker[];
	@Output() public saveChanges = new EventEmitter<boolean>();

	protected dropItem(event: CdkDragDrop<BiomarkerDragItem>): void {
		// update array of biomarkers with the order of the item dragged
		const element = this.biomarkers[event.previousContainer.data.index];
		this.biomarkers.splice(event.previousContainer.data.index, 1);
		this.biomarkers.splice(event.container.data.index, 0, element);
	}

	protected savePreferences(): void {
		this.saveChanges.emit(true);
	}
}

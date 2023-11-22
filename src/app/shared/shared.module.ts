import { CdkDrag, CdkDragPlaceholder, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetDirective } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { YesnoPipe } from '@shared/pipes/yesno.pipe';
import { ToastrModule } from 'ngx-toastr';

const ExternalModules = [CdkDrag, CdkDropList, CdkDropListGroup, CdkDragPlaceholder, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [YesnoPipe],
  imports: [CommonModule, ...ExternalModules, TranslateModule, LetDirective, ToastrModule.forRoot()],
  exports: [YesnoPipe, ...ExternalModules, TranslateModule, CommonModule, LetDirective],
})
export class SharedModule {}

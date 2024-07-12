import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityDiagramsComponent } from './diagram-paper/diagram-paper.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatRow, MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadDiagramModalComponent } from './modals/load-diagram-modal/load-diagram-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { SaveDiagramModalComponent } from './modals/save-diagram-modal/save-diagram-modal.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { MatStepperModule } from '@angular/material/stepper';
import { GenerateCodeModalComponent } from './modals/generate-code-modal/generate-code-modal.component';
import { AddBlockModalComponent } from './modals/add-block-modal/add-block-modal.component';
import { EditBlockModalComponent } from './modals/edit-block-modal/edit-block-modal.component';
import { OperatorsComponent } from './operators/operators.component';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { FilePickerComponent } from './modals/file-picker/file-picker.component';
@NgModule({
    declarations: [ActivityDiagramsComponent, LoadDiagramModalComponent, SaveDiagramModalComponent, ConfirmModalComponent, GenerateCodeModalComponent, AddBlockModalComponent, EditBlockModalComponent, OperatorsComponent, ToolboxComponent, FilePickerComponent],
    imports: [CommonModule, FormsModule, MatSlideToggleModule, MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule,
        MatSliderModule, MatIconModule, MatTooltipModule, MatMenuModule, MatSnackBarModule, MatSelectModule, MatDialogModule, MatStepperModule],
})

export class ActivityDiagramsModule { }
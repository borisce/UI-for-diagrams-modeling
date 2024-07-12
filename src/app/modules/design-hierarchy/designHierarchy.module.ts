import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramPaperComponent } from './diagram-paper/diagram-paper.component';
import { DesignHierarchyLayoutComponent } from './design-hierarchy-layout/designHierarchyLayout.component';
import { FormsModule } from '@angular/forms';
import { DesignHierarchyRoutingModule } from 'src/app/routing/visualization-routing/design-hierarchy-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [DiagramPaperComponent, DesignHierarchyLayoutComponent],
  imports: [CommonModule, FormsModule, DesignHierarchyRoutingModule, MatTableModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDividerModule,
    MatCardModule, MatSlideToggleModule, MatSliderModule, MatSnackBarModule, ReactiveFormsModule,
    MatTooltipModule, MatListModule, MatMenuModule, SharedModule, MatSelectModule,
    TreeViewModule, MatAutocompleteModule, MatDialogModule, MatTreeModule,
    MatCheckboxModule, MatProgressSpinnerModule],
})

export class DesignHierarchyModule {
}

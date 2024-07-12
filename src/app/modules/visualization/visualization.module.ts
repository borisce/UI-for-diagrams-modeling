import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VisualizationRoutingModule} from 'src/app/routing/visualization-routing/visualization-routing.module';
import {VisualizationMenuComponent} from './components/visualizationMenu/visualizationMenu.component';
import {ModalDialogWindowsComponent} from './components/modal-dialog-windows/modal-dialog-windows.component';
import {DiagramPaperComponent} from './components/diagram-paper/diagram-paper.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextAreaComponent} from './components/text-area/text-area.component';
import {SubdiagramPaperComponent} from './components/subdiagram-paper-component/subdiagram-paper-component.component';
import {jqxButtonModule} from 'jqwidgets-ng/jqxbuttons';
import {jqxWindowModule} from 'jqwidgets-ng/jqxwindow';
import {jqxCheckBoxModule} from 'jqwidgets-ng/jqxcheckbox';
import {jqxTabsModule} from 'jqwidgets-ng/jqxtabs';
import {jqxMenuModule} from 'jqwidgets-ng/jqxmenu';
import {DiagramGenerationComponent} from './components/diagram-generation/diagram-generation.component';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    VisualizationMenuComponent,
    ModalDialogWindowsComponent,
    DiagramPaperComponent,
    TextAreaComponent,
    SubdiagramPaperComponent,
    DiagramGenerationComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        VisualizationRoutingModule,
        jqxButtonModule,
        jqxWindowModule,
        jqxCheckBoxModule,
        jqxTabsModule,
        jqxMenuModule,
        MatRippleModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        SharedModule
    ]
})
export class VisualizationModule { }

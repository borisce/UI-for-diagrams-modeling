import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiagramPaperComponent} from './diagram-paper/diagram-paper.component';
import {StateMachinesMenuComponent} from './statemachinesmenu/statemachinesmenu.component';
import {FormsModule} from '@angular/forms';
import {FormsComponent} from './formsandwindows/forms.component';
import {VhdlCodeGeneratorComponent} from './generate-vhdl-code/vhdl-code-generator';
import {
  SystemVerilogCodeGeneratorComponent
} from './generate-systemverilog-code/systemverilog-code-generator.component';
import {StateMachinesRoutingModule} from 'src/app/routing/visualization-routing/statemachines-routing.module';
import {InputOutputTables} from './input-output-tables/input-output-tables';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ReactiveFormsModule} from '@angular/forms';
import {GenerateCodeFormsComponent} from './generate-code-forms/generate-code-forms.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {SharedModule} from '../../shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import {LoadXmlFileComponent} from './load-xml-file/load-xml-file';
import {
  GenerateDiagramFromSystemVerilogComponent
} from './generate-diagram-from-code/generate-diagram-from-systemverilog';
import {GenerateDiagramFromVhdlComponent} from './generate-diagram-from-code/generate-diagram-from-vhdl';
import {GenerateDiagramFromVerilogComponent} from './generate-diagram-from-code/generate-diagram-from-verilog';
import {GenerateStatePositionsComponent} from './other-classes/generate-state-positions.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [DiagramPaperComponent, StateMachinesMenuComponent, FormsComponent,
    InputOutputTables, SystemVerilogCodeGeneratorComponent, VhdlCodeGeneratorComponent,
    GenerateCodeFormsComponent, LoadXmlFileComponent,
    GenerateDiagramFromSystemVerilogComponent, GenerateDiagramFromVhdlComponent,
    GenerateDiagramFromVerilogComponent, GenerateStatePositionsComponent],
  imports: [CommonModule, FormsModule, StateMachinesRoutingModule, MatTableModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDividerModule,
    MatCardModule, MatSlideToggleModule, MatSliderModule, MatSnackBarModule, ReactiveFormsModule,
    MatTooltipModule, MatListModule, MatMenuModule, SharedModule, MatSelectModule,
    MatAutocompleteModule],
})

export class StateMachinesModule {
}

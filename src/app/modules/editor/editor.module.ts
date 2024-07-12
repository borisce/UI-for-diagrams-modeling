import { NgModule } from "@angular/core";
import { MonacoEditorModule } from "ngx-monaco-editor";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditorComponentComponent } from "./editor-component/editor-component.component";
import { BrowserModule } from "@angular/platform-browser";
import { TreeViewModule } from "@syncfusion/ej2-angular-navigations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { EditorTileComponent } from "./editor-component/editor-tile/editor-tile.component";
import { EditorTabsComponent } from "./editor-component/editor-tabs/component/editor-tabs.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SharedModule } from "../../shared/shared.module";
import { EditorTabComponent } from "./editor-component/editor-tabs/component/editor-tab/editor-tab.component";
import { MatRippleModule } from "@angular/material/core";
import { MatTreeModule } from "@angular/material/tree";
import { MatBadgeModule } from "@angular/material/badge";
import { EditorTerminalComponent } from "./editor-component/editor-terminal/editor-terminal.component";
import { AngularSplitModule } from "angular-split";
import { EditorConfigurationComponent } from "./editor-component/editor-configuration/editor-configuration.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { EditorVisualisationToolComponent } from "./editor-component/editor-visualisation-tool/editor-visualisation-tool.component";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenuModule } from "@angular/material/menu";
import { AngularPaneManagerModule } from "@openopus/angular-pane-manager";

import {MatFormFieldModule} from '@angular/material/form-field';
import {
  SimulationResultsComponent
} from './editor-component/editor-sidebar/simulation-results/simulation-results.component';
import {
  SynthesisResultsComponent
} from './editor-component/editor-sidebar/synthesis-results/synthesis-results.component';
import {IpCoresComponent} from './editor-component/editor-sidebar/ip-cores/ip-cores.component';
import {SourceControlComponent} from './editor-component/editor-sidebar/source-control/source-control.component';
import {onMonacoLoadObservable} from './monacoOnLoad';
import {
  EditorSettingsPopUpComponent
} from './editor-component/editor-tile/editor-settings-pop-up/editor-settings-pop-up.component';

import {MatSliderModule} from '@angular/material/slider';
import {SynthesisTerminalComponent} from './editor-component/synthesis-terminal/synthesis-terminal.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {RouterLinkWithHref} from "@angular/router";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";
import { CodeReviewComponent } from './editor-component/editor-sidebar/code-review/code-review.component';

const monacoConfig: any = {
  onMonacoLoad: () => {
    onMonacoLoadObservable.next();
  },
};

@NgModule({
  declarations: [
    EditorComponentComponent,
    EditorTileComponent,
    EditorTabsComponent,
    EditorTabComponent,
    EditorSettingsPopUpComponent,
    EditorTerminalComponent,
    SynthesisTerminalComponent,
    EditorConfigurationComponent,
    SimulationResultsComponent,
    SynthesisResultsComponent,
    IpCoresComponent,
    SourceControlComponent,
    CodeReviewComponent,
    EditorVisualisationToolComponent,
    EditorSettingsPopUpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig),
    TreeViewModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTooltipModule,
    DragDropModule,
    SharedModule,
    MatRippleModule,
    MatBadgeModule,
    AngularSplitModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ReactiveFormsModule,
    AngularPaneManagerModule,
    MatFormFieldModule,
    MatTreeModule,
    MatSliderModule,
    MatPaginatorModule,
    RouterLinkWithHref,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [
    EditorComponentComponent,
    EditorVisualisationToolComponent,
    MonacoEditorModule,
    BrowserModule,
  ],
})
export class EditorModule {}

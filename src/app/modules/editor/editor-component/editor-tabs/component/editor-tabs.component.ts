import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  headerStyle,
  LayoutBuilder,
  LayoutType,
  PaneHeaderStyle,
  Result,
  RootLayout,
} from "@openopus/angular-pane-manager";
import { Subscription } from "rxjs";
import { ProjectConfiguration } from "src/app/core/model/project-configuration";
import { RepositoryService } from "src/app/core/service/repository.service";
import { EditorComponentComponent } from "../../editor-component.component";
import { EditorTileComponent } from "../../editor-tile/editor-tile.component";
import { Tab } from "../model/tab/tab";
import { EditorTabsService } from "../service/editor-tabs.service";
import { EditorTabComponent } from "./editor-tab/editor-tab.component";
import { environment } from "../../../../../../environments/environment";
import { SimulationConfiguration } from "../../../../../api/models/simulation-configuration";
import { StatusMessageService } from "../../../../../core/service/status-message.service";
import { AuthenticationService } from "../../../../../core/service";
import { UUID } from "antlr4ts/misc/UUID";
import {
  ModalSynthesisSettings,
  SynthesisSettingsModel,
} from "src/app/modal/modal-synthesis-settings/modal-synthesis-settings.component";
import { ApiTTYExistingResponse } from "src/app/core/model/api-ttyexistingresponse";
import { CollabService } from "src/app/core/service/collab.service";
import { CodeReviewService } from "src/app/core/service/code-review.service";
import { first } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: "app-editor-tabs",
  templateUrl: "./editor-tabs.component.html",
  styleUrls: ["./editor-tabs.component.scss"],
})
export class EditorTabsComponent implements OnInit, OnDestroy {
  @Output() changeSidebarWindowEvent = new EventEmitter<string>();
  public editorTabs: EditorTabsComponent;

  public simulationReady: boolean = false;
  @Input() synthesis: boolean;
  @Input() simulations: boolean;
  public synthesisProcessingState: boolean = false;

  public projectConfiguration: ProjectConfiguration;
  /** The pane layout */
  public layout: RootLayout<any> = new RootLayout(undefined);
  /** Header styles */
  public editorHeader: PaneHeaderStyle = headerStyle(
    "visible",
    "Editor",
    "assets/icons/code-slash.svg",
    false
  );
  public configurationHeader: PaneHeaderStyle = headerStyle(
    "visible",
    "Project configuration",
    "assets/icons/gear-fill.svg",
    true
  );
  public terminalHeader: PaneHeaderStyle = headerStyle(
    "visible",
    "Simulator",
    "assets/icons/terminal-fill.svg",
    true
  );
  public synthesisTerminalHeader: PaneHeaderStyle = headerStyle(
    "visible",
    "Synthesis",
    "assets/icons/terminal-fill.svg",
    true
  );
  public waveformHeader: PaneHeaderStyle = headerStyle(
    "visible",
    "Waveform viewer",
    "assets/icons/soundwave.svg",
    true
  );
  @ViewChild("dynamicInsert", { read: ViewContainerRef })
  public dynamicInsert: ViewContainerRef;
  @ViewChild("editorPanel", { read: ViewContainerRef })
  public editorPanel: ViewContainerRef;
  @Input("context") public context: EditorComponentComponent;
  public visibleTerminal: boolean = false;
  public visibleVisualisation: boolean = false;
  public visibleConfiguration: boolean = false;
  public editorSplitDirection: string = "horizontal";
  public testConfigurations: SimulationConfiguration[];
  public readOnly: boolean = false;

  public dumpTracing: boolean = false;
  @ViewChildren("terminalComponent")
  public terminalComponent;
  @ViewChildren("synthesisTerminalComponent")
  public synthesisTerminalComponent;
  @ViewChildren("configurationComponent")
  public configurationComponent;
  public modi;
  private subscriptions: Set<Subscription>;
  private simulationResults: any = [];

  constructor(
    private _editorTabsService: EditorTabsService,
    private resolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient,
    private authService: AuthenticationService,
    private statusMessageService: StatusMessageService,
    private repoService: RepositoryService,
    private collabService: CollabService,
    private router: Router,
    private codeReviewService: CodeReviewService,
    private synthesisDialog: MatDialog
  ) {
    this.subscriptions = new Set<Subscription>();
    this.editorTabsService.onAddedTab.subscribe(() => {
      this.changeDetectorRef.detectChanges();
      // this.addedTab();
    });
    _editorTabsService.onOpenVCD.subscribe(() => {
      if (!this.isElementOpened("waveform")) {
        this.modifyLayout((b) => this.toggleElement(b, "waveform", "right"));
      }
    });
    _editorTabsService.onSimulationConfigSave.subscribe(() => {
      this.checkSimulationConfiguration();
    });

    const result: Result<RootLayout<any>> = LayoutBuilder.empty<any>().build(
      (b) => {
        b.add(b.leaf("editor", "editor", {}, "main"));
      }
    );
    //console.log(typeof result);

    this.layout = result.unwrap();
  }

  get editorTabsService(): EditorTabsService {
    return this._editorTabsService;
  }

  set editorTabsService(value: EditorTabsService) {
    this._editorTabsService = value;
  }

  public getTerminalComponent() {
    const component = this.terminalComponent?.toArray();
    return component !== undefined ? component[0] : null;
  }

  public getSynthesisTerminalComponent() {
    const component = this.synthesisTerminalComponent?.toArray();
    return component !== undefined ? component[0] : null;
  }

  public getConfigurationComponent() {
    const component = this.configurationComponent?.toArray();
    return component !== undefined ? component[0] : null;
  }

  public addedTab = (lastOpenedTab: Tab): void => {
    this.avoidDuplicityOfTabs(lastOpenedTab);
  };

   public redirect(pagename: string): any {
    this.router.navigate(['/' + pagename]);
  }

  public avoidDuplicityOfTabs(lastOpenedTab: Tab): void {
    const { path, title, diff } = lastOpenedTab;
    const duplicateTab = diff
      ? this._editorTabsService.getDiffTab()
      : this._editorTabsService.getTabByFullPath(path, title);
    if (diff && !this.collabService.diffMode)
      this.collabService.diffMode = true;
    if (!diff && this.collabService.diffMode)
      this.collabService.diffMode = false;

    if (diff && duplicateTab) {
      this.editorTabsService.actualTab.file = lastOpenedTab.file;
    }

    if (duplicateTab) {
      this.codeOpen(duplicateTab.id);
    } else {
      this.editorTabsService.tabs.push(lastOpenedTab);
      const editorTabComponent = this.appendEditorTabComponent();
      this.editorTabsService.closeAllCodesAndOpenCode(lastOpenedTab.id);
      editorTabComponent.tab = lastOpenedTab;
      this.openNewEditor(diff);
    }
  }

  public drop(event: CdkDragDrop<string[]>): void {
    this.editorPanel.move(
      this.editorPanel.get(event.previousIndex),
      event.currentIndex
    );
    moveItemInArray(
      this._editorTabsService.tabs,
      event.previousIndex,
      event.currentIndex
    );
  }

  public codeOpen = (id: number): void => {
    const openedTab: Tab = this.editorTabsService.getTabById(id);
    if (!openedTab.diff && this.collabService.diffMode)
      this.collabService.diffMode = false;
    if (openedTab.diff && !this.collabService.diffMode)
      this.collabService.diffMode = true;

    if (!this.editorTabsService.isCodeOpen(id) || openedTab.diff) {
      this.editorTabsService.closeAllCodesAndOpenCode(id);
      this.openNewEditor();
    }

    this.codeReviewService.setOpenedFile(openedTab.documentId);

    this.codeReviewService.editor.deltaDecorations(
      this.editorTabsService.decorations,
      []
    );
  };

  public removeTabButtons = (tabs: Tab[]) => {
    tabs.forEach((tab) => {
      this.closeTab(tab.id);
    });
  };

  public closeTab = (id: number): void => {
    // On close tab, if it is diff tab, set diff mode to false
    if (this.editorTabsService.actualTab.id === id)
      this.collabService.setDiffMode(false, undefined, undefined);

    if (this.editorTabsService.length === 1) {
      this.editorTabsService.actualTab = null;
      this.dynamicInsert.clear();
    } else if (this.editorTabsService.isCodeOpen(id)) {
      const i: number = this.editorTabsService.getIndexInArrayById(id);
      if (i === 0) {
        this.codeOpen(this.editorTabsService.tabs[1].id);
      } else {
        this.codeOpen(this.editorTabsService.tabs[i - 1].id);
      }
    }
    const index: number = this.editorTabsService.getIndexInArrayById(id);
    this.editorPanel.remove(index);
    this.editorTabsService.removeTabById(id);
  };

  public openNewEditor(diff: boolean = false): void {
    if (this.dynamicInsert) {
      this.dynamicInsert.clear();
    }
    const actualTab: Tab = this.editorTabsService.actualTab;
    if (actualTab !== null) {
      const editorTile: EditorTileComponent = this.appendEditorTileComponent();
      editorTile.parentContainer = this.dynamicInsert;
      if (actualTab.code !== undefined && actualTab.code !== '') {
        editorTile.establishCollabConnection(actualTab.documentId);
        // editorTile.actualCode = actualTab.code;
        // editorTile.readOnly = true;
      } else {
        if (!diff && !actualTab.diff)
          editorTile.establishCollabConnection(actualTab.documentId);
      }
    }
  }

  public async ngOnInit(): Promise<void> {
    await this.updateSimulationInfo();
  }

  public async updateSimulationInfo() {
    this.editorTabs = this;
    this.subscriptions.add(
      this.editorTabsService.onAddedTab.subscribe(this.addedTab)
    );
    this.subscriptions.add(
      this.editorTabsService.onClosedTab.subscribe(this.closeTab)
    );
    this.subscriptions.add(
      this.editorTabsService.onOpenCode.subscribe(this.codeOpen)
    );
    this.subscriptions.add(
      this.editorTabsService.onRemovedFolder.subscribe(this.removeTabButtons)
    );
    if (
      this.repoService.currentRepo.createdBy !==
      this.authService.currentUser.username
    ) {
      this.readOnly = true;
    }

    this.readOnly =
      (this.repoService.currentRepo.authorUUID as unknown as UUID) ===
        this.authService.currentUser.uuid ||
      this.repoService.currentRepo.organizationUUID ===
        this.authService.currentUser.organizationUUID
        ? false
        : true;

    await this.getSimulationResults();
    await this.checkSimulationConfiguration();
  }

  public ngOnDestroy(): void {
    this._editorTabsService.closeAllTabs();
    this.unsubscribeAll();
  }

  public async checkSimulationConfiguration(): Promise<void> {
    await this.http
      .get(
        environment.baseUrl +
          "/repos/" +
          this.repoService.currentRepoUuid +
          "/simulation-configuration"
      )
      .toPromise()
      .then((configs: SimulationConfiguration[]) => {
        const config = configs.find(
          (conf) => conf.simulationTestNumber == null
        );
        this.testConfigurations = configs.filter(
          (conf) => conf.simulationTestNumber != null
        );
        if (config) {
          if (
            config.simulator !== "" &&
            config.testbench_file !== "" &&
            config.top_module_file !== ""
          ) {
            this.simulationReady = true;
          } else {
            this.simulationReady = false;
          }
        }
      })
      .catch((error) => {
        this.simulationReady = false;
      });
  }

  public async onSimulationStart(testNumber = null): Promise<void> {
    if (!this.simulationReady && !testNumber) {
      this.statusMessageService.addError(
        "You have to configure simulation first."
      );
      // show config window
      if (!this.isElementOpened("config")) {
        this.modifyLayout((b) => this.toggleElement(b, "config", "right"));
        this.getTerminalComponent()?.fitTerminal();
        await this.updateMonacoEditorSize();
      }
      return;
    }
    this.modifyLayout((b) =>
      this.setElementVisibility(b, "term", "right", true)
    );
    await this.context.zipFiles();
    if (this.getTerminalComponent().virtualTty.TTY_id === undefined) {
      await this.getTerminalComponent()?.initTty();
      await new Promise((r) => setTimeout(r, 500));
      this.getTerminalComponent()?.fitTerminal();
    } else {
      await this.getTerminalComponent()?.restartSimulation();
      await new Promise((r) => setTimeout(r, 500));
      this.getTerminalComponent()?.fitTerminal();
    }
    this.getTerminalComponent()?.term.writeln("ASICDE: Starting simulation");
    await this.updateMonacoEditorSize();

    // await this.context.setMakefileCallback();
    await this.getTerminalComponent()
      ?.virtualTty.startSimulation(testNumber)
      .toPromise();
  }

  private async getSimulationResults(): Promise<void> {
    await this.repoService
      .getRepositorySimulationResults(this.repoService.currentRepoUuid)
      .toPromise()
      .then((data: any) => (this.simulationResults = data.content));
  }

  public checkSimulationResults(testNumber) {
    return this.simulationResults.some(
      (simulation) =>
        simulation.test &&
        simulation.repo_simulation_configuration.simulationTestNumber ==
          testNumber
    );
  }

  public async onSynthesisClick() {
    if (!this.simulationReady) {
      this.statusMessageService.addError(
        "You have to configure project first."
      );
      // show config window
      if (!this.isElementOpened("config")) {
        this.modifyLayout((b) => this.toggleElement(b, "config", "right"));
        this.getTerminalComponent()?.fitTerminal();
        await this.updateMonacoEditorSize();
      }
      return;
    }
    this.synthesisProcessingState = true;
    this.modifyLayout((b) =>
      this.setElementVisibility(b, "synthesis-term", "right", true)
    );
    await this.context.zipFiles();
    const repoID: string = this.repoService.currentRepoUuid.toString();
    const existingSessions: ApiTTYExistingResponse[] =
      await this.getSynthesisTerminalComponent()?.virtualTtyApi.getExistingSynthesisTTYSession(
        repoID
      );
    const runningSession = existingSessions.find((el) => el.state == "running");
    if (runningSession) {
      this.getSynthesisTerminalComponent()?.snackBar.open(
        "There is running synthesis session. You are being connected...",
        null,
        {
          verticalPosition: "bottom",
          horizontalPosition: "left",
          duration: 5000,
        }
      );
      this.synthesisProcessingState = false;
      this.changeSidebarWindowEvent.emit("synthesis-results");
      await this.getSynthesisTerminalComponent()?.attachToTTY(
        runningSession.id
      );
      this.getSynthesisTerminalComponent()?.connectTerminal();
    } else {
      const data: SynthesisSettingsModel = new SynthesisSettingsModel(
        this.editorTabs
      );
      this.synthesisDialog.open(ModalSynthesisSettings, {
        data,
        width: "600px",
      });
      this.synthesisProcessingState = false;
      this.getSynthesisTerminalComponent()?.fitTerminal();
    }
  }

  public async onSynthesisStart(
    endStep: string,
    technology: string
  ): Promise<void> {
    this.changeSidebarWindowEvent.emit("synthesis-results");
    this.modifyLayout((b) =>
      this.setElementVisibility(b, "synthesis-term", "right", true)
    );
    await this.context.zipFiles();
    this.getSynthesisTerminalComponent()?.term.writeln(
      " ASICDE: Starting synthesis"
    );
    await this.updateMonacoEditorSize();

    // await this.context.setMakefileCallback();
    var response1 = null;
    var response2 = null;
    response1 = await this.getSynthesisTerminalComponent()?.initSynthesisTty(
      endStep,
      technology
    );
    //console.log(response1);
    this.getSynthesisTerminalComponent()?.fitTerminal();
    response2 = await this.getSynthesisTerminalComponent()
      ?.virtualTty.startSynthesis(endStep)
      .toPromise();
    //console.log(response2);
  }

  public async showTerminal(): Promise<void> {
    if (this.isElementOpened("term")) {
      this.modifyLayout((b) => this.toggleElement(b, "term", "right"));
      await new Promise((r) => setTimeout(r, 500));
      await this.updateMonacoEditorSize();
    } else {
      this.modifyLayout((b) => this.toggleElement(b, "term", "right"));
      await new Promise((r) => setTimeout(r, 500));
      this.getTerminalComponent()?.fitTerminal();
      await this.updateMonacoEditorSize();
    }

    await new Promise((r) => setTimeout(r, 500));
    this.getTerminalComponent()?.fitTerminal();
    await this.updateMonacoEditorSize();
  }

  public async onConfigurationClick(): Promise<void> {
    this.modifyLayout((b) => this.toggleElement(b, "config", "right"));
    this.getTerminalComponent()?.fitTerminal();
    await this.updateMonacoEditorSize();
  }

  public async onWaveformClick(): Promise<void> {
    this.modifyLayout((b) => this.toggleElement(b, "waveform", "right"));
    this.getTerminalComponent()?.fitTerminal();
    await this.updateMonacoEditorSize();
  }

  public updateTerminalSize() {
    window.dispatchEvent(new Event("resize"));
    this.getTerminalComponent()?.fitTerminal();
  }

  public async onDownloadClick(): Promise<void> {
    const currentRepo = await this.repoService
      .getRepo(this.repoService.currentRepoUuid)
      .toPromise();
    const uuid: string = currentRepo["uuid"];
    let blob: Blob = await this.repoService.getFiles(uuid).toPromise();
    blob = blob.slice(0, blob.size, "application/zip");
    const url: string = window.URL.createObjectURL(blob);
    window.open(url);
  }

  public async onLayoutChange(ev: RootLayout<any>): Promise<void> {
    this.layout = ev;
    if (!this.isElementOpened("term")) {
      // Handle terminal closed
      this.getTerminalComponent()?.closeWS();
    }
    this.getTerminalComponent()?.fitTerminal();
    await this.updateMonacoEditorSize();
  }

  private modifyLayout(callback: (b: LayoutBuilder<any>) => void): void {
    const result = LayoutBuilder.from(this.layout).build(callback);
    this.layout = result.unwrap();
  }

  private appendEditorTabComponent(): EditorTabComponent {
    const componentFactory: any =
      this.resolver.resolveComponentFactory(EditorTabComponent);
    return this.editorPanel.createComponent(componentFactory)
      .instance as EditorTabComponent;
  }

  private appendEditorTileComponent(): EditorTileComponent {
    const componentFactory: any =
      this.resolver.resolveComponentFactory(EditorTileComponent);
    return this.dynamicInsert.createComponent(componentFactory)
      .instance as EditorTileComponent;
  }

  private unsubscribeAll(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private async updateMonacoEditorSize(): Promise<void> {
    await new Promise((r) => {
      setTimeout(r, 1000);
    });
    window.dispatchEvent(new Event("resize"));
  }

  private toggleElement(b: LayoutBuilder<any>, name: string, position): void {
    const childId = b.root.findChild(
      (c) => c.type === LayoutType.Leaf && c.id === name
    );

    if (childId !== undefined) {
      b.sub(childId.stem, childId.stem.withoutChild(childId.index).layout);
    } else {
      b.add(b.leaf(name, name, {}, position));
    }
  }

  private setElementVisibility(
    b: LayoutBuilder<any>,
    name: string,
    position,
    visibility: boolean
  ) {
    const childId = b.root.findChild(
      (c) => c.type === LayoutType.Leaf && c.id === name
    );

    if (childId !== undefined) {
      // element visible
      if (!visibility) {
        b.sub(childId.stem, childId.stem.withoutChild(childId.index).layout);
      }
    } else {
      // element hidden
      if (visibility) {
        b.add(b.leaf(name, name, {}, position));
      }
    }
  }

  private isElementOpened(name: string): boolean {
    const childId = this.layout.findChild(
      (c) => c.type === LayoutType.Leaf && c.id === name
    );
    return childId !== undefined;
  }
}

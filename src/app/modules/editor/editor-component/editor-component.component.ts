import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation,
} from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import {
  ContextMenu,
  ContextMenuModel,
  MenuEventArgs,
  MenuItemModel,
  NodeClickEventArgs,
  TreeView,
  TreeViewComponent,
} from "@syncfusion/ej2-angular-navigations";
import { enableRipple } from "@syncfusion/ej2-base";
import { ProjectConfiguration } from "src/app/core/model/project-configuration";
import { VirtualTTYapiService } from "src/app/core/service/virtual-ttyapi.service";
import { Success } from "../../../api/collab/models/success";
import { GitService } from "../../../api/collab/services/git.service";
import { FilesService } from "../../../core/fileSystem/Filer/files.service";
import { FileTreeNode } from "../../../core/fileSystem/FileTree/filetree.node.interface";
import { ZipSingleTaskInterface } from "../../../core/fileSystem/ZipWorker/zip-single-task.interface";
import { ZipService } from "../../../core/fileSystem/ZipWorker/zip.service";
import { AuthenticationService, UserService } from "../../../core/service";
import { CollabService } from "../../../core/service/collab.service";
import { RepositoryService } from "../../../core/service/repository.service";
import { ModalCommitPushComponent } from "../../../modal/modal-commit-push/modal-commit-push.component";
import { ModalConfirmComponent } from "../../../modal/modal-confirm/modal-confirm.component";
import {
  FileDialogModel,
  ModalFileNameComponent,
} from "../../../modal/modal-file-name/modal-file-name.component";
import { ModalNewBranchComponent } from "../../../modal/modal-new-branch/modal-new-branch.component";
import { ModalPutCredentialsComponent } from "../../../modal/modal-put-credentials/modal-put-credentials.component";
import { ModalSetMessageComponent } from "../../../modal/modal-set-message/modal-set-message.component";
import { newSvFileTemplate } from "../system_verilog/templates";
import { EditorTabsComponent } from "./editor-tabs/component/editor-tabs.component";
import { FileCode } from "./editor-tabs/model/file-code/file-code";
import { Tab } from "./editor-tabs/model/tab/tab";
import { EditorTabsService } from "./editor-tabs/service/editor-tabs.service";
import { EditorTileComponent } from "./editor-tile/editor-tile.component";
import { onMonacoLoaded, onMonacoLoadObservable } from "../monacoOnLoad";
import { CodecompletionService } from "src/app/api/codecompletion/services";
import { PredictionResponse } from "src/app/api/codecompletion/models/prediction-response";
import { CodeSearchService } from "../system_verilog/jump-to-definition/code-search/code-search.service";
import { Diff, calculateDiffs } from "./editor-sidebar/source-control/source-control.component";
import { FileState } from "src/app/core/model/github";
import { CodeReviewService } from "src/app/core/service/code-review.service";
import { file } from "jszip";
import { environment } from '../../../../environments/environment';

enableRipple(true);

const menuItems: MenuItemModel[] = [
  { text: "Add new module" },
  { text: "Add new entity" },
  { text: "Add new package" },
  { text: "Add new folder" },
  { text: "Rename module" },
  { text: "Rename entity" },
  { text: "Rename package" },
  { text: "Rename folder" },
  { text: "Remove module" },
  { text: "Remove entity" },
  { text: "Remove package" },
  { text: "Remove folder" },
  { text: "Open activity diagram" },
];

const folderMenuItems: string[] = [
  "Add new package",
  "Add new module",
  "Add new entity",
  "Rename folder",
  "Remove folder",
  "Add new folder",
];

const rootMenuItems: string[] = [
  "Add new package",
  "Add new module",
  "Add new entity",
  "Add new folder",
];

const nonRootMenuItems: string[] = [
  "Rename module",
  "Remove module",
  "Rename entity",
  "Remove entity",
  "Rename package",
  "Remove package",
  "Rename folder",
  "Remove folder",
];

const fileMenuItems: string[] = [
  "Rename module",
  "Remove module",
  "Rename entity",
  "Remove entity",
  "Rename package",
  "Remove package",
];

@Component({
  selector: "app-editor-component",
  templateUrl: "./editor-component.component.html",
  styleUrls: ["./editor-component.component.scss"],
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})

/**
 * Main component for TreeView git actions, TreeViewActions.
 */
export class EditorComponentComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  /**
   * Project confiuration attributes
   */
  public topmoduleFile: string;
  public testbenchFile: string;
  public outputFolder: string;
  public outputFile: string;
  public waveformFile: string;
  public readOnly: boolean;
  public errors: Map<string, number> = new Map<string, number>();

  public TTY_id: string;
  public tree: TreeViewComponent;
  public input: any;
  @ViewChild("dynamicInsert", { read: ViewContainerRef })
  public dynamicInsert: ViewContainerRef;
  public zipTasks: Array<ZipSingleTaskInterface> =
    new Array<ZipSingleTaskInterface>();
  public treeObj: TreeView = null;
  public treeNodes: any;
  public loading: boolean = true;
  public loadingAdd: boolean = false;
  public loadingArchive: boolean = false;
  public loadingCommit: boolean = false;
  public loadingPush: boolean = false;
  public objectArray: object[] = [];
  public tooltipPosition = "right";
  public openFile: string;
  public repoName: string = this.repoService.currentRepoName;
  public hierarchicalData: object[] = [];
  public field: object = {
    dataSource: this.hierarchicalData,
    id: "id",
    text: "name",
    child: "subChild",
  };
  public repoMetadataDoc: any;
  public repo: any;
  public currentWindow: string = "project-explorer";
  @ViewChildren("editorComponent")
  public editorComponent;
  public context: EditorComponentComponent;
  private componentRef: ComponentRef<any>;
  private activeNode: FileTreeNode;
  private menuObj: ContextMenu;
  public allActivePackages: any = [];

  // Permissions
  public editor: boolean = true;
  public diagrams: boolean = true;
  public simulations: boolean = true;
  public synthesis: boolean = true;
  // private editorTabsService = new EditorTabsService();

  constructor(
    public dialog: MatDialog,
    public authenticationService: AuthenticationService,
    public repoService: RepositoryService,
    private router: Router,
    private zipWorker: ZipService,
    public fileService: FilesService,
    private resolver: ComponentFactoryResolver,
    private collabService: CollabService,
    private gitService: GitService,
    public snackBar: MatSnackBar,
    private editorTabsService: EditorTabsService,
    private virtualTty: VirtualTTYapiService,
    private completionService: CodecompletionService,
    private codeSearchService: CodeSearchService,
    private http: HttpClient,
  ) {
    onMonacoLoadObservable.subscribe(() => {
      console.log("MONACO LOADING");
      onMonacoLoaded(
        this.treeObj,
        this.collabService,
        this.codeSearchService,
        this.fileService,
        this.getCompletions.bind(this),
        this.editor
      );
      console.log("MONACO LOADED");
    });
  }

  get editorTitle(): string {
    const userName = this.authenticationService.currentUser.username;
    return this.readOnly ? userName + " (Read only)" : userName;
  }

  private _myGit: string = localStorage.getItem("currentBranch") || "master";

  get myGit(): string {
    return this._myGit;
  }

  set myGit(value: string) {
    this._myGit = value;
    localStorage.setItem("currentBranch", value);
    this.updateFileTree();
  }

  private static getAttributesPathWithTitleFromDocumentId(
    documentId: string
  ): string[] {
    const documentIdAttributes: string[] = documentId.split("?")[0].split("/");
    documentIdAttributes.shift();
    return documentIdAttributes;
  }

  private static addRootToBeginningAndJoin(
    documentIdAttributes: string[]
  ): string {
    documentIdAttributes.splice(0, 0, "root");
    if (documentIdAttributes.length === 0) {
      return "/";
    }
    return documentIdAttributes.join("/");
  }

  private static getPathFromNodeId(nodeId: string): string {
    const documentIdAttributes: string[] =
      EditorComponentComponent.getAttributesPathWithTitleFromDocumentId(nodeId);
    documentIdAttributes.pop();
    return EditorComponentComponent.addRootToBeginningAndJoin(
      documentIdAttributes
    );
  }

  private static getPathFromDirectoryId(directoryId: string): string {
    const directoryIdAttributes: string[] =
      EditorComponentComponent.getAttributesPathWithTitleFromDocumentId(
        directoryId
      );
    return EditorComponentComponent.addRootToBeginningAndJoin(
      directoryIdAttributes
    );
  }

  private static createTabFileCode(nodeData: FileTreeNode): FileCode {
    const tabTitle: string = nodeData.displayName;
    const tabPath: string = EditorComponentComponent.getPathFromNodeId(
      nodeData.id
    );
    return new FileCode(tabTitle, tabPath, nodeData.id);
  }

  public getCompletions(
    completion_id: string,
    prompt: string,
    maxNumberPredictions: number,
    minLenPerPrediction: number
  ): Promise<PredictionResponse> {
    return this.completionService
      .completionPredictionPost({
        completion_id: completion_id,
        body: {
          prompt: prompt,
          number_of_prediction: maxNumberPredictions,
          min_len: minLenPerPrediction,
        },
      })
      .toPromise()
      .then((result) => {
        return result.body;
      })
      .catch((reason) => {
        console.log("getCompletions",reason);
        return null;
      });
  }

  public setActualCode(): void {
    const editorTile: EditorTileComponent = this.appendEditorTileComponent();
    editorTile.parentContainer = this.dynamicInsert;
    if (this.editorTabsService.actualTab) {
      editorTile.establishCollabConnection(
        this.editorTabsService.actualTab.documentId
      );
    }
  }

  public beforeOpen = () => {
    if (!this.activeNode) {
      return;
    }

    if (!this.activeNode.displayName.endsWith(".ad")) {
      this.menuObj.hideItems(["Open activity diagram"], false);
    } else {
      this.menuObj.showItems(["Open activity diagram"], false);
    }

    if (this.activeNode.isFile) {
      this.menuObj.hideItems(folderMenuItems, false);
      this.menuObj.showItems(fileMenuItems);
    } else {
      if (!this.activeNode.id.includes("/")) {
        this.menuObj.showItems(rootMenuItems, false);
        this.menuObj.hideItems(nonRootMenuItems);
      } else {
        this.menuObj.showItems(folderMenuItems, false);
        this.menuObj.hideItems(fileMenuItems);
      }
    }
  };

  public async ngOnInit() {
    this.context = this;
    this.repo = this.repoService.currentRepo;
    this.getActiveUserPackages();

    this.readOnly =
      this.repo.authorUUID === this.authenticationService.currentUser.uuid ||
      this.repo.organizationUUID ===
        this.authenticationService.currentUser.organizationUUID
        ? false
        : true;

    this.repoMetadataDoc = await this.collabService.getRepoMetadataDoc(
      this.repo.uuid
    );

    this.repoMetadataDoc.subscribe(async (err) => {
      await setTimeout(async () => {
        await this.updateFileTree();
      }, 500);

      if (this.repoMetadataDoc.type === null) {
        this.tryInitWorkspace();
      } else {
        try {
          this.getOnInitSuccess()();
        } catch (e) {
          console.warn(e);
          console.warn(
            `Repo ${this.repoName} not yet initialized in collab context`
          );
        }
      }
      this.repoMetadataDoc.on("op", (op, source) => {
        if (!(source && this.repoMetadataDoc.data === undefined)) {
          this.checkBranch();
          this.updateFileTree();
        }
      });


      this.collabService.onError.subscribe((error) => {
        this.errors.set(error.docId, error.nErrors);
        this.updateFileTree();
      })
    });

    const menuOptions: ContextMenuModel = {
      target: "#tree",
      items: menuItems,
      select: this.processMenuClick,
      beforeOpen: this.beforeOpen,
    };
    this.menuObj = !this.readOnly
      ? new ContextMenu(menuOptions, "#contextmenu")
      : null;
  }

  public redirect(pagename: string): any {
    this.router.navigate(["/" + pagename]);
  }

  public changeWindow(window: string) {
    this.currentWindow = window;
  }

  public ngOnDestroy(): void {
    if (this.editorTabsService) {
      this.editorTabsService.closeAllTabs();
    }
  }

  public ngAfterViewInit(): void {}

  public gitPull(): void {
    this.gitService
      .gitRepoIdPullPost({
        repoId: this.repo.uuid,
        authorization: localStorage.getItem("token"),
        body: {
          gitPassword: "",
          gitUsername: "",
          branch: this.myGit,
        },
      })
      .toPromise()
      .then((value) => {
        this.snackBar.open("Pull successful", "OK", {
          duration: 3000,
          verticalPosition: "top",
        });
      })
      .catch((_) => {
        this.dialog
          .open(ModalPutCredentialsComponent, {
            width: "600px",
            data: {
              gitCredentialsRequiredFunc: (gitUsername, gitPassword) => {
                return this.gitService
                  .gitRepoIdPullPost({
                    repoId: this.repo.uuid,
                    authorization: localStorage.getItem("token"),
                    body: {
                      gitUsername,
                      gitPassword,
                      branch: this.myGit,
                    },
                  })
                  .toPromise();
              },
            },
          })
          .afterClosed()
          .subscribe((pullResult) => {
            if (pullResult) {
              this.snackBar.open("Pull successful", "OK", {
                duration: 3000,
                verticalPosition: "top",
              });
            }
          });
      });
  }

  public async convertToHierarchy(paths: string[], diffPaths?: string[]): Promise<FileTreeNode[]> {
    // Build the node structure
    const rootNode: FileTreeNode = new FileTreeNode(
      "root",
      "root",
      "root",
      [],
      false,
      false
    );

    // Filter out folders
    const filePaths = paths.filter((path) => path.includes("?"));
    const diffs = await calculateDiffs(filePaths, diffPaths, this.collabService);

    for (const filePath of paths) {
      if (filePath) {
        this.buildNodeRecursive(rootNode, filePath.split("/"), 0, diffs);
      }
    }
    if (paths.length === 0) {
      rootNode.subChild.push(
        new FileTreeNode(
          "top-level",
          "top-level",
          this.repoName,
          [],
          false,
          true
        )
      );
    } else {
      rootNode.subChild[0].displayName = this.repoName;
      rootNode.subChild[0].expanded = true;
    }
    return rootNode.subChild;
  }

  public gitPush(): void {
    this.loadingPush = true;
    this.dialog
      .open(ModalPutCredentialsComponent, {
        width: "600px",
        data: {
          gitCredentialsRequiredFunc: (gitUsername, gitPassword) => {
            return this.gitService
              .gitRepoIdPushPost({
                repoId: this.repo.uuid,
                authorization: localStorage.getItem("token"),
                body: {
                  branch: this._myGit,
                  gitUsername,
                  gitPassword,
                },
              })
              .toPromise();
          },
        },
      })
      .afterClosed()
      .toPromise()
      .then((result) => {
        if (result) {
          this.snackBar.open("Push successful", "OK", {
            verticalPosition: "top",
            duration: 3000,
          });
        }
        this.loadingPush = false;
      });
  }

  public gitMerge(into: string = "master"): void {
    this.gitService
      .gitMerge$Response({
        repoId: this.repo.uuid,
        authorization: localStorage.getItem("token"),
        body: {
          merging: this.myGit,
          into,
        },
      })
      .toPromise()
      .then((value) => {
        if (value) {
          this.snackBar.open("Merge successful", "OK", {
            duration: 3000,
            verticalPosition: "top",
          });
        }
      })
      .catch((reason) => {
        if (reason === "Merges with conflicts are not supported yet.") {
          this.snackBar.open(
            "Conflicts detected. Merging with conflicts is not yet supported.",
            "OK",
            { duration: 5000, verticalPosition: "top" }
          );
        } else {
          this.snackBar.open("Merge failed.", "OK", {
            duration: 3000,
            verticalPosition: "top",
          });
        }
      });
  }

  public buildNodeRecursive(
    node: FileTreeNode,
    filePath: string[],
    idx: number,
    diffs?: Map<string, Diff>
  ): void {
    if (idx < filePath.length) {
      const item: string = filePath[idx];
      let dir: any = node.subChild.find((child) => child.name === item);
      if (!dir) {
        let displayName: string;
        const isFile: boolean = item.includes("?");
        if (isFile) {
          displayName = item.substring(0, item.indexOf("?"));
        } else {
          displayName = item;
        }
        const id: string = filePath.slice(0, idx + 1).join("/");
        let exp: boolean = false;
        if (this.treeObj) {
          exp = this.treeObj.expandedNodes.includes(id);
        }

        const diff = diffs.get(id);
        const fileState = !diff ? FileState.UNMODIFIED : diff?.modified ? FileState.MODIFIED : FileState.ADDED;
        const nErrors = this.errors.get(id);

        node.subChild.push(
          (dir = new FileTreeNode(id, item, displayName, [], isFile, exp, nErrors, dir ? FileState.UNMODIFIED : fileState))
        );
      }
      this.buildNodeRecursive(dir, filePath, idx + 1, diffs);
      node.subChild.sort(FileTreeNode.compare);
    }
  }

  public fileDuplicityValidator = (control: AbstractControl) => {
    let id: string = this.activeNode.id;
    if (id.includes("?")) {
      id = id.substring(0, id.lastIndexOf("/"));
    }
    const newId: string = `${id}/${control.value}?${this._myGit}`;
    if (this.fileExists(newId)) {
      return { alreadyExists: { value: control.value } };
    }
    return null;
  };

  public folderExists = (id: string): boolean => {
    if (this.repoMetadataDoc.data.emptyFolders[this._myGit].includes(id)) {
      return true;
    }
    for (const file of this.repoMetadataDoc.data.files[this._myGit]) {
      if (file.startsWith(id)) {
        return true;
      }
    }
    return false;
  };

  public folderDuplicityValidator = (control: AbstractControl) => {
    const newId: string = `${this.activeNode.id}/${control.value}`;
    if (this.folderExists(newId)) {
      return { alreadyExists: { value: control.value } };
    }
    return null;
  };

  public getDefaultNewName(
    path: string,
    type: "module" | "package" | "folder" | "entity",
    file: boolean = true
  ): string {
    let newName: string = "";

    if (type === "module") {
      newName = `new_${type}` + (file ? ".sv" : "");
    } else if (type === "entity") {
      newName = `new_${type}` + (file ? ".vhd" : "");
    }

    let i: number = 1;
    const func: (newId: string) => boolean = file
      ? this.fileExists
      : this.folderExists;
    while (func(this.getNewId(newName, file))) {
      newName = `new_${type}_(${i})` + (file ? ".sv" : "");
      if (type === "entity")
        newName = `new_${type} (${i})` + (file ? ".vhd" : "");
      i++;
    }
    return newName;
  }

  public addNew(
    type: "module" | "package" | "folder" | "entity",
    file: boolean
  ): void {
    if (!this.activeNode) {
      return;
    }
    const data: FileDialogModel = new FileDialogModel(
      this.getDefaultNewName(this.activeNode.id, type),
      `New ${type}...`,
      `Enter new ${type} name`,
      this.getDisplayPath(this.activeNode.id),
      file ? this.fileDuplicityValidator : this.folderDuplicityValidator,
      file
    );
    this.dialog
      .open(ModalFileNameComponent, {
        data,
        width: "600px",
      })
      .beforeClosed()
      .subscribe((result) => {
        if (result) {
          let newDisplayName: string = result;
          if (
            file &&
            (type === "module" || type === "package") &&
            !newDisplayName.includes(".")
          ) {
            newDisplayName = newDisplayName + ".sv";
          }
          if (
            file &&
            (type === "entity" || type === "package") &&
            !newDisplayName.includes(".")
          ) {
            newDisplayName = newDisplayName + ".vhd";
          }
          const newId: string = this.getNewId(newDisplayName, file);
          const newName: string = file
            ? `${this.activeNode.name}/${newDisplayName}?${this._myGit}`
            : `${this.activeNode.name}/${newDisplayName}`;
          const func: (newId: string) => boolean = file
            ? this.fileExists
            : this.folderExists;
          if (!func(newId)) {
            const docKey: string = file ? "files" : "emptyFolders";
            this.treeObj.addNodes(
              [
                new FileTreeNode(
                  newId,
                  newName,
                  newDisplayName,
                  [],
                  file,
                  false
                ),
              ],
              this.activeNode.id
            );
            this.repoMetadataDoc.submitOp({
              p: [docKey, this._myGit, 0],
              li: newId,
            });
            if (file && type !== "folder") {
              this.collabService.createDocument(
                newId,
                newSvFileTemplate(newDisplayName, type)
              );
            }
            this.editEmptyDirectories(this.activeNode.id);
          }
        }
      });
  }

  public remove(type: "module" | "package" | "folder" | "entity"): void {
    this.dialog
      .open(ModalConfirmComponent, {
        data: {
          message: `Are you sure you want to delete ${this.activeNode.displayName}?`,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          const parentId: string = this.activeNode.id.substring(
            0,
            this.activeNode.id.lastIndexOf("/")
          );
          const siblings: string[] = this.repoMetadataDoc.data.files[
            this._myGit
          ].filter((path) => {
            return path.startsWith(parentId);
          });
          if (siblings.length === 1) {
            this.repoMetadataDoc.submitOp({
              p: ["emptyFolders", this._myGit, 0],
              li: parentId,
            });
          }
          const data: FileTreeNode = this.activeNode;

          if (type === "folder") {
            this.removeAllTabsInFolder(data.id);
          }
          if (type === "module" || type === "package" || type === "entity") {
            this.removeModuleTab(data);
          }

          if (type === "folder") {
            this.editEmptyDirectories(this.activeNode.id);
            const documents: string[] = this.repoMetadataDoc.data.files[
              this._myGit
            ].filter((path) => {
              return path.startsWith(this.activeNode.id);
            });
            for (const document of documents) {
              this.removeOne(document);
            }
          } else {
            this.removeOne(this.activeNode.id);
          }
        }
      });
  }

  public rename(type: "module" | "package" | "folder" | "entity"): void {
    const id: string = this.activeNode.id;
    const displayPath: string = this.getDisplayPath(
      type === "folder" ? id.substring(0, id.lastIndexOf("/")) : id
    );
    const data: FileDialogModel = new FileDialogModel(
      this.activeNode.displayName,
      `Rename ${type} ${this.activeNode.displayName}`,
      "Enter a new name for this file",
      displayPath,
      this.fileDuplicityValidator,
      false
    );
    this.dialog
      .open(ModalFileNameComponent, {
        data,
        width: "600px",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (type === "folder") {
            this.editEmptyDirectories(
              id,
              id.substring(0, id.lastIndexOf("/") + 1) + result
            );
            const documents: string[] = this.repoMetadataDoc.data.files[
              this._myGit
            ].filter((path) => {
              return path.startsWith(id);
            });
            const base: string = id.substring(0, id.lastIndexOf("/") + 1);
            for (const document of documents) {
              const newId: string =
                base + result + document.substring(id.length);
              this.renameOne(newId, document);
            }
            const oldFolderId: string =
              EditorComponentComponent.getPathFromDirectoryId(id);
            this.editorTabsService.changeFolderNameInAllPaths(
              oldFolderId,
              result
            );
          } else {
            const newId: string = `${id.substring(
              0,
              id.lastIndexOf("/") + 1
            )}${result}?${this._myGit}`;

            const newNodeData: FileTreeNode = new FileTreeNode(
              newId,
              "",
              result,
              [],
              false,
              false
            );
            this.renameModuleTab(this.activeNode, newNodeData);
            this.renameOne(newId, id);
          }
        }
      });
  }

  public processMenuClick = (arg: MenuEventArgs): void => {
    if (!arg.item) {
      return;
    }
    switch (arg.item.text) {
      case "Add new module":
        this.addNew("module", true);
        break;
      case "Add new entity":
        this.addNew("entity", true);
        break;
      case "Add new package":
        this.addNew("package", true);
        break;
      case "Add new folder":
        this.addNew("folder", false);
        break;
      case "Rename module":
        this.rename("module");
        break;
      case "Rename entity":
        this.rename("entity");
        break;
      case "Rename package":
        this.rename("package");
        break;
      case "Rename folder":
        this.rename("folder");
        break;
      case "Remove module":
        this.remove("module");
        break;
      case "Remove entity":
        this.remove("entity");
        break;
      case "Remove package":
        this.remove("package");
        break;
      case "Remove folder":
        this.remove("folder");
        break;
      case "Open activity diagram":
        this.openActivityDiagram();
        break;
      default:
        console.warn(`Unknown menu action: ${arg.item.text}`);
    }
  };

  public getDisplayPath(id: string): string {
    if (id.includes("?")) {
      id = id.substring(0, id.lastIndexOf("/"));
    }
    if (id.includes("/")) {
      return this.repoName + id.substring(id.indexOf("/")) + "/";
    }
    return this.repoName + "/";
  }

  public editEmptyDirectories(id: string, newId?: string): void {
    if (this.repoMetadataDoc.data.emptyFolders[this._myGit].includes(id)) {
      const index: number =
        this.repoMetadataDoc.data.emptyFolders[this._myGit].indexOf(id);
      this.repoMetadataDoc.submitOp({
        p: ["emptyFolders", this._myGit, index],
        ld: id,
        li: newId,
      });
    }
  }

  public getHierarchicalData(): Promise<FileTreeNode[]> {
    const paths: string[] = this.repoMetadataDoc.data.files[this._myGit].concat(
      this.repoMetadataDoc.data.emptyFolders[this._myGit]
    );
    const diffPaths: string[] = this.repoMetadataDoc.data?.diff_files[this._myGit];

    return this.convertToHierarchy(paths, diffPaths);
  }

  public async zipFiles(): Promise<any> {
    this.loadingArchive = true;
    const files = this.getFilesOnly();
    for (var file of files) {
      const fileContent = await this.collabService.getDocContents(file);
      file = file.replace(/\?.*$/i, "");
      file = file.split("/").slice(1).join("/");
      this.zipTasks.push({
        data: {
          fileName: file,
          text: fileContent,
        },
      });
    }
    this.zipWorker
      .zipEntries(this.zipTasks)
      .then((result) => (this.loadingArchive = false));
    this.zipTasks = [];
  }

  public async getAllDirs(dirName: string) {
    await this.fileService.readDir(dirName).then(async (file) => {
      for (const singleFile of file) {
        // @ts-ignore
        const stats = await this.fileService.getStat(
          dirName + "/" + singleFile
        );
        if (stats.type === "dir") {
          // @ts-ignore
          const stats = await this.fileService.getStat(
            dirName + "/" + singleFile
          );
          if (stats.type === "dir") {
            // @ts-ignore
            this.zipTasks.push({
              data: { fileName: dirName + "/" + singleFile, text: null },
            });
            await this.getAllDirs(dirName + "/" + singleFile);
          } else {
            // @ts-ignore
            this.zipTasks.push({
              data: {
                fileName: dirName + "/" + singleFile,
                // @ts-ignore
                text: await this.fileService.readFiles(
                  dirName + "/" + singleFile
                ),
              },
            });
          }
        }
      }
    });
  }

  public openDialogCredentials(): any {
    return this.dialog.open(ModalPutCredentialsComponent, {
      width: "600px",
      data: {},
    });
  }

  public openDialogMessage(): any {
    return this.dialog.open(ModalSetMessageComponent, {
      width: "600px",
      data: {},
    });
  }

  public openDialogBranchName(): any {
    return this.dialog.open(ModalNewBranchComponent, {
      width: "600px",
      data: {},
    });
  }

  public fileExists = (newId: string): boolean => {
    return this.repoMetadataDoc.data.files[this._myGit].includes(newId);
  };

  public async addToGit(): Promise<any> {
    if (this.treeObj.checkedNodes.length > 0) {
      // @ts-ignore
      for (const myTree of this.field.dataSource[0].nodeChild) {
        if (
          this.treeObj.checkedNodes.indexOf(myTree.nodeId.toString()) !== -1
        ) {
          this.treeNodes.addAttribute(
            myTree.nodePath,
            // @ts-ignore
            myTree.nodeText,
            { class: "toCommit" }
          );
          await this.fileService.gitAdd(
            localStorage.getItem("myDir"),
            ("/" + myTree.nodePath).replace(
              localStorage.getItem("myDir") + "/",
              ""
            ) + myTree.nodeText
          );
        }
      }

      this.treeObj.checkedNodes = [];
      this.treeObj.refresh();
    } else {
      await this.fileService.gitAdd(localStorage.getItem("myDir"), ".");
    }
  }

  public async getCurrentBranchName(): Promise<any> {}

  /**
   * Opening new modal to create new repository.
   */
  public openDialogCommitPush(): any {
    return this.dialog.open(ModalCommitPushComponent, {
      width: "600px",
      panelClass: "confirm-dialog-container",
      data: {},
    });
  }

  public async fetchWaveform() {
    const editorComponent =
      this.editorComponent.toArray()[0] as EditorTabsComponent;
    if (
      editorComponent.getTerminalComponent()?.virtualTty?.TTY_id != undefined
    ) {
      const projectConfig = await this.getMakefileConfig();
      if (projectConfig.waveformFilename == null) {
        this.snackBar.open(
          "Waveform is not being generated, check your makefile!",
          "OK",
          {
            duration: 3000,
            verticalPosition: "bottom",
            horizontalPosition: "left",
          }
        );
        return;
      }
      const visualisation = await this.virtualTty
        .getFile(
          editorComponent.getTerminalComponent().virtualTty.TTY_id,
          `/home/asicde-simulator/project_files/${projectConfig.waveformFilename}`
        )
        .catch((r) => {
          this.snackBar.open(
            "Waveform file cannot be found, try running simulation again!",
            "OK",
            {
              duration: 3000,
              verticalPosition: "bottom",
              horizontalPosition: "left",
            }
          );
        });

      if (visualisation == undefined) return;
      // Save vcd file
      const newDisplayName: string = projectConfig.waveformFilename;
      const file = true;
      const rootNode = await this.getHierarchicalData()[0];
      const newId: string = `${rootNode.id}/${projectConfig.outputFoldername}/${projectConfig.waveformFilename}?${this._myGit}`;
      const newName: string = `${rootNode.name}/${projectConfig.outputFoldername}/${projectConfig.waveformFilename}?${this._myGit}`;
      const func: (newId: string) => boolean = file
        ? this.fileExists
        : this.folderExists;
      if (!func(newId)) {
        const docKey: string = file ? "files" : "emptyFolders";
        this.treeObj.addNodes(
          [new FileTreeNode(newId, newName, newDisplayName, [], file, false)],
          rootNode.id
        );
        this.repoMetadataDoc.submitOp({
          p: [docKey, this._myGit, 0],
          li: newId,
        });
        if (file) {
          this.collabService.createDocument(newId, visualisation.toString());
        }
        this.editEmptyDirectories(rootNode.id);
      } else {
        // TODO: handle other branches
        this.collabService.createOrUpdateDocument(
          newId,
          visualisation.toString(),
          this.repoService.currentRepoUuid,
          this._myGit
        );
      }
    } else {
      this.snackBar.open(
        "Start a simulation first in order to fetch waveform",
        "OK",
        {
          duration: 3000,
          verticalPosition: "bottom",
          horizontalPosition: "left",
        }
      );
    }
  }

  public async getMakefileConfig(): Promise<ProjectConfiguration> {
    const rootNode = await this.getHierarchicalData()[0];
    const newId: string = `${rootNode.id}/Makefile?${this._myGit}`;
    const makefileContent: string = await this.collabService
      .getDocContents(newId)
      .catch((e) => {
        return null;
      });

    if (makefileContent == null)
      return {
        topModuleFilename: "",
        testbenchFilename: "",
        waveformFilename: null,
        outputFilename: "",
        outputFoldername: "",
        simulator: "iverilog",
      };

    try {
      const topmodule = makefileContent.match(/TOP_MODULE = '(.*)'/)[1];
      const testbench = makefileContent.match(/TESTBENCH = '(.*)'/)[1];
      const outputFile = makefileContent.match(/OUTPUT_FILE = (.*)/)[1];
      const outputFolder = makefileContent.match(/OUTPUT_FOLDER = (.*)/)[1];
      const selectedSimulator = makefileContent.match(
        /SELECTED_SIMULATOR = '(.*)'/
      )[1];

      const regexWaveform = makefileContent.match(/WAVEFORM_FILE = (.*)/);
      var waveformFile = regexWaveform == null ? null : regexWaveform[1];

      return {
        topModuleFilename: topmodule,
        testbenchFilename: testbench,
        outputFilename: outputFile,
        outputFoldername: outputFolder,
        waveformFilename: waveformFile,
        simulator: selectedSimulator,
      };
    } catch {
      this.snackBar.open("Makefile could not be parsed!", null, {
        verticalPosition: "bottom",
        horizontalPosition: "left",
        duration: 5000,
      });
      return {
        topModuleFilename: "",
        testbenchFilename: "",
        waveformFilename: null,
        outputFilename: "",
        outputFoldername: "",
        simulator: "iverilog",
      };
    }
  }

  public async setMakefileCallback() {
    const rootNode = await this.getHierarchicalData()[0];
    const newId: string = `${rootNode.id}/Makefile?${this._myGit}`;
    const editorComponent =
      this.editorComponent.toArray()[0] as EditorTabsComponent;

    var makefileContent = await this.collabService.getDocContents(newId);
    const currentCallback = makefileContent.match(/curl '(.*)'/)[1];
    const newCallback = `http://router/api/v2/simulator/simulation-emit?containerId=${
      editorComponent.getTerminalComponent().virtualTty.TTY_id
    }`;
    makefileContent = makefileContent.replace(currentCallback, newCallback);

    this.collabService.createOrUpdateDocument(
      newId,
      makefileContent,
      this.repoService.currentRepoUuid,
      this._myGit
    );
  }

  private appendEditorTileComponent(): EditorTileComponent {
    const componentFactory =
      this.resolver.resolveComponentFactory(EditorTileComponent);
    const editorTileComponentRef =
      this.dynamicInsert.createComponent(componentFactory);
    const editorTileComponent =
      editorTileComponentRef.instance as EditorTileComponent;
    editorTileComponent.treeObj = this.treeObj;
    return editorTileComponent;
  }

  private tryInitWorkspace(): void {
    const token = localStorage.getItem("github_access_token");

    this.collabService
      .initWorkspace(this.repo, token, "x-oauth-basic")
      .then(this.getOnInitSuccess())
      .catch(this.getOnInitFailed());
  }

  private removeAllTabsInFolder(directoryId: string): void {
    const tabPath: string =
      EditorComponentComponent.getPathFromDirectoryId(directoryId);
    this.editorTabsService.closeAllTabsByPathPrefix(tabPath);
  }

  private removeModuleTab(data: FileTreeNode): void {
    const tabTitle: string = data.displayName;
    const tabPath: string = EditorComponentComponent.getPathFromNodeId(data.id);
    const removedTab: Tab = this.editorTabsService.getTabByFullPath(
      tabPath,
      tabTitle
    );
    if (removedTab) {
      this.editorTabsService.closeTab(removedTab.id);
    }
  }

  private renameModuleTab(
    oldNodeData: FileTreeNode,
    newNodeData: FileTreeNode
  ): void {
    const path: string = EditorComponentComponent.getPathFromNodeId(
      oldNodeData.id
    );
    const oldTitle: string = oldNodeData.displayName;
    const actualTab: Tab = this.editorTabsService.getTabByFullPath(
      path,
      oldTitle
    );
    if (actualTab) {
      this.editorTabsService.getTabById(actualTab.id).title =
        newNodeData.displayName;
      this.editorTabsService.getTabById(actualTab.id).documentId =
        newNodeData.id;
    }
  }

  private checkBranch(): void {
    if (this.repoMetadataDoc.data) {
      if (!this.repoMetadataDoc.data.branches.includes(this.myGit)) {
        this.myGit = this.repoMetadataDoc.data.branches[0];
      }
    } else {
      this.myGit = "master";
    }
  }

  private getOnInitSuccess(): () => void {
    return () => {
      if (this.repoMetadataDoc.data !== undefined) {
        this.checkBranch();
        this.updateFileTree();
      }
      this.loading = false;
    };
  }

  private getOnInitFailed(): (reason: any) => void {
    return (reason) => {
      if (reason === "Forbidden") {
        this.dialog
          .open(ModalPutCredentialsComponent, {
            data: {
              gitCredentialsRequiredFunc: (
                gitUsername: string,
                gitPassword: string
              ) => {
                return this.collabService.initWorkspace(
                  this.repo,
                  gitUsername,
                  gitPassword
                );
              },
            },
          })
          .afterClosed()
          .toPromise()
          .then((result) => {
            if (result) {
              // this.tryInitWorkspace(...result);
              this.tryInitWorkspace();
            } else {
              this.tryInitWorkspace();
            }
          })
          .catch((reason1) => {});
      }
    };
  }

  private getFilesToCommit(): string[] {
    return this.treeObj.checkedNodes.filter((fileId) =>
      fileId.endsWith(`?${this._myGit}`)
    );
  }

  private removeOne(id: string): void {
    const index: number =
      this.repoMetadataDoc.data.files[this._myGit].indexOf(id);
    this.repoMetadataDoc.submitOp({ p: ["files", this._myGit, index], ld: id });
  }

  private nodeClicked = (arg: NodeClickEventArgs) => {
    this.activeNode = this.treeObj.getTreeData(arg.node)[0] as any;

    if (this.activeNode && this.activeNode.isFile) {
      this.collabService.fileName = this.activeNode.displayName;
      localStorage.setItem("currentFile", this.activeNode.id);
    }

    if (arg.event.button === 0) {
      // @ts-ignore
      if (arg.event.target.classList.contains("e-fullrow")) {
        if (this.activeNode.isFile) {
          const fileCode: FileCode = EditorComponentComponent.createTabFileCode(
            this.activeNode
          );
          this.editorTabsService.addTab(fileCode);
          this.openFile = this.activeNode.id;
        } else {
          if (this.activeNode.expanded) {
            this.treeObj.collapseAll([this.activeNode.id]);
          } else {
            this.treeObj.expandAll([this.activeNode.id]);
          }
        }
      }
    }
  };

  private renameOne(newId: string, oldId: string): void {
    const index: number =
      this.repoMetadataDoc.data.files[this._myGit].indexOf(oldId);
    this.repoMetadataDoc.submitOp({
      p: ["files", this._myGit, index],
      ld: oldId,
      li: newId,
    });
  }

  private getFiles() {
    const paths: string[] = this.repoMetadataDoc.data.files[this._myGit].concat(
      this.repoMetadataDoc.data.emptyFolders[this._myGit]
    );
    return paths;
  }

  private getFilesOnly() {
    const paths: string[] = this.repoMetadataDoc.data.files[this._myGit];
    return paths;
  }

  private getEmptyDirsOnly() {
    const paths: string[] = this.repoMetadataDoc.data.emptyFolders[this._myGit];
    return paths;
  }

  public async updateFileTree() {
    const paths: string[] = this.repoMetadataDoc.data.files[this._myGit].concat(
      this.repoMetadataDoc.data.emptyFolders[this._myGit]
    );
    const diffPaths: string[] = this.repoMetadataDoc.data.diff_files ? this.repoMetadataDoc.data?.diff_files[this._myGit] : []

    this.hierarchicalData = await this.convertToHierarchy(paths, diffPaths);
    this.field = {
      dataSource: this.hierarchicalData,
      id: "id",
      text: "displayName",
      child: "subChild",
      expanded: "expanded",
      iconCss: "icon",
      htmlAttributes: "htmlAttributes"
    };

    if (this.treeObj) {
      this.treeObj.destroy();
    }

    this.treeObj = new TreeView({
      fields: this.field,
      showCheckBox: true,
      nodeClicked: this.nodeClicked,
    });
    this.treeObj.appendTo("#tree");
  }

  private getNewId(newFileName: string, file: boolean = true): string {
    if (file) {
      return `${this.activeNode.id}/${newFileName}?${this._myGit}`;
    }
    return `${this.activeNode.id}/${newFileName}`;
  }

  private async openActivityDiagram() {
    const fileContent = await this.collabService.getDocContents(
      this.activeNode.id
    );

    localStorage.setItem("activityDiagram", fileContent);
    this.router.navigate(["/activitydiagrams"]);
  }

  public getActiveUserPackages(): void {
    this.http.get(environment.baseUrl + '/auth/packages/active').subscribe((response: any) => {
      this.allActivePackages = response;
      this.allActivePackages.forEach((pkg: any) => {
        if (pkg.price_package_id === 0) {
          this.diagrams = true;
          this.editor = true;
          this.simulations = true;
          this.synthesis = true;
        }

        if (pkg.price_package_id === 4 || pkg.price_package_id === 9) {
          this.diagrams = true;
        }

        if (pkg.price_package_id === 5 || pkg.price_package_id === 10) {
          this.editor = true;
        }

        if (pkg.price_package_id === 7 || pkg.price_package_id === 2) {
          this.simulations = true;
        }

        if (pkg.price_package_id === 3 || pkg.price_package_id === 8) {
          this.synthesis = true;
        }
      });
    }, (error) => {
      console.error('There is error of getting packages:', error);
    });
  }
}

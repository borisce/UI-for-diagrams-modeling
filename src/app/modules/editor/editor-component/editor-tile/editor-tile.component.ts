import {Component, ViewChild, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {DiffEditorModel, NgxEditorModel} from 'ngx-monaco-editor';
import {FilesService} from '../../../../core/fileSystem/Filer/files.service';
import {CollabService, processChange, processRemoteOpForMonaco} from '../../../../core/service/collab.service';
import {AuthenticationService} from '../../../../core/service';
import {RemoteCursorMonacoWidget} from '../../collab/remote-cursor';
import {IPresence} from '../../collab/presence';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ModalConfirmComponent} from '../../../../modal/modal-confirm/modal-confirm.component';
import * as copyToClipboard from 'copy-to-clipboard';
import {EditorTabsService} from '../editor-tabs/service/editor-tabs.service';
import {Tab} from '../editor-tabs/model/tab/tab';
import {JumpToDefinitionService} from '../../system_verilog/jump-to-definition/jump-to-definition.service';
import {ICollaborator} from '../../../../shared/collaborators-list/collaborators-list.component';
import ICodeEditor = monaco.editor.ICodeEditor;
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import {RepositoryService} from 'src/app/core/service/repository.service';
import { onMonacoLoadObservable, onMonacoLoaded } from '../../monacoOnLoad';
import { first } from 'rxjs/operators';
import { TreeView } from '@syncfusion/ej2-angular-navigations';
import { BehaviorSubject } from 'rxjs';
import { EditorSettingsPopUpComponent } from './editor-settings-pop-up/editor-settings-pop-up.component';
import { CodeSearchService } from '../../system_verilog/jump-to-definition/code-search/code-search.service';
import { Code } from '../../system_verilog/jump-to-definition/code-search/model/code';
import { createModuleSnippetDependencyProposals, createSnippetDependencyProposals } from '../../system_verilog/code-completion/proposals/snippetProposals';
import { DependencieProposal } from '../../system_verilog/code-completion/proposals/DependencieProposal';
import { ReviewBG } from '../../review/review';
import { CodeReviewService } from 'src/app/core/service/code-review.service';

@Component({
  selector: 'app-editor-tile',
  templateUrl: './editor-tile.component.html',
  styleUrls: ['./editor-tile.component.scss']
})
/**
 * Component for editor itself.
 */
export class EditorTileComponent implements OnInit, OnDestroy {
  @ViewChild(EditorSettingsPopUpComponent) editorSettingsPopUp: EditorSettingsPopUpComponent;

  public treeObj: TreeView =null;
  public saveButton: boolean = true;
  public loading: boolean = false;
  public readOnly: boolean = false;
  public code: string = ``;
  public parentContainer: ViewContainerRef;
  public collaborators: Map<string, ICollaborator> = new Map<string, ICollaborator>();
  private allSVCodes : Code[];
  public isCodeReviewPopupVisible: boolean = false;
  public codeReviewPopupPosition: { x: number, y: number } = { x: 0, y: 0 };
  public codeReviewSelection: monaco.Selection;
  isPopupOpen: boolean = false;
  minLengthSuggestionList : number = 1;
  maxNumberPredictionsPerSuggestion : number = 5;
  showSnippetsInSuggestionList:boolean = false;

  // Monaco diff mode variables
  public originalModel: DiffEditorModel;
  public modifiedModel: DiffEditorModel;
  public diffActive: boolean = false;

  /**
   * A ShareDB document instance for current file.
   * @private
   */
  private collabDoc: any;
  private editor: ICodeEditor;
  private suppressOutgoing: boolean;
  private changeListener: monaco.IDisposable;
  private cursors: Map<string, object> = new Map<string, object>();
  private userPresences: Map<string, string> = new Map<string, string>();
  private cursorListener: monaco.IDisposable;
  private presence: any;
  private localPresence: any;
  private decorations: string[] = [];
  private selectionStyles: Map<string, HTMLElement> = new Map<string, HTMLElement>();
  private selections: object = {};
  private selectionListener: monaco.IDisposable;
  private unprocessedSelections: object = {};
  private renaming: boolean;
  private readonly _editorOptions: { theme: string, language: string,inlineSuggest : boolean, readOnly?: boolean};
  private standEditor: monaco.editor.IStandaloneCodeEditor;

  constructor(
    private fileService: FilesService,
    private collabService: CollabService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private editorTabsService: EditorTabsService,
    private repositoryService: RepositoryService,
    private codeSearchService : CodeSearchService,
    private codeReviewService: CodeReviewService,
    private jumpToDefinition: JumpToDefinitionService) {
      if(this.collabService.diffMode) {
        this.diffActive = true; 
        this.originalModel = this.collabService.originalModel;
        this.modifiedModel = this.collabService.modifiedModel;
      }

      var newCompletionType ='';
    if (this.editorTabsService.actualTab.title.includes('.vhd')) {
      this._editorOptions = {theme: 'VerilogDark', language: 'Vhdl',inlineSuggest : true, readOnly: this.collabService.diffMode};
      this._model = {value: '', language: 'Vhdl'};
      newCompletionType = localStorage.getItem(`Vhdl-completion-message`);
    } else {
      this._editorOptions = {theme: 'VerilogDark', language: 'SystemVerilog',inlineSuggest : true, readOnly: this.collabService.diffMode};
      this._model = {value: '', language: 'SystemVerilog'}; 
      newCompletionType = localStorage.getItem(`SystemVerilog-completion-message`);
    }
    this._model = {value: '', language: 'SystemVerilog'};
    this._actualCode = '';
    if (localStorage.getItem('editedFile') !== null) {
      this.saveButton = false;
    }
    const toolbar = document.querySelector('.editor-bottom-toolbar-right');
    if (toolbar) {
        toolbar.innerHTML =newCompletionType;
    }

    if (localStorage.getItem('maxNumberPredictions') !== null) {
      this.maxNumberPredictionsPerSuggestion = Number(localStorage.getItem('maxNumberPredictions'));
    } else {
      localStorage.setItem('maxNumberPredictions',this.maxNumberPredictionsPerSuggestion.toString());
    }

    if (localStorage.getItem('minLen')!== null) {
      this.minLengthSuggestionList = Number(localStorage.getItem('minLen'));
    }else {
      localStorage.setItem('minLen',this.minLengthSuggestionList.toString());
    }

    if (localStorage.getItem('showSnippets')!== null) {
      this.showSnippetsInSuggestionList = localStorage.getItem('showSnippets') == 'true';
    }else {
      localStorage.setItem('showSnippets',this.showSnippetsInSuggestionList.toString());
    }
  }


  get editorOptions(): { theme: string, language: string } {
    return this._editorOptions;
  }

  private _editedFile: string;

  get editedFile(): string {
    return this._editedFile;
  }

  set editedFile(value: string) {
    this._editedFile = value;
  }

  private _monacoEditorVisible: boolean;

  get monacoEditorVisible(): boolean {
    return this._monacoEditorVisible;
  }

  set monacoEditorVisible(value: boolean) {
    this._monacoEditorVisible = value;
  }

  private _model: NgxEditorModel;

  get model(): NgxEditorModel {
    return this._model;
  }

  set model(value: NgxEditorModel) {
    this._model = value;
  }

  private _actualCode: string;

  get actualCode(): string {
    return this._actualCode;
  }

  set actualCode(value: string) {
    this._actualCode = value;
  }

  public static getPathFromDataId(id: string): string {
    const arr: string[] = id.split('?')[0].split('/');
    arr.shift();
    arr.pop();
    return arr.join('/');
  }

  public async ngOnInit(): Promise<void> {
    this.monacoEditorVisible = true;
    this.setReadOnly();
  }

  
  handleSave(event) {

    this.maxNumberPredictionsPerSuggestion = event.maxNumberPredictions;
    if (this.maxNumberPredictionsPerSuggestion < 1) {
      this.maxNumberPredictionsPerSuggestion = 1;
    } else if (this.maxNumberPredictionsPerSuggestion > 15) {
      this.maxNumberPredictionsPerSuggestion = 15;
    }
    this.minLengthSuggestionList = event.minLen;
    if (this.minLengthSuggestionList < 1) {
      this.minLengthSuggestionList = 1;
    } else if (this.minLengthSuggestionList > 7) {
      this.minLengthSuggestionList = 7;
    }

    this.showSnippetsInSuggestionList = event.showSnippets;

    localStorage.setItem('showSnippets',this.showSnippetsInSuggestionList.toString());

    localStorage.setItem('maxNumberPredictions',this.maxNumberPredictionsPerSuggestion.toString());
    
    localStorage.setItem('minLen',this.minLengthSuggestionList.toString());
  }
  
  handleClose() {
    this.isPopupOpen = false;
  }
  public setPopUpClose(): void{
    this.isPopupOpen = false;
  }
  public setPopUpOpen(): void{
    this.isPopupOpen = true;
  }

  public fixLineEndings(): void {
    if (!this.actualCode) {
      return;
    }
    while (this.actualCode.includes('\r')) {
      const index: number = this.actualCode.lastIndexOf('\r');
      this.collabDoc.submitOp([index, {d: 1}]);
      this.actualCode = this.actualCode.substring(0, index) + this.actualCode.substring(index + 1);
    }
  }

  public establishCollabConnection(docTitle: string): void {
    this.collabDoc = this.collabService.createDocument(docTitle, this.actualCode);
    this.collabDoc.subscribe((err) => {
      if (this.collabDoc.data && this.editor) {
        this.suppressOutgoing = true;
      }
      // after file tree click
      this.actualCode = this.collabDoc.data;
      const tab: Tab = this.editorTabsService.actualTab;
      if (tab) {
        this.editorTabsService.actualTab.code = this.collabDoc.data;
      }


      this.fixLineEndings();
      this.submitPresence(undefined, undefined, true);
      this.collabDoc.on('op', (operation: any[], source) => {
        if (!source) {
          this.suppressOutgoing = true;
          this.editor.executeEdits('remoteOp', [processRemoteOpForMonaco(operation, this.editor)]);
          for (const cursor of Object.values(this.cursors)) {
            this.collabService.changePosition(this.editor, cursor as any, operation);
          }
          this.suppressOutgoing = false;
        } else {
        }
      });
      this.collabDoc.on('del', (data, source) => {
        if (!this.renaming) {
          if (data && !source) {
            this.dialog.open(ModalConfirmComponent, {
              data: {
                message: 'File has been deleted by another user. ' +
                  'Would you like to copy the contents to clipboard?'
              }
            }).afterClosed().subscribe(value => {
              if (value) {
                if (copyToClipboard(data)) {
                  this.snackBar.open('File contents copied!', 'OK', {
                    duration: 5000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center'
                  });
                }
              }
            });
          }
          this.parentContainer.clear();
        } else {
          this.renaming = false;
        }
      });
    });

    this.presence = this.collabService.getFilePresence(docTitle);
    this.presence.subscribe((err) => {
      this.presence.on('receive', (id: string, presence: IPresence) => {
        if (id !== 'server') {
          if (!presence) {
            this.presenceCleanup(id);
            if (this.userPresences.has(id)) {
              const name: string = this.userPresences.get(id);
              this.snackBar.open(`${name} left file.`, 'OK', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom'
              });
              this.userPresences.delete(id);
              const collaborator: ICollaborator = this.collaborators.get(name);
              if (collaborator) {
                if (collaborator.count > 1) {
                  collaborator.count -= 1;
                } else {
                  this.collaborators.delete(name);
                }
              }
            }
          } else {
            if (!this.userPresences.has(id)) {
              this.userPresences.set(id, presence.displayName);
              let collaborator: ICollaborator = this.collaborators.get(presence.displayName);
              if (collaborator) {
                collaborator.count += 1;
              } else {
                collaborator = {
                  name: presence.displayName,
                  color: this.collabService.getUserColor(presence.userName),
                  count: 1
                };
              }
              this.collaborators.set(presence.displayName, collaborator);
            }
            if (presence.position) {
              this.manageRemoteCursorChange(id, presence);
            }
            if (presence.selection) {
              this.manageRemoteSelectionChange(id, presence);
            }

            if (presence.request) {
              if (!this.editor) {
                return;
              }
              this.submitPresence(this.editor.getSelection(), this.editor.getPosition());
              this.snackBar.open(`${presence.displayName} joined file.`, 'OK', {
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom'
              });
            }
          }
        } else {
          if (presence.rename) {
            const newId: string = presence.rename;
            this.renaming = true;
            const oldRepoId: string = this.collabDoc.id;
            const oldTitle: string =
              oldRepoId.substring(oldRepoId.lastIndexOf('/') + 1, oldRepoId.indexOf('?'));
            this.collabDoc.unsubscribe();
            this.presence.unsubscribe();
            this.localPresence.destroy();
            this.establishCollabConnection(newId);

            const path: string = EditorTileComponent.getPathFromDataId(oldRepoId);
            const actualTab: Tab = this.editorTabsService.getTabByFullPath(path, oldTitle);
            if (actualTab) {
              this.editorTabsService.getTabById(actualTab.id).title =
                newId.substring(newId.lastIndexOf('/') + 1, newId.indexOf('?'));
            }
          }
        }
      });
    });
    this.localPresence = this.presence.create();
  }

  public submitPresence(selection?: monaco.ISelection,
                        position?: monaco.IPosition, request?: boolean): void {
    if (this.localPresence) {
      const user: any = this.authService.currentUser as any;
      const presence: IPresence = {
        userName: user.username,
        displayName: `${user.firstName} ${user.lastName}`,
        position,
        selection,
        request
      };
      this.localPresence.submit(presence, (err) => {
      });
    }
  }

  public onMonacoInit(editor: ICodeEditor): void {
    this.editor = editor;
    this.editor.getModel().setEOL(0);
    this.changeListener = editor.onDidChangeModelContent((event) => {
      if (!this.suppressOutgoing && this.collabDoc && this.collabDoc.type !== null) {
        event.changes.forEach((change) => {
          this.collabDoc.submitOp(processChange(change), (err) => {
            this.submitPresence(undefined, this.editor.getPosition());
          });
        });
      } else if (this.suppressOutgoing) {

      }
      this.suppressOutgoing = false;
    });
    this.cursorListener = editor.onDidChangeCursorPosition((event) => {
      this.submitPresence(undefined, event.position);
    });
    this.selectionListener = editor.onDidChangeCursorSelection(event => {
      this.submitPresence(event.selection);
    });
    for (const cursor of Object.values(this.cursors)) {
      this.editor.addContentWidget(cursor);
      this.editor.layoutContentWidget(cursor);
    }
    for (const selection of Object.entries(this.unprocessedSelections)) {
      this.manageRemoteSelectionChange(...selection);
    }
  }


  public ngOnDestroy(): void {
    if (this.localPresence) {
      this.localPresence.destroy();
    }
    if (this.presence) {
      this.presence.destroy();
    }
    if (this.cursorListener) {
      this.cursorListener.dispose();
    }
    if (this.selectionListener) {
      this.selectionListener.dispose();
    }
    if (this.changeListener) {
      this.changeListener.dispose();
    }
    if (this.collabDoc) {
      this.collabDoc.destroy();
    }
    // TODO close/pause Doc connection
  }

  /**
   * Save changes done to a file. Deleting "*" and rewriting file in indexed DB
   */

  /**
   * Discard changes. Deleting "*"
   */

  public getCode(): void {
  }

  public onStandAloneMonacoInit(editor: IStandaloneCodeEditor): void {
    this.standEditor = editor;
    
    editor.getModel()?.updateOptions({ tabSize: 2 });
    editor.updateOptions({ scrollbar: { verticalScrollbarSize: 4, horizontalScrollbarSize: 4 }});

    
    if (this.readOnly) {
      editor.updateOptions({readOnly: true});
    }
    this.jumpToDefinition.bindJumpToDefinition(editor);
    this.codeReviewService.editor = editor;

    this.standEditor.addAction({
      id: "change-code-completion",
      label: "Change Code Completion",
    
      keybindings: [
        monaco.KeyMod.chord(
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M,
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M
        ),
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10,
      ],
      precondition: null,
    
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
  
      run: function (editor) {

        const model = editor.getModel();
        const language = model.getModeId();
        const currentCompletionType = localStorage.getItem(`${language}-completion`)
        
        if (language == 'SystemVerilog'){
          if (currentCompletionType === null || currentCompletionType === '0') {
            localStorage.setItem(`${language}-completion`,'1' );
            localStorage.setItem(`${language}-completion-message`,'Code Completion: Basic With Imports' );
          }
          else if (currentCompletionType === '1') {
            localStorage.setItem(`${language}-completion`,'2' );
            localStorage.setItem(`${language}-completion-message`,'Code Completion: Basic Without Imports' );
          }
          else if (currentCompletionType === '2') {
            localStorage.setItem(`${language}-completion`,'0' );
            localStorage.setItem(`${language}-completion-message`,'Code Completion: With Neural Network Tr-xl 27' );
          }
        }
        
        const newCompletionType = localStorage.getItem(`${language}-completion-message`);
        const toolbar = document.querySelector('.editor-bottom-toolbar-right');
        if (toolbar) {
            toolbar.innerHTML = newCompletionType;
        }
      },
    });
    this.standEditor.addAction({
      id: "change-code-completion-settings",
      label: "Code Completion Settings",
      keybindings: [
        monaco.KeyMod.chord(
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_N,
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_N
        ),
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.F11,
        
      ],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: (editor) => {
        this.setPopUpOpen()
      },
    });

    // Add review code action into context menu
    this.standEditor.addAction({
      id: "add-code-review",
      label: "Add code review comment",
      keybindings: [],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: "navigation",
      contextMenuOrder: 2,
      run: (editor) => {
        const selection = editor.getSelection();

        // Adds decoration to the selected text
        this.editorTabsService.decorations = this.standEditor.deltaDecorations(
          this.editorTabsService.decorations,
          [
            {
              range: selection,
              options: {
                className: `new-code-review-block ${
                  ReviewBG[
                    Object.keys(ReviewBG)[
                      Math.floor(Math.random() * Object.keys(ReviewBG).length)
                    ]
                  ]
                }`,
              },
            },
          ]
        )

        // Opens the code review popup
        this.isCodeReviewPopupVisible = true
        this.codeReviewSelection = selection
        const cursorCoords = this.standEditor.getScrolledVisiblePosition(selection.getPosition())
        this.codeReviewPopupPosition = {
          x: cursorCoords.left,
          y: cursorCoords.top,
        }

        this.standEditor.setSelection(new monaco.Selection(0, 0, 0, 0));
      },

    })
  }

  public onCloseCodeReviewPopup(): void {
    this.isCodeReviewPopupVisible = false;

    // Remove decorations from editor
    this.standEditor.deltaDecorations(this.editorTabsService.decorations, [])
  }

  
  public createCode(actualCode: string): void {
    if (actualCode.length !== 0) {
      this.editorTabsService.actualEditor.next(this.standEditor);
    }
  }

  
  private presenceCleanup(id: string): void {
    if (!this.editor) {
      return;
    }
    if (this.cursors[id]) {
      this.editor.removeContentWidget(this.cursors[id]);
      this.cursors.delete(id);
    }
    delete this.selections[id];
    this.decorations = this.editor.deltaDecorations(this.decorations,
      Object.values(this.selections));
  }

  private manageRemoteSelectionChange(id: string, presence: IPresence): void {
    const uniqueClassName: string = `monaco-remote-selection-${presence.userName}`;
    if (!this.selectionStyles[id]) {
      const style: HTMLElement = document.createElement('style');
      style.innerText =
        `.${uniqueClassName} {background-color: ${this.collabService
          .getUserColor(presence.userName)}}`;
      document.head.appendChild(style);
      this.selectionStyles[id] = style;
    }
    try {
      this.selections[id] = {
        options: {
          className: `monaco-remote-selection ${uniqueClassName}`,
          hoverMessage: {value: presence.displayName}
        },
        range: new monaco.Range(presence.selection.selectionStartLineNumber,
          presence.selection.selectionStartColumn,
          presence.selection.positionLineNumber,
          presence.selection.positionColumn)
      };
    } catch (e) {
      if (e instanceof ReferenceError) {
        this.unprocessedSelections[id] = presence;
        return;
      } else {
        throw e;
      }
    }
    if (this.editor) {
      this.decorations = this.editor.deltaDecorations(this.decorations,
        Object.values(this.selections));
    }
  }

  private manageRemoteCursorChange(id: string, presence: IPresence): void {
    if (this.cursors[id]) {
      this.cursors[id].setPosition(presence.position);
    } else {
      this.cursors[id] = new RemoteCursorMonacoWidget(id, presence.position,
        presence.displayName, this.collabService.getUserColor(presence.userName));

      if (this.editor) {
        this.editor.addContentWidget(this.cursors[id]);
      }
    }
    if (this.editor) {
      this.editor.layoutContentWidget(this.cursors[id]);
    }
  }

  private isUserRepoOwner(): boolean {
    return (this.repositoryService.currentRepo.authorUUID) as unknown === this.authService.currentUser.uuid;
  }

  private isUserRepoCollaborator(): boolean {
    return this.repositoryService.currentRepo.organizationUUID === this.authService.currentUser.organizationUUID;
  }

  private setReadOnly(): void {
    // if user is repo owner or user in repo organization then he can edit file
    this.readOnly = this.isUserRepoOwner() ||  this.isUserRepoCollaborator() ? false : true;
  }


}

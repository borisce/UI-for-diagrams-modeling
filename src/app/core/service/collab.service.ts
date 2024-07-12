import { Injectable } from '@angular/core';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../../environments/environment';
import { WorkspacesService } from '../../api/collab/services/workspaces.service';
import { RemoteCursorMonacoWidget } from '../../modules/editor/collab/remote-cursor';
import { RepositoryService } from './repository.service';
import IIdentifiedSingleEditOperation = monaco.editor.IIdentifiedSingleEditOperation;
import ICodeEditor = monaco.editor.ICodeEditor;
import IPosition = monaco.IPosition;
import { DiffEditorModel } from 'ngx-monaco-editor';
import { Subject } from 'rxjs';
import { EditorTabsService } from '../../modules/editor/editor-component/editor-tabs/service/editor-tabs.service';
import { Review } from 'src/app/modules/editor/editor-component/editor-sidebar/code-review/code-review.component';

export const sharedb: any = require('sharedb/lib/client');
const textUnicode: any = require('ot-text-unicode');
const randomColor: any = require('randomcolor');

const jsonOT: any = require('ot-json0');
sharedb.types.register(textUnicode.type);

@Injectable({ providedIn: 'root' })
export class CollabService {
  private readonly socket: ReconnectingWebSocket;
  private cursorColors: Map<string, string> = new Map<string, string>();
  private connection: any;
  private _fileName: string;
  public diffMode: boolean = false;
  public originalModel: DiffEditorModel
  public modifiedModel: DiffEditorModel

  private _onError: Subject<{ nErrors: number; docId: string }>;
  get onError(): Subject<{ nErrors: number; docId: string }> {
    return this._onError;
  }

  set onError(value: Subject<{ nErrors: number; docId: string }>) {
    this._onError = value;
  }

  get fileName(): string {
    return this._fileName;
  }

  set fileName(value: string) {
    this._fileName = value;
  }

  constructor(
    private workspaceService: WorkspacesService,
    private repoService: RepositoryService,
    private editorTabsService: EditorTabsService
  ) {
    this.onError = new Subject<{ nErrors: number; docId: string }>();
    // set ws protocol when using http and wss when using https
    const location: string = environment.socketUrl;
    // websocket instantiation
    this.socket = new ReconnectingWebSocket(`${location}/ws/collab`);
    this.connection = new sharedb.Connection(this.socket);
  }

  public initWorkspace(repo: any,
    authMethod?: string,
    token?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (repo.uri !== ' ') {
        this.workspaceService.initFromGit({
          repoId: repo.uuid,
          authorization: localStorage.getItem('token'),
          body: {
            author: repo.authorUUID,
            uri: repo.uri,
            gitUsername: authMethod,
            gitPassword: token
          }
        }).toPromise().then(() => {
          resolve();
        }).catch(reason => {
          if (reason === 'Forbidden') {
            reject(reason);
          } else {
            this.initWorkspaceFromFiles(repo, resolve, reject);
          }
        });
      } else {
        this.initWorkspaceFromFiles(repo, resolve, reject);
      }
    });
  }

  public addErrors(errors: number): void {
    this._onError.next({ nErrors: errors, docId: this.editorTabsService.actualTab.documentId });
  }

  public getRepoMetadataDoc(repoId: string): any {
    return this.connection.get('repo_metadata', `${repoId}`);
  }

  public getDocument(title: string, collection = 'files'): any {
    return this.connection.get(collection, title);
  }

  public resetConnection(): void {
    this.connection = new sharedb.Connection(this.socket);
  }

  public async fetchQuery(collection: string, query: object) {
    return new Promise((resolve, reject) => {
      this.connection.createFetchQuery(collection, query, {}, (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        resolve(results)
      });
    });
  }

  public addDocumentToRepoMetadata(docId: string, repoId: string, branch: string): void {
    const doc: any = this.getRepoMetadataDoc(repoId);
    doc.fetch((err) => {
      if (err) {
      }
      const op: any[] = [];
      if (doc.data.files) {
        if (doc.data.files[branch]) {
          if (!doc.data.files[branch].includes(docId)) {
            op.push({ p: ['files', branch, 0], li: docId });
          } else {
            return;
          }
        } else {
          op.push({ p: ['files', branch], oi: [docId] });
        }
      } else {
        op.push({ p: ['files'], oi: { [branch]: [docId] } });
      }
      doc.submitOp(op, (error) => {
        if (error) {
        }
      });
    });
  }

  public createDocument(title: string, content: string): any {
    const doc: any = this.getDocument(title);
    doc.fetch((err) => {
      if (doc.type === null) {
        doc.create(content, 'text-unicode');
      }
    });
    return doc;
  }

  public createOrUpdateDocument(docId: string, content: string,
    repoId: string, branch: string): any {
    const doc: any = this.getDocument(docId);
    doc.fetch((err) => {
      if (doc.type === null) {
        doc.create(content, 'text-unicode', (error) => {
          if (!error) {
            this.addDocumentToRepoMetadata(docId, repoId, branch);
          }
        });
      } else {
        doc.submitOp([{ d: doc.data }, content], (error) => {
        });
      }
    });
  }

  public getFilePresence(docTitle: string): any {
    return this.connection.getPresence(docTitle);
  }

  public getVisualisations(repoId: string): any {
    return this.connection.get('visualizations', repoId);
  }

  public setDiffMode(
    diffMode: boolean,
    originalModel: {
      code: string,
      language: string
    },
    modifiedModel: {
      code: string,
      language: string
    }): void {
    this.diffMode = diffMode;
    this.originalModel = originalModel;
    this.modifiedModel = modifiedModel;
  }

  public createVisualisations(repoId: string, content?: object,
    callback?: (doc: any) => void): any {
    const doc: any = this.getVisualisations(repoId);
    if (!content) {
      content = {
        master: {
          default: {
            title: 'Default board',
            diagram: { cells: [] }
          }
        }
      };
    }
    doc.fetch((err) => {
      if (doc.type === null) {
        doc.create(content, (error) => {
          if (callback) {
            callback(doc);
          }
        });
      }
      if (callback) {
        callback(doc);
      }
    });
    return doc;
  }

  public changePosition(editor: monaco.editor.ICodeEditor,
    cursor: RemoteCursorMonacoWidget,
    op: any[]): void {
    const position: IPosition = cursor.getPosition().position;
    const offset: number = editor.getModel().getOffsetAt(position);
    const newOffset: number = textUnicode.type.transformPosition(offset, op);
    cursor.setPosition(editor.getModel().getPositionAt(newOffset));
  }

  public getFilesBySuffix(suffix: string, repoID: string, branch?: string): Promise<string[]> {
    return new Promise(resolve => {
      if (!branch) {
        branch = localStorage.getItem('currentBranch') || 'master';
      }
      let docIDs: string[] = [];
      const repoMetadataDoc: any = this.getRepoMetadataDoc(repoID);
      repoMetadataDoc.fetch((e) => {
        if (e) {
          resolve([]);
        }
        docIDs = repoMetadataDoc?.data?.files?.[branch].filter(value => {
          return value.substring(0, value.lastIndexOf('?')).endsWith(suffix);
        });
        resolve(docIDs);
      });
    });
  }

  public getContentsOfFilesBySuffix(suffix: string, repoID: string, branch?: string): Promise<string[]> {
    return new Promise(resolve => {
      if (!branch) {
        branch = localStorage.getItem('currentBranch') || 'master';
      }
      let docIDs: string[] = [];
      const repoMetadataDoc: any = this.getRepoMetadataDoc(repoID);
      repoMetadataDoc.fetch((e) => {
        if (e) {
          resolve([]);
        }
        docIDs = repoMetadataDoc.data.files[branch].filter(value => {
          return value.substring(0, value.lastIndexOf('?')).endsWith(suffix);
        });
        resolve(docIDs);
      });
    });
  }

  public getDocContents(docId: string, collection?: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const doc: any = this.getDocument(docId, collection);
      doc.fetch((e) => {
        if (e) {
          reject(e);
        }
        if (doc.data) {
          resolve(doc.data.toString());
        } else {
          reject(docId);
        }
      });
    });
  }

  public getUserColor(userName: string): string {
    this.cursorColors[userName] = this.cursorColors[userName] ||
      randomColor({
        luminosity: 'bright',
        seed: userName
      });
    return this.cursorColors[userName];
  }

  // noinspection JSUnusedGlobalSymbols
  public applyOperation(object: object, operation: any[]): object {
    return jsonOT.type.apply(object, operation);
  }

  public addVisualisationBoard(visualisationsDoc: any, boardTitle: string, branch: string): void {
    visualisationsDoc.fetch((err) => {
      const op: any = [];
      if (visualisationsDoc.data[branch]) {
        op.push({ p: [branch, uuidv4()], oi: { title: boardTitle, diagram: { cells: [] } } });
      } else {
        op.push({
          p: [branch],
          oi: {
            default: {
              title: 'Default board',
              diagram: { cells: [] }
            },
            [uuidv4()]: {
              title: boardTitle,
              diagram: { cells: [] }
            }
          }
        });
      }
      visualisationsDoc.submitOp(op, (error) => {
      });
    });
  }

  public renameVisualisationBoard(visualisationsDoc: any, boardId: string,
    newName: string, branch: string): void {
    visualisationsDoc.fetch((err) => {
      visualisationsDoc.submitOp([{
        p: [branch, boardId, 'title'],
        od: visualisationsDoc.data[branch][boardId].title,
        oi: newName
      }], (error) => {
      });
    });
  }

  public removeVisualisationBoard(visualisationsDoc: any, boardId: string, branch: string): void {
    visualisationsDoc.fetch((err) => {
      visualisationsDoc.submitOp([{
        p: [branch, boardId],
        od: visualisationsDoc.data[branch][boardId]
      }], (error) => {
        if (error) {
          console.warn(error);
        }
      });
    });
  }

  private initWorkspaceFromFiles(repo: any,
    resolve: (value?: (PromiseLike<void> | void)) => void,
    reject: (reason?: any) => void): void {
    this.repoService.getFiles(repo.uuid).subscribe(zipFile => {
      this.workspaceService.initWorkspace({
        repoId: repo.uuid,
        authorization: localStorage.getItem('token'),
        body: {
          author: repo.authorUUID,
          file: zipFile
        }
      }).toPromise().then(() => {
        resolve();
      }).catch(reason => {
        reject(`Files init failed: ${reason}`);
      });
    });
  }

  public async createCodeReview(message: string, selection: monaco.Selection, author_name: string) {
    const documentID = this.editorTabsService.actualTab.documentId;

    const branch = localStorage.getItem('currentBranch') || 'master';
    const repoMetadataDoc = this.getRepoMetadataDoc(this.repoService.currentRepoUuid);

    const doc = this.connection.get('code_review', documentID);

    const content = {
      message,
      created_at: new Date(),
      author_name,
      resolved: false,
      opened: false,
      comments: [],
      selection: {
        selectionStartLineNumber: selection.selectionStartLineNumber,
        selectionStartColumn: selection.selectionStartColumn,
        positionLineNumber: selection.positionLineNumber,
        positionColumn: selection.positionColumn
      }
    }

    const data = {
      reviews: {
        [uuidv4()]: content
      }
    }

    return new Promise((resolve) => {
      doc.fetch((err) => {
        if (err) {
          console.error(err)
          return
        }
        if (doc.type !== null) {
          doc.submitOp([{ p: ['reviews', uuidv4()], oi: content }])

          resolve(doc.data)
        } else {
          doc.create(data, undefined, (err) => {
            if (err) {
              console.error(err)
            }

            repoMetadataDoc.submitOp([{ p: ['codeReviews', branch], oi: [...repoMetadataDoc.data.codeReviews[branch], documentID] }])

            resolve(doc.data)
          })

        }
      })
    });
  }

  public async createCodeReviewComment(reviewID: string, message: string, author_name: string) {
    const documentID = this.editorTabsService.actualTab.documentId;

    const doc = this.connection.get('code_review', documentID);

    const content = {
      content: message,
      created_at: new Date(),
      author_name,
    }

    return new Promise((resolve) => {
      doc.fetch((err) => {
        if (err) {
          console.error(err)
          return
        }

        doc.submitOp([{ p: ['reviews', reviewID, 'comments'], oi: [...doc.data.reviews[reviewID].comments, content] }])
        resolve(doc.data)
      })
    });
  }

  public async getCodeReviews(): Promise<{ id: string, reviews: Review[] }[]> {
    return new Promise((resolve) => {
      const repoMetadataDoc: any = this.getRepoMetadataDoc(this.repoService.currentRepoUuid);
      const branch = localStorage.getItem('currentBranch') || 'master';
      repoMetadataDoc.fetch((e) => {
        if (e) {
          resolve([]);
        }
        const reviewIDs = repoMetadataDoc.data?.codeReviews?.[branch]

        const reviews: { id: string, reviews: Review[] }[] = []
        const promises = reviewIDs?.map(async (id) => {
          const doc = this.connection.get('code_review', id);
          return new Promise((resolve) => {
            doc.fetch((err) => {
              if (err) {
                console.error(err)
                return
              }
              if (doc.type !== null) {
                reviews.push({
                  id,
                  ...doc.data
                })
              }
              resolve(true)
            })
          })
        }) ?? []

        Promise.all(promises).then(() => {
          resolve(reviews)
        })
      });
    })
  }

  public async resolveCodeReview(reviewID: string) {
    const documentID = this.editorTabsService.actualTab.documentId;

    const doc = this.connection.get('code_review', documentID);

    return new Promise((resolve) => {
      doc.fetch((err) => {
        if (err) {
          console.error(err)
          return
        }

        doc.submitOp([{ p: ['reviews', reviewID, 'resolved'], oi: true }])
        resolve(doc.data)
      })
    });
  }

  public async createDirectMessage(senderName: string, recieverName: string, message: string) {
    let doc = this.connection.get('direct_messages', `${recieverName}-${senderName}`);

    // check if the document exists
    return new Promise((resolve) => {
      doc.fetch((err) => {
        if (err) {
          console.error(err)
          return
        }
        if (doc.type === null) {
          // check another combination if exists
          doc = this.connection.get('direct_messages', `${senderName}-${recieverName}`);

          doc.fetch((err) => {
            if (err) {
              console.error(err)
              return
            }
            if (doc.type === null) {
              // create a new document
              doc.create({
                messages: [{
                  authorName: senderName,
                  content: message,
                  date: new Date()
                }]
              }, undefined, (err) => {
                if (err) {
                  console.error(err)
                }

                resolve(doc.data)
              })
            } else {
              resolve(doc.data)
            }
          })
        } else {
          doc.submitOp([{ p: ['messages', doc.data.messages.length], li: { authorName: senderName, content: message, date: new Date() } }])

          resolve(doc.data)
        }
      })
    });

  }

  public async createChatRoom(name: string, authorID: string, open: boolean = true, classroom?: string) {
    const doc = this.connection.get('chatrooms', uuidv4());

    const content = {
      created_at: new Date(),
      author_id: authorID,
      name,
      active: false,
      messages: [],
      open,
      classroom
    }

    return new Promise((resolve) => {
      doc.fetch((err) => {
        if (err) {
          console.error(err)
          return
        }

        doc.create(content, undefined, (err) => {
          if (err) {
            console.error(err)
          }

          resolve(doc.data)
        })
      })
    });
  }

  public async deleteChatRoom(roomID: string) {
    const doc = this.connection.get('chatrooms', roomID);

    return new Promise((resolve) => {
      doc.fetch((err) => {
        if (err) {
          console.error(err)
          return
        }

        doc.del((err) => {
          if (err) {
            console.error(err)
          }

          resolve(doc.data)
        })
      })
    });
  }

  public async deleteDirectMessage(directID: string) {
    const doc = this.connection.get('direct_messages', directID);
  
    return new Promise((resolve) => {
      doc.fetch((err) => {
        if (err) {
          console.error(err)
          return
        }
        
        doc.del((err) => {
          if (err) {
            console.error(err)
          }
  
          resolve(doc.data)
        })
      })
    });
  }
}


export function processChange(change: monaco.editor.IModelContentChange): any[] {
  let operation: any[];
  if (change.rangeLength > 0) {
    operation = [change.rangeOffset, { d: change.rangeLength }];
    if (change.text !== '') {
      const changeText: string = change.text.replace(/\r/g, '');
      if (changeText !== '') {
        operation.push(change.text);
      }
    }
  } else if (change.rangeLength === 0) {
    operation = [change.rangeOffset, change.text];
  }
  return operation;
}

export function processRemoteOpForMonaco(op: any[], editor: ICodeEditor):
  IIdentifiedSingleEditOperation {
  let range: monaco.Range;
  let text: string = '';
  let start: any = editor.getModel().getPositionAt(op[0]);
  if (typeof op[0] !== 'number') {
    op.unshift(0);
    start = { lineNumber: 1, column: 0 };
  }
  if (typeof op[1] === 'string') {
    range = new monaco.Range(start.lineNumber, start.column, start.lineNumber, start.column);
    text = op[1];
  } else if (typeof op[1] === 'object') {
    const end: any = editor.getModel().getPositionAt(op[0] + op[1].d);
    range = new monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column);
    if (op[2] && typeof op[2] === 'string') {
      text = op[2];
    }
  }

  return { range, text, forceMoveMarkers: true };
}

export function getFileNameFromDocID(docID: string): string {
  let result: string = docID.substring(0, docID.lastIndexOf('?'));
  result = result.substring(result.lastIndexOf('/') + 1);
  return result;
}

export function documentTitle(repoID: string, filePath: string,
  authorUUID: string, branch: string = 'master'): string {
  return `${authorUUID}-${repoID}-repo_${repoID}/${filePath}?${branch}`;
}

export function initializeDiagram(doc: any,
  branch: string,
  title: string,
  diagram: object = { cells: [] },
  boardId?: string,
  callback?: () => void): void {
  boardId = boardId || 'default';
  let op: object;
  if (!doc.data[branch]) {
    op = {
      p: [branch], oi: {
        [boardId]: {
          title,
          diagram
        }

      }
    };
  } else if (!doc.data[branch][boardId]) {
    op = {
      p: [branch, boardId], oi: {
        title,
        diagram
      }
    };
  }
  if (op) {
    doc.submitOp(op, (err) => {
      if (callback) {
        callback();
      }
    });
  } else {
    if (callback) {
      callback();
    }
  }
}

export function addCellToDiagram(visualizationsDoc: any,
  cell: object, branch: string,
  activeBoardId: string,
  callback?: () => void): void {
  const op: object = { p: [branch, activeBoardId, 'diagram', 'cells', 0], li: cell };
  visualizationsDoc.submitOp(op, callback);
}

export function removeCellFromDiagram(visualizationsDoc: any,
  cellId: string,
  branch: string,
  activeBoardId: string,
  callback?: () => void): void {
  const index: number = visualizationsDoc.data[branch][activeBoardId].diagram.cells
    .findIndex((value) => {
      return value.id === cellId;
    });
  const op: object = {
    p: [branch, activeBoardId, 'diagram', 'cells', index],
    ld: visualizationsDoc.data[branch][activeBoardId].diagram.cells[index]
  };
  visualizationsDoc.submitOp(op, callback);
}

export function changeDiagramCell(visualizationsDoc: any,
  change: any,
  branch: string,
  activeBoardId: string,
  callback?: () => void): void {
  const index: number = visualizationsDoc.data[branch][activeBoardId]
    .diagram.cells.findIndex(value => {
      return value.id === change.id;
    });
  const op: any = [];
  for (const [key, value] of Object.entries(change.changed)) {
    op.push({
      p: [branch, activeBoardId, 'diagram', 'cells', index, key],
      od: visualizationsDoc.data[branch][activeBoardId].diagram.cells[index][key],
      oi: value
    });
  }
  visualizationsDoc.submitOp(op, callback);
}

export function getVisualizationPresenceId(repoId: string,
  branch: string, activeBoard: string): string {
  return `vis-${repoId}-${branch}-${activeBoard}`;
}




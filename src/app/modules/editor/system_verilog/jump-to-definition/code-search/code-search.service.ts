import { Injectable } from '@angular/core';
import { SearchEngineService } from './search-engine/search-engine.service';
import { CodeIdentificationService } from '../code-identification/code-identification.service';
import { EditorTabsService } from '../../../editor-component/editor-tabs/service/editor-tabs.service';
import { VariableMetaData } from './model/variable-meta-data';
import { SearchAroundService } from './search-around/search-around.service';
import { CollabService } from '../../../../../core/service/collab.service';
import { RepositoryService } from '../../../../../core/service/repository.service';
import { Repository } from '../../../../../api/models/repository';
import { Code } from './model/code';
import { FileMetaData } from './model/file-meta-data';


@Injectable({
  providedIn: 'root'
})
export class CodeSearchService {

  constructor(
    private searchEngine: SearchEngineService,
    private codeIdentification: CodeIdentificationService,
    private tabsService: EditorTabsService,
    private searchAround: SearchAroundService,
    private collaborationService: CollabService,
    private repository: RepositoryService) {
  }


  public findAllWordsInCode(variableName: string, code: string): VariableMetaData[] {
    this.searchAround.text = code;
    return this.searchEngine.findAllOccurrences(variableName, code);
  }


  public findAllWordsInOpenCode(variableName: string): VariableMetaData[] {
    const code: string = this.tabsService.actualTab.code;
    this.searchAround.text = code;
    if (!variableName) {
      return null;
    }
    return this.searchEngine.findAllOccurrences(variableName, code);
  }

  public async getAllSVCodes(): Promise<Code[]> {

    let repositoryId: string = null;
    await this.getRepositoryId().then((id) => {
      repositoryId = id;
    });
    let filesId: string[] = [];
    await this.getSVFilesId(repositoryId).then((ids) => {
      filesId = ids;
    });
    let fileCodes: Code[] = [];
    await this.getCodesBy(filesId).then((codes) => {
      fileCodes = codes;
    });
    return fileCodes;
  }

  public async getRepositoryId(): Promise<string> {
    const repository: string = localStorage.getItem('repository');
    let repositoryId: string = null;
    const uuid = JSON.parse(repository).uuid;
    await this.repository.getRepo(uuid).toPromise().then((repository) => {
      repositoryId = String((repository as Repository).uuid);
    });
    return repositoryId;
  }

  public async getSVFilesId(repositoryId: string): Promise<string[]> {
    let filesId: string[] = [];
    await this.collaborationService.getFilesBySuffix('.sv', repositoryId).then((files) => {
      filesId = files;
    });
    return filesId;
  }

  public async getCodesBy(filesId: string[]): Promise<Code[]> {
    const codes: Code[] = [];
    for (const id of filesId) {
      await this.getCodeBy(id).then((code) => {
        if (code) {
          codes.push(code);
        }
      });
    }
    return codes;
  }

  public async getCodeBy(id: string): Promise<Code> {
    const fileMetaData: FileMetaData = this.parseFileId(id);
    let code: Code = null;
    await this.collaborationService.getDocContents(id).then(file => {
      code = {fileId: id, fileMetaData, code: file};
    });
    return code;
  }

  public parseFileId(fileId: string): FileMetaData {
    const idAttributes: string[] = fileId.split('?');
    const branch: string = idAttributes.pop();
    const pathAttributes: string[] = idAttributes[0].split('/');
    pathAttributes.shift();
    const fullNameAttributes: string[] = pathAttributes.pop().split('.');
    const name: string = fullNameAttributes[0];
    const format: string = fullNameAttributes[1];
    let path: string = pathAttributes.join('/');
    if (!path) {
      path = 'root';
    } else {
      path = 'root/' + path;
    }


    return {format, path, name, branch};
  }
}

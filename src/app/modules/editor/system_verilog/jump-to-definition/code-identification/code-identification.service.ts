import { Injectable } from '@angular/core';
import { SearchWordsAroundService } from './search-words-around/search-words-around.service';
import { EditorTabsService } from '../../../editor-component/editor-tabs/service/editor-tabs.service';
import { systemVerilogKeywords } from '../../code-completion/proposals/systemVerilogKeywords';
import { CodeTypes } from './model/code-types.enum';
import { Range } from '../model/range';
import { VariableMetaData } from '../code-search/model/variable-meta-data';
import { SearchAroundService } from '../code-search/search-around/search-around.service';
import IStandEditor = monaco.editor.IStandaloneCodeEditor;

@Injectable({
  providedIn: 'root'
})
/**
 *  * If you want identify variable in current open code, pass
 * {@link monaco.editor.IStandaloneCodeEditor Editor} to function
 * ```typescript
 *  const editor:IStandaloneCodeEditor=getEditor();
 *  identifyWord(editor);
 * ```
 *
 * * If you want identify search variable from {@link SearchAroundService}
 * you have to first use function from {@link CodeSearchService} findAllWords...
 * ```typescript
 *  const data:VariableMetaData[]=findAllWordsInOpenCode('Module');
 *  identifyWord(null,data[0]);
 * ```
 *
 * * If you want identify just {@link VariableMetaData} you have to manually set text to search in
 * {@link SearchAroundService}
 *  ```
 *  identifyWord(editor);
 *  ```
 */


export class CodeIdentificationService {

  constructor(private tabsService: EditorTabsService,
              private monacoSearchAround: SearchWordsAroundService,
              private searchAround: SearchAroundService) {
  }

  private static testRegex(regex: string, text: string): boolean {
    const regexp: RegExp = new RegExp(regex);
    return regexp.test(text);
  }

  private static matchRegex(regex: string, text: string): boolean {
    const regexp: RegExp = new RegExp(regex);
    return !!text.match(regexp)[0];
  }

  private static definitionCompare(keyword: string, code: string): boolean {
    const regex: string = '^\\b' + keyword.trim() + '\\s[^()]*$';
    return CodeIdentificationService.testRegex(regex, code);
  }

  public identifyWord(editor: IStandEditor, data?: VariableMetaData): CodeTypes {
    if (this.isClassConstructor(editor, data)) {
      return CodeTypes.CLASS_CONSTRUCTOR;
    }
    if (this.isCustomObject(editor, data) && !this.isModuleInstance(editor, data)) {
      return CodeTypes.CUSTOM_OBJECT;
    }
    if (this.isKeyword(editor, data)) {
      return CodeTypes.DEFINITION;
    }
    if (this.isDefinitionWithKeyword(editor, data)) {
      return CodeTypes.DEFINITION;
    }
    if (this.isCustomDefinition(editor, data) && !this.isModuleInstance(editor, data)) {
      return CodeTypes.DEFINITION;
    }
    if (this.isGlobalModuleInstance(editor, data)) {
      return CodeTypes.MODULE_CALL_GLOBAL;
    }
    if (this.isLocalModuleInstance(editor, data)) {
      return CodeTypes.MODULE_CALL_LOCAL;
    }
    if (this.isClassProperty(editor, data) || this.isModuleProperty(editor, data)) {
      return CodeTypes.CLASS_OR_MODULE_PROPERTY;
    }
    if (this.isPackageInstance(editor, data)) {
      return CodeTypes.PACKAGE_INSTANCE;
    }
    if (this.isFunctionCall(editor, data)) {
      return CodeTypes.FUNCTION;
    }
    return CodeTypes.LOCAL_VARIABLE;
  }

  public isLocalModuleInstance(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const range: Range = {toLeft: 1, toRight: 1};
    const code: string = this.setCode(range, editor, data);
    const regex: string = '^[^\\s\\.:();=*+-\\/]+\\s+([^\\s\\.])+\\s*(\\()\\s*([^\\s]\\s*)*';
    return CodeIdentificationService.testRegex(regex, code);
  }

  public isGlobalModuleInstance(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const range: Range = {toLeft: 0, toRight: 2};
    const code: string = this.setCode(range, editor, data);
    const regex: string
      = '^[^\\s\\.:();=*+-\\/]+\\s+([^\\s\\.])+\\s*(\\()\\s*([^\\s]\\s*)*';
    return CodeIdentificationService.testRegex(regex, code);
  }

  public isModuleProperty(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const range: Range = {toLeft: 1, toRight: 0};
    const code: string = this.setCode(range, editor, data);
    const regex: string = '[^\\s]+\\s*\\.\\s*[^\\s]+';
    return CodeIdentificationService.testRegex(regex, code);
  }

  public isModuleInstance(editor?: IStandEditor, data?: VariableMetaData): boolean {
    return this.isGlobalModuleInstance(editor, data) || this.isLocalModuleInstance(editor, data);
  }

  public isPackageInstance(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const range: Range = {toLeft: 1, toRight: 1};
    const code: string = this.setCode(range, editor, data);
    const regex: string = '([^\\s\\.:();=*+-\\/])+\\s*((::))\\s*([^\\s])+';
    return CodeIdentificationService.testRegex(regex, code);
  }

  public isImport(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const range: Range = {toLeft: 1, toRight: 0};
    const code: string = this.setCode(range, editor, data);
    const regex: string = '^(import)\\s*([^\\s])+';
    return CodeIdentificationService.testRegex(regex, code);
  }

  public isFunctionCall(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const range: Range = {toLeft: 0, toRight: 1};
    const code: string = this.setCode(range, editor, data);
    const regex: string = '^([^\\s])+(?<!\\bnew)\\s*(\\()\\s*([^\\s]\\s*)*';
    return CodeIdentificationService.testRegex(regex, code);
  }

  public isClassConstructor(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const range: Range = {toLeft: 0, toRight: 1};
    const code: string = this.setCode(range, editor, data);
    const regex: string = '^(\\bnew)\\s*(\\()\\s*([^\\s]\\s*)*';
    return CodeIdentificationService.testRegex(regex, code);
  }

  public isClassProperty(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const range: Range = {toLeft: 1, toRight: 0};
    const code: string = this.setCode(range, editor, data);
    const regex: string = '^[^\\s]+\\s*\\.\\s*[^\\s]+$';
    return CodeIdentificationService.testRegex(regex, code);
  }

  public isDefinitionByKeyword(keyword: string, editor?: IStandEditor, data?: VariableMetaData): boolean {
    const range: Range = {toLeft: 1, toRight: 0};
    const code: string = this.setCode(range, editor, data);
    return CodeIdentificationService.definitionCompare(keyword, code);
  }

  public isDefinitionWithKeyword(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const keywords: Array<string> = this.keywordsWithoutExceptions(systemVerilogKeywords());
    const range: Range = {toLeft: 1, toRight: 0};
    const code: string = this.setCode(range, editor, data);
    for (const keyword of keywords) {
      if (CodeIdentificationService.definitionCompare(keyword, code)) {
        return true;
      }
    }
    return false;
  }

  public isKeyword(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const range: Range = {toLeft: 0, toRight: 0};
    const code: string = this.setCode(range, editor, data);
    return systemVerilogKeywords().includes(code);
  }

  public isDefinitionWithKeywordExcept(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const keywords: Array<string> = ['end', 'begin'];
    const range: Range = {toLeft: 1, toRight: 0};
    const code: string = this.setCode(range, editor, data);
    for (const keyword of keywords) {
      if (CodeIdentificationService.definitionCompare(keyword, code)) {
        return true;
      }
    }
    return false;
  }

  public isCustomObject(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const range: Range = {toLeft: 0, toRight: 1};
    const code: string = this.setCode(range, editor, data);
    const regex: string = '^[^\\s=,.;:\\(\\)]+\\s*[^\\s=,.;:\\(\\)]*[;,=]*$';
    return CodeIdentificationService.testRegex(regex, code) && !this.isKeyword(editor, data);
  }

  public isCustomDefinition(editor?: IStandEditor, data?: VariableMetaData): boolean {
    const range: Range = {toLeft: 1, toRight: 0};
    const code: string = this.setCode(range, editor, data);
    const regex: string = '^[^\\s=,.;:\\(\\)]+\\s*[^\\s=,.;:\\[\\(\\)]*[;,=]*$';
    return CodeIdentificationService.testRegex(regex, code) && !this.isKeyword(editor, data) && !this.isDefinitionWithKeywordExcept(editor, data);
  }

  public setCode(range: Range, editor?: IStandEditor, data?: VariableMetaData): string {
    if (editor) {
      return this.monacoSearchAround.geSubstringOfAroundWords(range, editor);
    } else if (data) {
      return this.createCodeToIdentificationFrom(range, data);
    }
    return '';
  }

  public createCodeToIdentificationFrom(range: Range, data: VariableMetaData): string {
    const previousIndex: number = this.searchAround.getPreviousWords(range.toLeft, data.column);
    const nextIndex: number = this.searchAround.getNextWords(range.toRight, data.column);
    return this.searchAround.text.substring(previousIndex, nextIndex).trim();
  }

  private keywordsWithoutExceptions(systemVerilogKeywords: string[]): string[] {
    systemVerilogKeywords.splice(systemVerilogKeywords.indexOf('end'), 1);
    systemVerilogKeywords.splice(systemVerilogKeywords.indexOf('begin'), 1);
    return systemVerilogKeywords;
  }

}

import { Injectable } from '@angular/core';
import { VariableMetaData } from './code-search/model/variable-meta-data';
import { CodeTypes } from './code-identification/model/code-types.enum';
import { CodeIdentificationService } from './code-identification/code-identification.service';
import { CodeSearchService } from './code-search/code-search.service';
import { TooltipMonacoService } from './tooltip/tooltip-monaco.service';
import { JumpToDefinitionError } from './model/error/jump-to-definition-error';
import { TooltipType } from './tooltip/model/tooltip-type.enum';
import { EditorTabsService } from '../../editor-component/editor-tabs/service/editor-tabs.service';
import { SearchAroundService } from './code-search/search-around/search-around.service';
import { Code } from './code-search/model/code';
import { first } from 'rxjs/operators';
import { FileMetaData } from './code-search/model/file-meta-data';
import { FileCode } from '../../editor-component/editor-tabs/model/file-code/file-code';
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import ITextModel = monaco.editor.ITextModel;
import IPosition = monaco.IPosition;
import IWordAtPosition = monaco.editor.IWordAtPosition;
import Position = monaco.Position;
import Range = monaco.Range;

@Injectable({
  providedIn: 'root'
})
export class JumpToDefinitionService {
  private definitionDecoration: string;
  private hoverDecorations: Set<string>;
  private decorationLineNumber: number;

  constructor(private codeIdentification: CodeIdentificationService,
              private codeSearch: CodeSearchService,
              private tooltipMonaco: TooltipMonacoService,
              private tabsService: EditorTabsService,
              private searchAround: SearchAroundService) {
    this.hoverDecorations = new Set<string>();
  }

  private _editor: IStandaloneCodeEditor;

  get editor(): monaco.editor.IStandaloneCodeEditor {
    return this._editor;
  }

  set editor(value: monaco.editor.IStandaloneCodeEditor) {
    this._editor = value;
  }

  private _clickedVariable: VariableMetaData;


  get clickedVariable(): VariableMetaData {
    return this._clickedVariable;
  }

  set clickedVariable(value: VariableMetaData) {
    this._clickedVariable = value;
  }

  private _allSVCodes: Code[];


  get allSVCodes(): Code[] {
    return this._allSVCodes;
  }

  set allSVCodes(value: Code[]) {
    this._allSVCodes = value;
  }

  public bindJumpToDefinition(editor: IStandaloneCodeEditor): void {
    this.codeSearch.getAllSVCodes().then((response) => {
      this.allSVCodes = response;
    });
    this.editor = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd + monaco.KeyCode.KEY_B, () => {
        this.jumpToDefinition(editor);
      }
    );

    editor.onMouseDown((mouseEvent) => {
      editor.deltaDecorations([this.definitionDecoration], []);
      if (mouseEvent.event.ctrlKey) {
        this.jumpToDefinition(editor);
      }
    });

    editor.onMouseMove((mouseEvent) => {

      if (mouseEvent.event.ctrlKey) {
        const mousePosition = mouseEvent.target.position;

        const model: ITextModel = this.editor.getModel();
        try {
          const iWord: IWordAtPosition = model.getWordAtPosition(mousePosition);

          const wordRange: monaco.Range = new monaco.Range(mousePosition.lineNumber,
            iWord.startColumn, mousePosition.lineNumber, iWord.endColumn);
          if (this.isMouseInWordRange(mousePosition, iWord)) {
            this.clearAllDDecoration(editor);
          }
          this.hoverDecorations.add(editor.deltaDecorations([], [
            {
              range: wordRange,
              options: {
                isWholeLine: false,
                inlineClassName: 'decoration',
              }
            },
          ])[0]);
          this.decorationLineNumber = mousePosition.lineNumber;

        } catch (e) {
          this.clearAllDDecoration(editor);
        }
      } else {
        this.clearAllDDecoration(editor);
      }
    });
  }

  public localDefinitionNotFound(error: JumpToDefinitionError, codeType: CodeTypes): void {
    if (error.name === 'declaration') {
      this.tooltipMonaco.createTooltip(this.editor, error.message, TooltipType.warning);
    }
    if (error.name === 'definition') {
      if (this.isParameterAdept(codeType)) {
        this.jumpToParameter();
      }
      if (this.isPackageAdept(codeType)) {
        this.jumpToPackageProperty(codeType);
      }
      if (this.isObjectAdept(codeType)) {
        this.jumpToObject(codeType);
      }
      if (this.isObjectPropertyAdept(codeType)) {
        this.jumpToObjectProperty();
      }
    }
  }

  public isParameterAdept(codeType: CodeTypes) {
    return CodeTypes.LOCAL_VARIABLE === codeType;
  }

  public getDefinitionIndex(occurrences: VariableMetaData[], variable: VariableMetaData): number {
    const actualIndex: number = occurrences.findIndex(item => item.index === variable.index);
    for (const data of occurrences.slice(actualIndex)) {
      const codeType: CodeTypes = this.codeIdentification.identifyWord(null, data);
      if (codeType === CodeTypes.DEFINITION) {
        return data.index;
      }
    }
    return null;
  }

  public createTabFromCode(code: Code): void {
    const fileMetaData: FileMetaData = code.fileMetaData;
    const tabTitle: string = fileMetaData.name + '.' + fileMetaData.format;
    const tabPath: string = fileMetaData.path;
    const fileCode: FileCode = new FileCode(tabTitle, tabPath, code.fileId);
    this.tabsService.addTab(fileCode);
  }

  public jumpToPackageProperty(codeType: CodeTypes): void {
    try {
      if (codeType === CodeTypes.PACKAGE_INSTANCE) {
        try {
          const variableNameIndex: number = this.searchAround.getPreviousWords(1, this.clickedVariable.column);
          let variableName: string = this.searchAround.text.substring(variableNameIndex, this.clickedVariable.index).trim();
          if (codeType === CodeTypes.PACKAGE_INSTANCE) {
            variableName = variableName.split('::')[0];
            this.jumpToProperty(variableName);
          }

        } catch (e) {
          this.jumpToProperty(this.clickedVariable.word);
        }
        return;
      }

      const importedPackages: Code[] = this.getImportedPackages();
      importedPackages.forEach((packageCode) => {
        const index: number = this.searchDefinitionInCode(packageCode.code);
        this.createTabByCodeAndJumpToIndex(packageCode, index);
      });
    } catch (e) {
      this.tooltipMonaco.createTooltip(this.editor, 'Definition not found !', TooltipType.danger);
    }
  }

  public getGlobalModuleFromLocal(): VariableMetaData {
    const variableNameIndex: number = this.searchAround.getPreviousWords(1, this.clickedVariable.index);
    const variableName: string = this.searchAround.text.substring(variableNameIndex, this.clickedVariable.index).trim();
    return {
      column: variableNameIndex,
      index: variableNameIndex,
      lineNumber: this.clickedVariable.lineNumber,
      word: variableName
    };

  }

  public jumpFromConstructor(): void {
    const variableNameIndex: number = this.searchAround.getPreviousWords(1, this.clickedVariable.index);
    let variableName: string = this.searchAround.text.substring(variableNameIndex, this.clickedVariable.index).trim();
    variableName = variableName.split('=')[0];
    const variable: VariableMetaData = {
      column: variableNameIndex + 1,
      index: variableNameIndex + 1,
      lineNumber: this.clickedVariable.lineNumber,
      word: variableName
    };
    const objectName: string = this.getObjectName(variable);
    this.clickedVariable.word = objectName;
    this.jumpToProperty(objectName);
  }

  public jumpToModuleProperty(variable: VariableMetaData): void {
    try {
      const moduleNameAdept2: string = this.extractModuleName(3, variable);
      this.jumpToProperty(moduleNameAdept2);
    } catch (e) {
      try {
        const moduleNameAdept1: string = this.extractModuleName(2, variable);
        this.jumpToProperty(moduleNameAdept1);
      } catch (e) {
        throw new JumpToDefinitionError('Definition not found !', 'definition');
      }
    }
  }

  public jumpToClassProperty(variable: VariableMetaData): void {
    const variableNameIndex: number = this.searchAround.getPreviousWords(1, variable.column);
    let variableName: string = this.searchAround.text.substring(variableNameIndex, variable.index).trim();
    variableName = variableName.split('.')[0];
    const variableObject: VariableMetaData = {
      column: variableNameIndex + 1,
      index: variableNameIndex + 1,
      lineNumber: variable.lineNumber,
      word: variableName
    };

    try {
      const objectName: string = this.getObjectName(variableObject);
      this.jumpToProperty(objectName);
    } catch (e) {
      try {
        this.jumpToPackageProperty(CodeTypes.CLASS_OR_MODULE_PROPERTY);
      } catch (e) {
        throw new JumpToDefinitionError('Definition not found !', 'definition');
      }
      throw new JumpToDefinitionError('Definition not found !', 'definition');
    }

  }

  public getObjectName(variable: VariableMetaData): string {

    try {
      const variableDefinitionNameIndex: number = this.searchDefinitionLocally(variable);
      const objectDefinitionIndex: number = this.searchAround.getPreviousWords(1, variableDefinitionNameIndex);
      return this.searchAround.text.substring(objectDefinitionIndex, variableDefinitionNameIndex).trim();
    } catch (e) {
      throw new JumpToDefinitionError('Definition not found !', 'definition');
    }
  }

  public jumpToProperty(fileName: string): void {
    const objectCode: Code = this.getFirstOccurrenceInAllSVCodesBy(fileName);
    const index: number = this.searchDefinitionInCode(objectCode.code.trim());
    this.createTabByCodeAndJumpToIndex(objectCode, index);
  }

  public extractModuleName(previousWords: number, variable: VariableMetaData): string {
    let previousIndex: number;
    let previousWord: string;
    previousIndex = this.searchAround.getPreviousWords(previousWords, variable.column);
    previousWord = this.searchAround.text.substring(previousIndex, variable.index);
    return previousWord.trim().split(' ')[0];
  }

  public jumpToLocalDefinition(): void {
    const index: number = this.searchDefinitionLocally();
    const position: IPosition = this.getIPositionByIndex(this.editor, index);
    this.goToPosition(position, this.editor);
  }

  public getPackageCodeBy(variable: VariableMetaData): Code {
    const nextIndex: number = this.searchAround.getNextWords(1, variable.column);
    let word: string = this.searchAround.text.substring(variable.index, nextIndex).trim();
    word = word.split(' ')[1];
    const code: Code = this.getFirstOccurrenceInAllSVCodesBy(word);
    if (code) {
      return code;
    }
    return null;
  }

  public getImportedPackages(): Code[] {
    let allOccurrences: VariableMetaData[];
    allOccurrences = this.codeSearch.findAllWordsInOpenCode('import');
    const packages: Code [] = [];
    for (const variable of allOccurrences) {
      packages.push(this.getPackageCodeBy(variable));
    }
    return packages;
  }

  public getAllOccurrencesInAllSVCodesBy(name: string): Code [] {
    return this.allSVCodes.filter(o => o.fileMetaData.name === name);
  }

  public getFirstOccurrenceInAllSVCodesBy(name: string): Code {
    return this.allSVCodes.find(o => o.fileMetaData.name === name);
  }

  public searchDefinitionLocally(variable?: VariableMetaData): number {
    let allOccurrences: VariableMetaData[];
    let searchVariable: VariableMetaData = this.clickedVariable;
    if (variable) {
      searchVariable = variable;
    }
    allOccurrences = this.codeSearch.findAllWordsInOpenCode(searchVariable.word);
    const index: number = this.getDefinitionIndex(allOccurrences, searchVariable);
    if (!index) {
      throw new JumpToDefinitionError('Definition not found !', 'definition');
    }
    return index;
  }

  public searchDefinitionInCode(code: string): number {
    let allOccurrences: VariableMetaData[];
    allOccurrences = this.codeSearch.findAllWordsInCode(this.clickedVariable.word, code);
    const index: number = this.getDefinitionIndex(allOccurrences, this.clickedVariable);
    if (!index) {
      throw new JumpToDefinitionError('Definition not found !', 'definition');
    }

    return index;
  }

  public goToPosition(iPosition: IPosition, editor: IStandaloneCodeEditor): void {
    this.editor.setPosition(iPosition);
    this.editor.revealLineInCenter(iPosition.lineNumber);
    this.editor.focus();
    this.highlightDefinition(editor);
  }

  public goToPositionNewEditor(editor: IStandaloneCodeEditor, iPosition: IPosition): void {
    editor.onDidChangeCursorPosition(e => {
      if (e.source === 'model') {
        console.warn('Cursor Model Change');
        this.goToPosition(iPosition, editor);
      }
    });
  }

  public getIPositionByIndex(editor: IStandaloneCodeEditor, index: number): IPosition {
    const model: ITextModel = editor.getModel();
    return model.getPositionAt(index);
  }

  public getClickedVariable(): VariableMetaData {
    const model: ITextModel = this.editor.getModel();
    const clickedPosition: monaco.Position = this.editor.getPosition();
    const lineNumber: number = clickedPosition.lineNumber;
    const iWord: IWordAtPosition = model.getWordAtPosition(clickedPosition);
    if (!iWord) {
      throw new JumpToDefinitionError('This is not declaration', 'declaration');
    }
    const column: number = iWord.startColumn;
    const index: number = model.getOffsetAt(model.validatePosition({lineNumber, column}));
    return {lineNumber, column: index, word: iWord.word, index};
  }

  public isPackageAdept(codeType: CodeTypes): boolean {
    const isFunction: boolean = codeType === CodeTypes.FUNCTION;
    const isCustomObject: boolean = codeType === CodeTypes.CUSTOM_OBJECT;
    const isPackageInstance: boolean = codeType === CodeTypes.PACKAGE_INSTANCE;
    return isFunction || isCustomObject || isPackageInstance;
  }

  public isObjectAdept(codeType: CodeTypes): boolean {
    const isClass: boolean = codeType === CodeTypes.CLASS_CONSTRUCTOR;
    let isModule: boolean = codeType === CodeTypes.MODULE_CALL_GLOBAL;
    isModule = isModule || codeType === CodeTypes.MODULE_CALL_LOCAL;
    const isCustomObject: boolean = codeType === CodeTypes.CUSTOM_OBJECT;
    return isClass || isModule || isCustomObject;
  }

  public isObjectPropertyAdept(codeType: CodeTypes): boolean {
    return codeType === CodeTypes.CLASS_OR_MODULE_PROPERTY;
  }

  private isMouseInWordRange = (mousePosition: Position, iWord: IWordAtPosition) => {
    const isInBeginRange: boolean = mousePosition.column >= iWord.startColumn;
    const isInEndRange: boolean = mousePosition.column <= iWord.endColumn;
    const isSameLine: boolean = this.decorationLineNumber !== mousePosition.lineNumber;
    return isInBeginRange && isInEndRange && !isSameLine;
  };

  private clearAllDDecoration(editor) {
    this.hoverDecorations.forEach((decoration) => {
      editor.deltaDecorations([decoration], []);
    });
  }

  private jumpToDefinition(editor) {
    let codeType: CodeTypes;
    try {
      this.clickedVariable = this.getClickedVariable();
      codeType = this.codeIdentification.identifyWord(editor);
      this.jumpToLocalDefinition();
    } catch (error) {
      this.localDefinitionNotFound(error, codeType);
    }
  }

  private jumpToParameter() {
    try {
      this.jumpToPackageProperty(CodeTypes.LOCAL_VARIABLE);
    } catch (e) {

    }
  }

  private createTabByCodeAndJumpToIndex(code: Code, index: number): void {
    this.createTabFromCode(code);
    this.tabsService.actualEditor.pipe(first()).subscribe((editorResponse) => {
      const position: IPosition = this.getIPositionByIndex(editorResponse, index);
      this.goToPositionNewEditor(editorResponse, position);
    });
  }

  private jumpToObject(codeType: CodeTypes): void {
    try {
      if (codeType === CodeTypes.CLASS_CONSTRUCTOR) {
        this.jumpFromConstructor();
        return;
      }
      if (codeType === CodeTypes.MODULE_CALL_LOCAL) {
        this.clickedVariable = this.getGlobalModuleFromLocal();
      }
      const objectCode: Code = this.getFirstOccurrenceInAllSVCodesBy(this.clickedVariable.word);
      if (!objectCode) {
        this.tooltipMonaco.createTooltip(this.editor, 'Definition not found !', TooltipType.danger);
      }
      const index: number = this.searchDefinitionInCode(objectCode.code);
      this.createTabByCodeAndJumpToIndex(objectCode, index);
    } catch (e) {
      this.tooltipMonaco.createTooltip(this.editor, 'Definition not found !', TooltipType.danger);
    }
  }

  private jumpToObjectProperty(): void {
    try {
      const variable: VariableMetaData = this.getClickedVariable();
      try {
        this.jumpToModuleProperty(variable);
      } catch (e) {
        try {
          this.jumpToClassProperty(variable);
        } catch (e) {
          this.tooltipMonaco.createTooltip(this.editor, 'Definition not found !', TooltipType.danger);
        }
      }
    } catch (e) {
      this.tooltipMonaco.createTooltip(this.editor, 'Definition not found !', TooltipType.danger);
    }
  }

  private highlightDefinition(editor) {
    const model: ITextModel = this.editor.getModel();
    const clickedPosition: monaco.Position = this.editor.getPosition();
    const lineNumber: number = clickedPosition.lineNumber;
    const iWord: IWordAtPosition = model.getWordAtPosition(clickedPosition);
    const wordRange: Range = new monaco.Range(
      lineNumber, iWord.startColumn,
      lineNumber,
      iWord.endColumn
    );
    this.definitionDecoration = (editor.deltaDecorations([], [
      {
        range: wordRange,
        options: {
          isWholeLine: false,
          inlineClassName: 'decoration-definition',
        }
      },
    ])[0]);
  }

}

import { Injectable } from '@angular/core';
import { Tab } from '../model/tab/tab';
import { BehaviorSubject, Subject } from 'rxjs';
import { FileCode } from '../model/file-code/file-code';
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;

@Injectable({
  providedIn: 'root'
})
export class EditorTabsService {

  public onSimulationConfigSave: Subject<void>;
  public decorations: string[];

  constructor() {
    this._tabs = [];
    this.actualEditor = new Subject<IStandaloneCodeEditor>();
    this.onAddedTab = new Subject<Tab>();
    this.onClosedTab = new Subject<number>();
    this.onOpenVCD = new BehaviorSubject<string>('');
    this.onSimulationFinished = new Subject<void>();
    this.onSynthesisFinished = new Subject<void>();
    this.onSimulationConfigSave = new Subject<void>();
    this.onOpenCode = new Subject<number>();
    this.onRemovedFolder = new Subject<Tab[]>();
    this.decorations = [];
  }

  private _onAddedTab: Subject<Tab>;
  get onAddedTab(): Subject<Tab> {
    return this._onAddedTab;
  }

  set onAddedTab(value: Subject<Tab>) {
    this._onAddedTab = value;
  }

  private _onOpenVCD: BehaviorSubject<string>;
  get onOpenVCD(): BehaviorSubject<string> {
    return this._onOpenVCD;
  }

  set onOpenVCD(value: BehaviorSubject<string>) {
    this._onOpenVCD = value;
  }

  private _onSimulationFinished: Subject<void>;
  get onSimulationFinished(): Subject<void> {
    return this._onSimulationFinished;
  }

  set onSimulationFinished(value: Subject<void>) {
    this._onSimulationFinished = value;
  }

  private _onSynthesisFinished: Subject<void>;
  get onSynthesisFinished(): Subject<void> {
    return this._onSynthesisFinished;
  }

  set onSynthesisFinished(value: Subject<void>) {
    this._onSynthesisFinished = value;
  }

  private _onOpenCode: Subject<number>;

  get onOpenCode(): Subject<number> {
    return this._onOpenCode;
  }

  set onOpenCode(value: Subject<number>) {
    this._onOpenCode = value;
  }

  private _onClosedTab: Subject<number>;

  get onClosedTab(): Subject<number> {
    return this._onClosedTab;
  }

  set onClosedTab(value: Subject<number>) {
    this._onClosedTab = value;
  }

  private _onRemovedFolder: Subject<Tab[]>;

  get onRemovedFolder(): Subject<Tab[]> {
    return this._onRemovedFolder;
  }

  set onRemovedFolder(value: Subject<Tab[]>) {
    this._onRemovedFolder = value;
  }

  private _actualEditor: Subject<IStandaloneCodeEditor>;


  get actualEditor(): Subject<monaco.editor.IStandaloneCodeEditor> {
    return this._actualEditor;
  }

  set actualEditor(value: Subject<monaco.editor.IStandaloneCodeEditor>) {
    this._actualEditor = value;
  }

  get length(): number {
    return this.tabs.length;
  }

  private _tabs: Tab[];

  get tabs(): Tab[] {
    return this._tabs;
  }

  set tabs(value: Tab[]) {
    this._tabs = value;
  }

  private _actualTab: Tab;

  get actualTab(): Tab {
    return this._actualTab;
  }

  set actualTab(value: Tab) {
    this._actualTab = value;
  }

  private static getNumberOfDirectoriesFromPath(path: string): number {
    return path.split('/').length; // root counting too
  }

  private static getNewPath(actualPath: string, oldPath: string, newFolderName: string): string {
    const pathDirectories: string[] = actualPath.split('/');
    const numberOfDirectories: number = EditorTabsService.getNumberOfDirectoriesFromPath(oldPath);
    pathDirectories[numberOfDirectories - 1] = newFolderName;
    return pathDirectories.join('/');
  }

  public addTab(fileCode: FileCode, code?: string): void {
    const newTab: Tab = new Tab(this.tabs.length, fileCode, fileCode.diff);
    if (code) {
      newTab.code = code;
    }
    this._onAddedTab.next(newTab);
  }

  public openVCD(content: string): void {
    this._onOpenVCD.next(content);
  }

  public simulationFinished(): void {
    this._onSimulationFinished.next();
  }

  public synthesisFinished(): void {
    this._onSynthesisFinished.next();
  }

  public removeLastTab(): void {
    this.tabs.pop();
  }

  public getLastTab(): Tab {
    const numberOfTabs: number = this.tabs.length;
    return this._tabs[numberOfTabs - 1];
  }

  public getIndexInArrayById(id: number): number {
    return this.tabs.findIndex(tab => tab.id === id);
  }

  public createFullPath(tab: Tab): string {
    return (tab.path + tab.title).normalize();
  }

  public areSameByPathAndTitle(tab1: Tab, tab2: Tab): boolean {
    return this.createFullPath(tab1) === this.createFullPath(tab2);
  }

  public countOccurrenceOfTab(searchTab: Tab): number {
    return this.tabs.filter(tab => this.areSameByPathAndTitle(tab, searchTab)).length;
  }

  public getTabByFullPath(path: string, title: string): Tab {
    return this.tabs.find(tab => this.createFullPath(tab) === (path + title));
  }

  public getDiffTab() {
    return this.tabs.find(tab => tab.diff);
  }

  public getTabById(id: number): Tab {
    return this.tabs.find(tab => tab.id === id);
  }

  public removeTabById(id: number): void {
    if (id !== -1) {
      const index: number = this.getIndexInArrayById(id);
      this.tabs.splice(index, 1);
    }
  }

  public isCodeOpen(id: number): boolean {
    const tab: Tab = this.getTabById(id);
    if (tab) {
      return this.getTabById(id).isCodeOpen();
    } else {
      return false;
    }

  }

  public closeAllCodes(): void {
    for (const tab of this.tabs) {
      tab.closeCode();
    }
  }

  public closeAllCodesAndOpenCode(id: number): void {
    this.closeAllCodes();
    const tab: Tab = this.getTabById(id);
    tab.openCode();
    this.actualTab = tab;
  }

  public openCode(id: number): void {
    this.onOpenCode.next(id);
  }

  public closeTab(id: number): void {
    this._onClosedTab.next(id);
  }

  public closeAllTabs(): void {
    this._tabs = [];
  }

  public closeAllTabsByPathPrefix(pathPrefix: string): void {
    const tabsInPackage: Tab[] = this.getTabsByPathPrefix(pathPrefix);
    if (!tabsInPackage || tabsInPackage.length === 0) {
      return;
    }
    this.onRemovedFolder.next(tabsInPackage);
  }

  public isTabOpen(tab: Tab): boolean {
    return this.countOccurrenceOfTab(tab) > 1;
  }

  public hasTabTitleDuplication(tab: Tab): boolean {
    for (const searchedTab of this.tabs) {
      if (searchedTab.id !== tab.id) {
        if (searchedTab.title === tab.title) {
          return true;
        }
      }
    }
    return false;
  }

  public changeFolderNameInAllPaths(oldPath: string, newFolderName: string): void {
    this.getTabsByPathPrefix(oldPath).forEach((tab) => {
      tab.path = EditorTabsService.getNewPath(tab.path, oldPath, newFolderName);
      tab.documentId = EditorTabsService.getNewPath(tab.documentId, oldPath, newFolderName);
    });
  }

  public getTabsByPathPrefix(pathPrefix: string): Tab[] {
    const tabsInPackage: Tab[] = [];
    this.tabs.forEach((tab) => {
      if (tab.path.search(pathPrefix) !== -1) {
        tabsInPackage.push(tab);
      }
    });
    return tabsInPackage;
  }

  public getIdOfNewOpenedTab(index: number): number {
    if (index === 0) {
      return this.tabs[1].id;
    }
    return this.tabs[index - 1].id;
  }

  public notifyErrors(tabId: number, errors: number): void {
    this.getTabById(tabId).errors = errors;
  }
}

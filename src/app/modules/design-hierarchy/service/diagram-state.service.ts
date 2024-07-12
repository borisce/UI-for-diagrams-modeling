import { Injectable } from '@angular/core';
import * as joint from 'jointjs';
import { FileTreeNode } from '../../../core/fileSystem/FileTree/filetree.node.interface';

@Injectable({
  providedIn: 'root'
})
export class DiagramStateService {
  private saveTimeout: number;
  private saveHistoryTimeout: number;
  public history: string[] = [];
  public currentHistoryIndex: number = -1;

  public saveRootFileToLocalStorage(rootFile: FileTreeNode): void {
    localStorage.setItem('rootFile', JSON.stringify(rootFile));
  }

  public loadRootFileFromLocalStorage(): FileTreeNode {
    const storedRootFile: string | null = localStorage.getItem('rootFile');
    if (storedRootFile) {
      return JSON.parse(storedRootFile);
    }
    return null;
  }

  public saveCheckboxState(key: string, value: boolean): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public loadCheckboxState(key: string): boolean {
    const value: string = localStorage.getItem(key);
    return value ? JSON.parse(value) : true;
  }

  public saveDiagramWithTimeout(diagramGraph: joint.dia.Graph): void {
    if (this.saveTimeout !== null) {
      clearTimeout(this.saveTimeout);
    }

    // Start a new timer
    this.saveTimeout = window.setTimeout(() => {
      this.saveDiagramToLocalStorage(diagramGraph);
      this.saveTimeout = null;
    }, 2000); // Adjust the delay as needed
  }

  public saveRepoUuidToLocalStorage(uuid: string): void {
    localStorage.setItem('repoUuid', uuid);
  }

  public saveDiagramToLocalStorage(diagramGraph: joint.dia.Graph): void {
    console.log('diagram saved to ls');
    const diagramState: any = diagramGraph.toJSON();
    localStorage.setItem('diagramState', JSON.stringify(diagramState));
  }

  public loadDiagramFromLocalStorage(diagramGraph: joint.dia.Graph, currentRepoUuid: string): void {
    const storedRepoUuid: string = localStorage.getItem('repoUuid');
    if (storedRepoUuid == null || storedRepoUuid !== currentRepoUuid) {
      return;
    }
    const storedDiagramState: string | null = localStorage.getItem('diagramState');
    if (storedDiagramState) {
      const parsedData: any = JSON.parse(storedDiagramState);
      const cells: any = parsedData.cells;

      cells.forEach((cellData: any) => {
        if (cellData.type === 'standard.Rectangle') {
          const moduleElement: joint.shapes.standard.Rectangle
            = new joint.shapes.standard.Rectangle({
            id: cellData.id,
            position: cellData.position,
            size: cellData.size,
            attrs: cellData.attrs
          });
          diagramGraph.addCell(moduleElement);
        } else if (cellData.type === 'standard.Link') {
          const link: joint.shapes.standard.Link = new joint.shapes.standard.Link({
            connector: { name: 'normal' },
            connectionPoint: { name: 'rectangle', args: { sticky: true } },
            id: cellData.id,
            source: cellData.source,
            target: cellData.target,
            attrs: cellData.attrs,
            labels: cellData.labels,
            customData: cellData.customData
          });
          diagramGraph.addCell(link);
        }
      });
    }
    this.addToHistory(diagramGraph);
  }

  public addToHistoryWithTimeout(diagramGraph: joint.dia.Graph): void {
    if (this.saveHistoryTimeout !== null) {
      clearTimeout(this.saveHistoryTimeout);
    }

    // Start a new timer
    this.saveHistoryTimeout = window.setTimeout(() => {
      this.addToHistory(diagramGraph);
      this.saveTimeout = null;
    }, 3000);
  }

  public addToHistory(diagramGraph: joint.dia.Graph): void {
    const diagramState: string = JSON.stringify(diagramGraph.toJSON());

    // If we're in the middle of the history, remove all future states
    if (this.currentHistoryIndex < this.history.length - 1) {
      this.history.splice(this.currentHistoryIndex + 1);
    }

    // Add new state and update index
    this.history.push(diagramState);
    this.currentHistoryIndex = this.history.length - 1; // Update to the latest index

    // Keep only the last 5 states
    if (this.history.length > 5) {
      this.history.shift();
      this.currentHistoryIndex--;
    }
  }

  public undo(diagramGraph: joint.dia.Graph): void {
    if (this.currentHistoryIndex >= 0) {
      if (this.currentHistoryIndex !== 0) {
        this.currentHistoryIndex--;
      }
      this.loadState(diagramGraph, this.history[this.currentHistoryIndex]);
    }
  }

  public redo(diagramGraph: joint.dia.Graph): void {
    if (this.currentHistoryIndex < this.history.length - 1) {
      this.currentHistoryIndex++;
      this.loadState(diagramGraph, this.history[this.currentHistoryIndex]);
    }
  }

  private loadState(diagramGraph: joint.dia.Graph, state: string): void {
    diagramGraph.clear();
    const parsedData: any = JSON.parse(state);
    const cells: any = parsedData.cells;

    cells.forEach((cellData: any) => {
      if (cellData.type === 'standard.Rectangle') {
        const moduleElement: joint.shapes.standard.Rectangle
          = new joint.shapes.standard.Rectangle({
          id: cellData.id,
          position: cellData.position,
          size: cellData.size,
          attrs: cellData.attrs
        });
        diagramGraph.addCell(moduleElement);
      } else if (cellData.type === 'standard.Link') {
        const link: joint.shapes.standard.Link = new joint.shapes.standard.Link({
          connector: { name: 'normal' },
          connectionPoint: { name: 'rectangle', args: { sticky: true } },
          id: cellData.id,
          source: cellData.source,
          target: cellData.target,
          attrs: cellData.attrs,
          labels: cellData.labels
        });
        diagramGraph.addCell(link);
      }
    });
  }

}

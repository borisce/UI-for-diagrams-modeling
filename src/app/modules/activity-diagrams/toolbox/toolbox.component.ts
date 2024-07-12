import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActionShortcut, CaseShortcut, ClearShortcut, EndShortcut, FormatShortcut, IfShortcut, InputsShortcut, LoadShortcut, LoopShortcut, MergeShortcut, OutputsShortcut, ParametersShortcut, SaveShortcut, SignalsShortcut, StartShortcut, ZoomInShortcut, ZoomOutShortcut } from '../types/keyboard-shortcuts';
import { KeyBoardShortcutService } from '../keyboard-shortcut.service';
import { DiagramElements } from '../types/diagram-elements.type';
import { ActiveTable } from '../types/data-source.type';

@Component({
  selector: 'activity-diagrams-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {

  @Input() drawingMode: boolean;
  @Input() isDialogOpen: boolean;
  @Input() isTableOrElementActive: boolean;

  @Output() addElement = new EventEmitter<DiagramElements>();
  @Output() openTable = new EventEmitter<ActiveTable["name"]>();
  @Output() zoomIn = new EventEmitter();
  @Output() zoomOut = new EventEmitter();
  @Output() clear = new EventEmitter();
  @Output() format = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() load = new EventEmitter();
  @Output() changeMode = new EventEmitter();
  @Output() generateCode = new EventEmitter();
  @Output() generateDiagram = new EventEmitter();
  @Output() exportImage = new EventEmitter();


  constructor(public keyboardShortcutService: KeyBoardShortcutService) { }

  ngOnInit(): void {
  }

  @HostListener('window:keydown', ['$event'])
  public onKeyPress(event: KeyboardEvent) {
    // Prevents keyboard shortcuts from being triggered when a dialog is open
    if (this.isDialogOpen || this.isTableOrElementActive) return;

    if (this.keyboardShortcutService.matchShortcut(event, ActionShortcut)) {
      event.preventDefault();
      this.addElement.emit('action');
    } else if (this.keyboardShortcutService.matchShortcut(event, StartShortcut)) {
      event.preventDefault();
      this.addElement.emit('start');
    } else if (this.keyboardShortcutService.matchShortcut(event, EndShortcut)) {
      event.preventDefault();
      this.addElement.emit('end');
    } else if (this.keyboardShortcutService.matchShortcut(event, IfShortcut)) {
      event.preventDefault();
      this.addElement.emit('if');
    } else if (this.keyboardShortcutService.matchShortcut(event, CaseShortcut)) {
      event.preventDefault();
      this.addElement.emit('case');
    } else if (this.keyboardShortcutService.matchShortcut(event, MergeShortcut)) {
      event.preventDefault();
      this.addElement.emit('merge');
    } else if (this.keyboardShortcutService.matchShortcut(event, LoopShortcut)) {
      event.preventDefault();
      this.addElement.emit('loop');
    } else if (this.keyboardShortcutService.matchShortcut(event, InputsShortcut)) {
      event.preventDefault();
      this.openTable.emit('inputs');
    } else if (this.keyboardShortcutService.matchShortcut(event, OutputsShortcut)) {
      event.preventDefault();
      this.openTable.emit('outputs');
    } else if (this.keyboardShortcutService.matchShortcut(event, SignalsShortcut)) {
      event.preventDefault();
      this.openTable.emit('signals');
    } else if (this.keyboardShortcutService.matchShortcut(event, ParametersShortcut)) {
      event.preventDefault();
      this.openTable.emit('parameters');
    } else if (this.keyboardShortcutService.matchShortcut(event, ZoomInShortcut)) {
      event.preventDefault();
      this.zoomIn.emit();
    } else if (this.keyboardShortcutService.matchShortcut(event, ZoomOutShortcut)) {
      event.preventDefault();
      this.zoomOut.emit();
    } else if (this.keyboardShortcutService.matchShortcut(event, ClearShortcut)) {
      event.preventDefault();
      this.clear.emit();
    } else if (this.keyboardShortcutService.matchShortcut(event, FormatShortcut)) {
      event.preventDefault();
      this.format.emit();
    } else if (this.keyboardShortcutService.matchShortcut(event, SaveShortcut)) {
      event.preventDefault();
      this.save.emit();
    } else if (this.keyboardShortcutService.matchShortcut(event, LoadShortcut)) {
      event.preventDefault();
      this.load.emit();
    }
  }

}

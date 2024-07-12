import * as joint from 'jointjs';
import {Injectable} from '@angular/core';
import {EmptyCell} from './EmptyCell';

@Injectable()
export class CollabEmptyCell {
  public insertCollabEmptyCell(emptyCell: EmptyCell): joint.shapes.standard.TextBlock {
    const newEmptyCell: joint.shapes.standard.TextBlock = new joint.shapes.standard.TextBlock({
      machineType: emptyCell.machineType,
      drawingMode: emptyCell.drawingMode,
      codeToBeGenerated: emptyCell.codeToBeGenerated,
      inputs: emptyCell.inputs,
      outputs: emptyCell.outputs,
      signals: emptyCell.signals,
      parameters: emptyCell.parameters,
      id: emptyCell.id
    });
    newEmptyCell.position(0, 0);
    newEmptyCell.resize(0, 0);
    return newEmptyCell;
  }
}

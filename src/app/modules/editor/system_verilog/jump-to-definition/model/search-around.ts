import { Range } from './range';
import { CursorPosition } from './cursor-position';
import ITextModel = monaco.editor.ITextModel;

export interface SearchAround {
  searchRange: Range;
  numberOfWords: number[];
  model: ITextModel;
  cursorPosition: CursorPosition[];
  lastCursorPosition: CursorPosition[];
  actualWord: string[];
  isScope: boolean;
  isComment: boolean;
  comment: string;
}

export interface KeyBoardShortcut {
    key: string;
    keyCode?: number
    shiftKey: boolean;
    // Ctrl/Command based on OS
    modKey: boolean;
    description?: string;
}

export type ActivityDiagramKeyboardShortcuts =
    'action' | 'start' | 'end' | 'if' | 'case' | 'merge' | 'loop' | 'inputs' |
    'outputs' | 'signals' | 'parameters' | 'zoomIn' | 'zoomOut' | 'clearPaper' | 'format' |
    'save' | 'load';

export const ActionShortcut: KeyBoardShortcut = {
    key: 'A',
    shiftKey: true,
    modKey: false,
    description: 'Action'
}

export const StartShortcut: KeyBoardShortcut = {
    key: 'S',
    shiftKey: true,
    modKey: false,
    description: 'Start'
}

export const EndShortcut: KeyBoardShortcut = {
    key: 'E',
    shiftKey: true,
    modKey: false,
    description: 'End'
}

export const IfShortcut: KeyBoardShortcut = {
    key: 'I',
    shiftKey: true,
    modKey: false,
    description: 'If'
}

export const CaseShortcut: KeyBoardShortcut = {
    key: 'C',
    shiftKey: true,
    modKey: false,
    description: 'Case'
}

export const MergeShortcut: KeyBoardShortcut = {
    key: 'M',
    shiftKey: true,
    modKey: false,
    description: 'Merge'
}

export const LoopShortcut: KeyBoardShortcut = {
    key: 'L',
    shiftKey: true,
    modKey: false,
    description: 'Loop'
}

// When using combination of shift and mod the key no longer is upper case
export const InputsShortcut: KeyBoardShortcut = {
    key: 'i',
    shiftKey: true,
    modKey: true,
    description: 'Inputs'
}

export const OutputsShortcut: KeyBoardShortcut = {
    key: 'o',
    shiftKey: true,
    modKey: true,
    description: 'Outputs'
}

export const SignalsShortcut: KeyBoardShortcut = {
    key: 's',
    shiftKey: true,
    modKey: true,
    description: 'Internal signals'
}

export const ParametersShortcut: KeyBoardShortcut = {
    key: 'p',
    shiftKey: true,
    modKey: true,
    description: 'Parameters'
}

export const ZoomInShortcut: KeyBoardShortcut = {
    key: '+',
    keyCode: 187,
    shiftKey: false,
    modKey: true,
    description: 'Zoom In'
}

export const ZoomOutShortcut: KeyBoardShortcut = {
    key: '-',
    keyCode: 189,
    shiftKey: false,
    modKey: true,
    description: 'Zoom Out'
}

export const ClearShortcut: KeyBoardShortcut = {
    key: 'Backspace',
    shiftKey: false,
    modKey: true,
    description: 'Clear paper'
}

export const FormatShortcut: KeyBoardShortcut = {
    key: 'f',
    shiftKey: true,
    modKey: true,
    description: 'Format'
}

export const SaveShortcut: KeyBoardShortcut = {
    key: 's',
    shiftKey: false,
    modKey: true,
    description: 'Save'
}

export const LoadShortcut: KeyBoardShortcut = {
    key: 'l',
    shiftKey: false,
    modKey: true,
    description: 'Load'
}

export const DeleteElementShortcut: KeyBoardShortcut = {
    keyCode: 46,
    key: 'Delete',
    shiftKey: false,
    modKey: false,
    description: 'Delete element'
}
import { Injectable } from "@angular/core";
import { ActionShortcut, ActivityDiagramKeyboardShortcuts, CaseShortcut, ClearShortcut, EndShortcut, FormatShortcut, IfShortcut, InputsShortcut, KeyBoardShortcut, LoadShortcut, LoopShortcut, MergeShortcut, OutputsShortcut, ParametersShortcut, SaveShortcut, SignalsShortcut, StartShortcut, ZoomInShortcut, ZoomOutShortcut } from "./types/keyboard-shortcuts";

@Injectable()
export class KeyBoardShortcutService {
    public matchShortcut(event: KeyboardEvent, shortcut: KeyBoardShortcut) {
        // Always prefer keyCode over key, in specific cases key is not enough as it modifies with languages etc.

        // If both shift and mod keys are required
        if (shortcut.shiftKey && shortcut.modKey) {
            if (shortcut.keyCode)
                return event.shiftKey && (event.metaKey || event.ctrlKey) && event.keyCode === shortcut.keyCode;
            else
                return event.shiftKey && (event.metaKey || event.ctrlKey) && event.key === shortcut.key;
        }
        // If only shift key is required
        else if (shortcut.shiftKey) {
            if (shortcut.keyCode)
                return event.shiftKey && event.keyCode === shortcut.keyCode;
            else
                return event.shiftKey && event.key === shortcut.key;
        }
        // If only mod key is required
        else if (shortcut.modKey) {
            if (shortcut.keyCode)
                return (event.metaKey || event.ctrlKey) && event.keyCode === shortcut.keyCode;
            else
                return (event.metaKey || event.ctrlKey) && event.key === shortcut.key;
        }
        // If no shift or mod key is required
        else {
            if (shortcut.keyCode)
                return event.keyCode === shortcut.keyCode;
            else
                return event.key === shortcut.key;
        }
    }

    public getTooltip(name: ActivityDiagramKeyboardShortcuts) {
        switch (name) {
            case 'action':
                return this.formatTooltip(ActionShortcut);
            case 'start':
                return this.formatTooltip(StartShortcut);
            case 'end':
                return this.formatTooltip(EndShortcut);
            case 'if':
                return this.formatTooltip(IfShortcut);
            case 'case':
                return this.formatTooltip(CaseShortcut);
            case 'merge':
                return this.formatTooltip(MergeShortcut);
            case 'loop':
                return this.formatTooltip(LoopShortcut);
            case 'inputs':
                return this.formatTooltip(InputsShortcut);
            case 'outputs':
                return this.formatTooltip(OutputsShortcut);
            case 'signals':
                return this.formatTooltip(SignalsShortcut);
            case 'parameters':
                return this.formatTooltip(ParametersShortcut);
            case 'zoomIn':
                return this.formatTooltip(ZoomInShortcut);
            case 'zoomOut':
                return this.formatTooltip(ZoomOutShortcut);
            case 'clearPaper':
                return this.formatTooltip(ClearShortcut);
            case 'format':
                return this.formatTooltip(FormatShortcut);
            case 'save':
                return this.formatTooltip(SaveShortcut);
            case 'load':
                return this.formatTooltip(LoadShortcut);
            default:
                return '';
        }
    }

    public formatTooltip(shortcut: KeyBoardShortcut) {
        const userAgent = navigator.userAgent;
        const isMac = userAgent.indexOf('Mac') > -1;

        const shiftSymbol = '⇧';
        const modSymbol = isMac ? '⌘' : 'Ctrl';
        const backspaceSymbol = '⌫';

        let shortcutString: string = '';
        const key = shortcut.key === 'Backspace' ? backspaceSymbol : shortcut.key.toUpperCase();

        switch (true) {
            case shortcut.modKey && shortcut.shiftKey:
                shortcutString = `${modSymbol} ${shiftSymbol} ${key}`;
                break;
            case shortcut.modKey:
                shortcutString = `${modSymbol} ${key}`;
                break;
            case shortcut.shiftKey:
                shortcutString = `${shiftSymbol} ${key}`;
                break;
            default:
                shortcutString = key;
                break;
        }

        if (shortcut.description)
            return `${shortcut.description} (${shortcutString})`;
        else
            return shortcutString;
    }
}
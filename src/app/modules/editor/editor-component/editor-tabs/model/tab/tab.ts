import { FileCode } from '../file-code/file-code';

export class Tab {
  constructor(id: number, file: FileCode, diff: boolean = false) {
    this._id = id;
    this._file = file;
    this.errors = null;
    this._diff = diff;
  }

  private _id: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get documentId(): string {
    return this.file.documentId;
  }

  set documentId(value: string) {
    this.file.documentId = value;
  }

  private _file: FileCode;

  get file(): FileCode {
    return this._file;
  }

  set file(value: FileCode) {
    this._file = value;
  }

  get path(): string {
    return this._file.path;
  }

  set path(value: string) {
    this._file.path = value;
  }

  get title(): string {
    return this._file.title;
  }

  set title(value: string) {
    this._file.title = value;
  }

  get code(): string {
    return this._file.code;
  }

  set code(code: string) {
    this._file.code = code;
  }

  public closeCode(): void {
    this._file.open = false;
  }

  public openCode(): void {
    this._file.open = true;
  }

  public isCodeOpen(): boolean {
    return this._file.open;
  }

  private _errors: number;

  get errors(): number {
    return this._errors;
  }

  set errors(value: number) {
    this._errors = value;
  }

  private _diff: boolean;

  get diff(): boolean {
    return this._diff;
  }

  set diff(value: boolean) {
    this._diff = value;
  }
}

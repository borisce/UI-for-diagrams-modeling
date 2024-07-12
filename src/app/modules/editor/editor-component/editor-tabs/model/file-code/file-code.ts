export class FileCode {
  constructor(title: string, path: string, repositoryId: string, diff: boolean = false) {
    this._title = title;
    this._path = path;
    this._open = false;
    this._documentId = repositoryId;
    this._diff = diff;
  }

  private _documentId: string;

  get documentId(): string {
    return this._documentId;
  }

  set documentId(value: string) {
    this._documentId = value;
  }

  private _open: boolean;

  get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    this._open = value;
  }

  private _title: string;

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  private _path: string;

  get path(): string {
    return this._path;
  }

  set path(value: string) {
    this._path = value;
  }

  private _code: string;

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  private _diff: boolean;

  get diff(): boolean {
    return this._diff;
  }

  set diff(value: boolean) {
    this._diff = value;
  }
}

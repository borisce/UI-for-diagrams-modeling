export interface DirectoryFS {
  name: string;
  path: string;
  parent?: DirectoryFS;
}

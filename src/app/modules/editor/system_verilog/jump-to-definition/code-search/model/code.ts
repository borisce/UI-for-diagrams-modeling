import { FileMetaData } from './file-meta-data';

export interface Code {
  fileId: string;
  fileMetaData: FileMetaData;
  code: string;
}

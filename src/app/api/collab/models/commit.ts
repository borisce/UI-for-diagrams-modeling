/* tslint:disable */
import { Branch } from "./branch";

export interface Commit extends Branch {
  /**
   * List of collab document IDs representing files to be commited. If not specified, all files are commited.
   */
  files?: Array<string> | Array<{ id: string; deleted: boolean }>;

  /**
   * Commit message
   */
  message?: string;
}

/**
 * Interface for ZipTask
 */
import {Observable} from 'rxjs';
import {ZipTaskProgress} from './zip-task-progress.interface';

export interface ZipSingleTaskInterface {
  data: {fileName: string, text: string };
}

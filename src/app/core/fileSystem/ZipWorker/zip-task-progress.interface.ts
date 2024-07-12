/**
 * Interface for Zipping progress
 */
export interface ZipTaskProgress {
  active: boolean;
  current?: number;
  total?: number;
}

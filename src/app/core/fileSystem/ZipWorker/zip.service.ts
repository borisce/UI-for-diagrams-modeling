/**
 * Service for Zip-js.
 */
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ZipEntry } from "./zip-entry.interface";
import { ZipTask } from "./zip-task.interface";
import { ZipTaskProgress } from "./zip-task-progress.interface";
import * as JSZip from "jszip";
import { ZipSingleTaskInterface } from "./zip-single-task.interface";
import { RepositoryService } from "../../service/repository.service";
import { first } from "rxjs/operators";
declare const zip: any;

@Injectable()
export class ZipService {
  constructor(public repositoryService: RepositoryService) {
    zip.workerScriptsPath = "scripts/";
  }

  /**
   * Get All entries from zip file as array of ZipEntries
   * @param file - Zip file we wish to unzip
   * function returns Observable of Array<ZipEntry>
   */
  public getEntries(file: any): Observable<Array<ZipEntry>> {
    return new Observable((subscriber) => {
      const reader: any = new zip.BlobReader(file);
      zip.createReader(
        reader,
        (zipReader) => {
          zipReader.getEntries((entries) => {
            subscriber.next(entries);
            subscriber.complete();
          });
        },
        (message) => {
          subscriber.error({ message });
        }
      );
    });
  }

  /**
   * Zip entries using JSZip and uploading them to server.
   * @param filesToZip
   */
  public async zipEntries(
    filesToZip: Array<ZipSingleTaskInterface>
  ): Promise<any> {
    const zipper = new JSZip();

    for (const zipEntry of filesToZip) {
      const zipPath: string = zipEntry.data.fileName;
      //const zipName: string = zipPath.substring(2, zipPath.length);
      const zipName: string = zipPath;
      const zipText: string = zipEntry.data.text;

      if (zipText === null) {
        zipper.folder(zipName);
      } else {
        zipper.file(zipName, zipText, { binary: true, compression: "STORE" });
      }
    }

    // Generating zip file.
    const content = await zipper.generateAsync({
      type: "blob",
      compression: "STORE",
      compressionOptions: { level: 9 },
    });

    const formData: any = new FormData();
    formData.append("file", content);
    await this.repositoryService
      .updateFiles(this.repositoryService.currentRepoUuid, formData)
      .pipe(first())
      .toPromise();

    return true;
  }

  /**
   * Get file values and file directories from ZipEntry
   * @param entry is ZipEntry of concrete file from zip file
   * Returns Progress and Observable of string and Blob.
   */
  public getData(entry: ZipEntry): ZipTask {
    const fileName: any = entry.filename;
    const progress: any = new Subject<ZipTaskProgress>();
    const data: any = new Observable<{ fileName: string; blob: Blob }>(
      (subscriber) => {
        const writer: any = new zip.BlobWriter();

        // Using `as any` because we don't want to expose this
        // method in the interface
        (entry as any).getData(
          writer,
          (blob) => {
            // subscriber.next(fileName);
            subscriber.next({ fileName, blob });
            subscriber.complete();
            progress.next(null);
          },
          (current, total) => {
            progress.next({ active: true, current, total });
          }
        );
      }
    );
    return { progress, data };
  }

  /**
   * Unziping using ZipJS
   * @param event
   */
  public async unzipZipJS(event: any): Promise<any> {
    const zipper: any = new JSZip();
    return await zipper.loadAsync(event).then(async (x) => {});
  }
}

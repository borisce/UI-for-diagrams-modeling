import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface FileSystemFileHandle {
  createWritable: () => Promise<FileSystemWritableFileStream>;
}

interface FileSystemWritableFileStream {
  write: (data: Blob) => Promise<void>;
  close: () => Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private snackBar: MatSnackBar) {}

  public saveSvg(svgElement: SVGElement): void {
    if (!svgElement) {
      console.error('SVG element not found');
      return;
    }

    const serializer: XMLSerializer = new XMLSerializer();
    const svgString: string = serializer.serializeToString(svgElement);
    const svgBlob: Blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });

    try {
      const url: string = window.URL.createObjectURL(svgBlob);
      this.triggerDownload(url).then(() => {
        window.URL.revokeObjectURL(url); // Revoke the URL after the download
      }).catch(err => {
        console.error('Error in saving SVG:', err);
      });
    } catch (err) {
      console.error('Error creating Blob URL:', err);
    }
  }

  private async triggerDownload(url: string): Promise<void> {
    try {
      // @ts-ignore
      const handle: FileSystemFileHandle = await window.showSaveFilePicker({
        suggestedName: 'downloadedImage.svg',
        types: [{
          description: 'SVG Image Files',
          accept: {'image/svg+xml': ['.svg']}
        }]
      });

      const writableStream: FileSystemWritableFileStream = await handle.createWritable();
      const response: Response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const blob: Blob = await response.blob();

      if (blob.type !== 'image/svg+xml') {
        throw new Error('The fetched file is not an SVG image.');
      }

      await writableStream.write(blob);
      await writableStream.close();
      this.showSnackbar('Diagram has been successfully saved!', 'snackbar-success');
    } catch (err) {
      if (err.name !== 'AbortError') {
        this.showSnackbar('Download failed!', 'snackbar-error');
      }
    }
  }

  private showSnackbar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: [panelClass, 'snackbar-custom']
    });
  }
}

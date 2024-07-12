import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollabService, getFileNameFromDocID } from '../../../../core/service/collab.service';
import { RepositoryService } from '../../../../core/service/repository.service';

// This type of import from /src for some reason interferes with jest tests and they crash
//import { RepositoryService } from 'src/app/core/service/repository.service';
// import { CollabService, getFileNameFromDocID } from 'src/app/core/service/collab.service';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.css']
})
export class FilePickerComponent implements OnInit {

  public selectedFile: string | null = null;
  public files: Array<{ id: string, name: string }> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { fileExtensions: Array<string>, title?: string, text?: string }, public collabService: CollabService, public repoService: RepositoryService) { }

  ngOnInit(): void {
    if (!this.data.fileExtensions) this.data.fileExtensions = [];

    this.getFiles();
  }

  public async getFiles() {
    this.data.fileExtensions.forEach(async extension => {
      (await this.collabService.getContentsOfFilesBySuffix(extension, this.repoService.currentRepo.uuid)).map(fileId => {
        this.files.push({ id: fileId, name: getFileNameFromDocID(fileId) });
      });
    });
  }

}

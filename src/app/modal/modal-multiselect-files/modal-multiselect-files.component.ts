import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FileTreeNode} from 'src/app/core/fileSystem/FileTree/filetree.node.interface';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {SelectionModel} from "@angular/cdk/collections";


@Component({
  selector: 'app-modal-multiselect-files',
  templateUrl: './modal-multiselect-files.component.html',
  styleUrls: ['./modal-multiselect-files.component.scss']
})
export class ModalMultiselectFilesComponent implements OnInit, AfterViewInit {

  public static selectedFile = null;
  public treeControl = new NestedTreeControl<FileTreeNode>(node => node.subChild);
  public dataSource = new MatTreeNestedDataSource<FileTreeNode>();
  public checklistSelection = new SelectionModel<FileTreeNode>(true);
  private files: FileTreeNode[];
  private selected: string[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { files: FileTreeNode[], selected: string[] },
    private dialogRef: MatDialogRef<ModalMultiselectFilesComponent>
  ) {
    this.files = data.files;
    this.selected = data.selected;
    this.toggleSelected(this.files[0]);
  }

  get getSelectFileButtonDisabled() {
    return this.checklistSelection.isEmpty();
  }

  public getFilePath(node: FileTreeNode) {
    let fileId: string = node.id;
    if (fileId.search(/^top-level/i) !== -1) {
      fileId = fileId.replace('top-level/', '');
      var filePathArray = fileId.split("/");
      filePathArray[filePathArray.length - 1] = filePathArray[filePathArray.length - 1].split('?')[0];
      var filePath = filePathArray.join("/");
      return filePath;
    } else {
      var filePathArray = fileId.split("/");
      filePathArray.shift();
      filePathArray[filePathArray.length - 1] = filePathArray[filePathArray.length - 1].split('?')[0];
      var filePath = filePathArray.join("/");
      return filePath;
    }
  }

  ngAfterViewInit() {
    this.treeControl.expand(this.files[0]); // Expand the first node
  }

  hasChild = (_: number, node: FileTreeNode) => !!node.subChild && node.subChild.length > 0;

  public ngOnInit(): void {
    this.dataSource.data = this.files;
  }

  public toggleNodeSelection(node: FileTreeNode): void {
    this.checklistSelection.toggle(node);
  }

  public submit() {
    this.dialogRef.close(
      {
        files: this.checklistSelection.selected.map((n: FileTreeNode) => this.getFilePath(n))
      }
    );
  }

  private toggleSelected(file: FileTreeNode): void {
    for (const sel of this.selected) {
      if (file.id.endsWith(sel + "?master")) {
        this.checklistSelection.toggle(file);
        break;
      }
    }
    for (const fileElement of file.subChild) {
      this.toggleSelected(fileElement);
    }
  }
}

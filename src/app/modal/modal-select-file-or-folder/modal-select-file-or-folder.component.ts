import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileTreeNode } from '../../core/fileSystem/FileTree/filetree.node.interface';
import { NodeClickEventArgs, TreeView } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-modal-select-file-or-folder',
  templateUrl: './modal-select-file-or-folder.component.html',
  styleUrls: ['./modal-select-file-or-folder.component.scss']
})
export class ModalSelectFileOrFolderComponent implements OnInit {
  public static selectedData: FileTreeNode = null;
  public static selectDataButtonDisabled: boolean = true;
  private static treeObj: TreeView;
  private activeNode: FileTreeNode;

  constructor(
    @Inject(MAT_DIALOG_DATA) public files: FileTreeNode[],
    private dialogRef: MatDialogRef<ModalSelectFileOrFolderComponent>
  ) { }

  get getSelectedData(): FileTreeNode {
    return ModalSelectFileOrFolderComponent.selectedData;
  }

  get getSelectDataButtonDisabled(): boolean {
    return ModalSelectFileOrFolderComponent.selectDataButtonDisabled;
  }

  get getSelectedDataName(): string {
    if (ModalSelectFileOrFolderComponent.selectedData == null) {
      return '';
    } else {
      let fileId: string = ModalSelectFileOrFolderComponent.selectedData?.id;
      let filePathArray: string[] = null;
      if (fileId.search(/^top-level/i) !== -1) {
        fileId = fileId.replace('top-level/', '');
        filePathArray = fileId.split('/');
      } else {
        filePathArray = fileId.split('/');
        filePathArray.shift();
      }
      if (filePathArray.length > 1) {
        // tslint:disable-next-line:max-line-length
        filePathArray[filePathArray.length - 1] = filePathArray[filePathArray.length - 1].split('?')[0];
        return filePathArray.join('/');
      } else {
        return filePathArray[0];
      }
    }
  }

  public ngOnInit(): void {
    const field: object = {
      dataSource: this.files,
      id: 'id',
      text: 'displayName',
      child: 'subChild',
      expanded: 'expanded',
      iconCss: 'icon',
    };
    ModalSelectFileOrFolderComponent.treeObj = new TreeView({
      fields: field,
      showCheckBox: true,
      nodeClicked: this.nodeClicked
    });
    ModalSelectFileOrFolderComponent.treeObj.appendTo('#dialog-tree');
  }

  public nodeClicked(arg: NodeClickEventArgs): void {
    this.activeNode = ModalSelectFileOrFolderComponent.treeObj.getTreeData(arg.node)[0] as any;
    if (arg.event.button === 0) {
      // @ts-ignore
      if (arg.event.target.classList.contains('e-fullrow')) {
        if (this.activeNode.isFile) {
          ModalSelectFileOrFolderComponent.selectedData = this.activeNode;
          ModalSelectFileOrFolderComponent.selectDataButtonDisabled = false;
        } else {
          ModalSelectFileOrFolderComponent.selectedData = null;
          ModalSelectFileOrFolderComponent.selectDataButtonDisabled = true;
        }
      }
    }
  }

  public submit(): void {
    this.dialogRef.close(
      {
        dataName: this.getSelectedDataName,
        data: this.getSelectedData
      }
    );
  }

}

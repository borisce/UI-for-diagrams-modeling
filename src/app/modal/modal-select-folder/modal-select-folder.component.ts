import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NodeClickEventArgs, TreeView } from '@syncfusion/ej2-angular-navigations';
import { FileTreeNode } from 'src/app/core/fileSystem/FileTree/filetree.node.interface';

@Component({
  selector: 'app-modal-select-folder',
  templateUrl: './modal-select-folder.component.html',
  styleUrls: ['./modal-select-folder.component.scss']
})
export class ModalSelectFolderComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public files: FileTreeNode[], private dialogRef: MatDialogRef<ModalSelectFolderComponent>) { }

  private static treeObj: TreeView;
  private activeNode;

  public static selectedFolder;
  public static selectFolderButtonDisabled: boolean = true;

  get getSelectedFolder() {
    return ModalSelectFolderComponent.selectedFolder;
  }

  get getSelectedFolderName() {
    if (ModalSelectFolderComponent.selectedFolder == null) {
      return '';
    } else {
      var fileId: string = ModalSelectFolderComponent.selectedFolder?.id;
      if (fileId.search(/^top-level/i) != -1) {
        fileId = fileId.replace(/^top-level\//, '');
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
  }

  get getSelectFolderButtonDisabled() {
    return ModalSelectFolderComponent.selectFolderButtonDisabled;
  }

  set setSelectFolderButtonDisabled(disabled: boolean) {
    ModalSelectFolderComponent.selectFolderButtonDisabled = disabled;
  }

  ngOnInit(): void {
    const field = {
      dataSource: this.files,
      id: 'id',
      text: 'displayName',
      child: 'subChild',
      expanded: 'expanded',
      iconCss: 'icon',
    };
    ModalSelectFolderComponent.treeObj = new TreeView({
      fields: field,
      showCheckBox: true,
      nodeClicked: this.nodeClicked
    });
    ModalSelectFolderComponent.treeObj.appendTo('#dialog-tree');
  }

  public nodeClicked(arg: NodeClickEventArgs) {
    ModalSelectFolderComponent.selectFolderButtonDisabled = true;
    this.activeNode = ModalSelectFolderComponent.treeObj.getTreeData(arg.node)[0] as any;
    if (arg.event.button === 0) {
      // @ts-ignore
      if (arg.event.target.classList.contains('e-fullrow')) {
        if (!this.activeNode.isFile) {
          ModalSelectFolderComponent.selectedFolder = this.activeNode;
          ModalSelectFolderComponent.selectFolderButtonDisabled = false;
        } else {
          ModalSelectFolderComponent.selectedFolder = null;
          ModalSelectFolderComponent.selectFolderButtonDisabled = true;
        }
      }
    }
  }

  public submit() {
    this.dialogRef.close(
      {
        filename: this.getSelectedFolderName,
        file: this.getSelectedFolder
      }
    );
  }

}

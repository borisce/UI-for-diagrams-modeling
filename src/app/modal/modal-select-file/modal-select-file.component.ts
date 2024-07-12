import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NodeClickEventArgs, TreeView } from '@syncfusion/ej2-navigations';
import { FileTreeNode } from 'src/app/core/fileSystem/FileTree/filetree.node.interface';

@Component({
  selector: 'app-modal-select-file',
  templateUrl: './modal-select-file.component.html',
  styleUrls: ['./modal-select-file.component.scss']
})
export class ModalSelectFileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public files: FileTreeNode[], private dialogRef: MatDialogRef<ModalSelectFileComponent>) { }

  private static treeObj: TreeView;
  private activeNode;

  public static selectedFile = null;
  public static selectFileButtonDisabled: boolean = true;

  get getSelectedFile() {
    return ModalSelectFileComponent.selectedFile;
  }

  get getSelectedFileName() {
    if (ModalSelectFileComponent.selectedFile == null) {
      return '';
    } else {
      var fileId: string = ModalSelectFileComponent.selectedFile?.id;
      if (fileId.search(/^top-level/i) != -1) {
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
  }

  get getSelectFileButtonDisabled() {
    return ModalSelectFileComponent.selectFileButtonDisabled;
  }

  set setSelectFileButtonDisabled(disabled: boolean) {
    ModalSelectFileComponent.selectFileButtonDisabled = disabled;
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
    ModalSelectFileComponent.treeObj = new TreeView({
      fields: field,
      showCheckBox: true,
      nodeClicked: this.nodeClicked
    });
    ModalSelectFileComponent.treeObj.appendTo('#dialog-tree');
  }

  public nodeClicked(arg: NodeClickEventArgs) {
    ModalSelectFileComponent.selectFileButtonDisabled = true;
    this.activeNode = ModalSelectFileComponent.treeObj.getTreeData(arg.node)[0] as any;
    if (arg.event.button === 0) {
      // @ts-ignore
      if (arg.event.target.classList.contains('e-fullrow')) {
        if (this.activeNode.isFile) {
          ModalSelectFileComponent.selectedFile = this.activeNode;
          ModalSelectFileComponent.selectFileButtonDisabled = false;
        } else {
          ModalSelectFileComponent.selectedFile = null;
          ModalSelectFileComponent.selectFileButtonDisabled = true;
        }
      }
    }
  }

  public submit() {
    this.dialogRef.close(
      {
        filename: this.getSelectedFileName,
        file: this.getSelectedFile
      }
    );
  }
}

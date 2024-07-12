import { Injectable } from '@angular/core';
import { CollabService, getFileNameFromDocID } from '../../../core/service/collab.service';
import { RepositoryService } from '../../../core/service/repository.service';
import { FileReference } from '../model/file-reference';
import { FileTreeNode } from '../../../core/fileSystem/FileTree/filetree.node.interface';
import { TreeView } from '@syncfusion/ej2-angular-navigations';
import { RepoFileReference } from '../../state-machines/other-classes/repoFileReference';
import { ModalAlertComponent } from '../../../modal/modal-alert/modal-alert.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class FileService {
  private repo: any;
  private treeObj: TreeView = null;
  public repoName: string = this.repoService.currentRepoName;

  constructor(
    private repoService: RepositoryService,
    private collabService: CollabService,
    private dialog: MatDialog
  ) {}

  public async getAllSourceCodeFiles(): Promise<FileReference[]> {
    const sourceCodeFiles: FileReference[] = await this.getFilesBySuffix('.v');
    const systemVerilogFiles: FileReference[] =
      await this.getFilesBySuffix('.sv');
    for (const file of systemVerilogFiles) {
      sourceCodeFiles.push(file);
    }
    const vhdlFiles: FileReference[] = await this.getFilesBySuffix('.vhd');
    for (const file of vhdlFiles) {
      sourceCodeFiles.push(file);
    }
    return sourceCodeFiles;
  }

  public async getFilesBySuffix(suffix: string): Promise<FileReference[]> {
    const getFiles: any = async () => {
      this.repo = this.repoService.currentRepo;
      return (await this.collabService.getFilesBySuffix(
        suffix, this.repo.uuid, this.branch)).map(value => {
        return {
          name: value,
          displayName: getFileNameFromDocID(value),
          parentModuleInstance: null,
          length: value.split('/').length
        };
      });
    };
    getFiles();
    if (this.repo) {
      return getFiles();
    }
  }

  public get branch(): string {
    return localStorage.getItem('currentBranch') || 'master';
  }

  public extractFiles(item: FileTreeNode): FileTreeNode[] {
    let files: FileTreeNode[] = [];

    // If the item itself is a file, add it to the files array.
    if (item.isFile) {
      files.push(item);
    }

    // If the item has sub-children, recursively search them for files.
    if (item.subChild && item.subChild.length > 0) {
      item.subChild.forEach(child => {
        files = files.concat(this.extractFiles(child));
      });
    }

    return files;
  }

  public convertToHierarchy(paths: string[]): FileTreeNode[] {
    // Build the node structure
    const rootNode: FileTreeNode = new FileTreeNode(
      'root',
      'root',
      'root',
      [],
      false,
      false
    );
    for (const filePath of paths) {
      if (filePath) {
        this.buildNodeRecursive(rootNode, filePath.split('/'), 0);
      }
    }
    if (paths.length === 0) {
      rootNode.subChild.push(
        new FileTreeNode(
          'top-level',
          'top-level',
          this.repoName,
          [],
          false,
          true
        )
      );
    } else {
      rootNode.subChild[0].displayName = this.repoName;
      rootNode.subChild[0].expanded = true;
    }
    return rootNode.subChild;
  }

  public buildNodeRecursive(
    node: FileTreeNode,
    filePath: string[],
    idx: number
  ): void {
    if (idx < filePath.length) {
      const item: string = filePath[idx];
      const fullName: string = filePath.slice(0, idx + 1).join('/');

      let dir: any = node.subChild.find((child) => child.name === fullName);

      if (!dir) {
        let displayName: string;
        const isFile: boolean = item.includes('?');
        if (isFile) {
          displayName = item.substring(0, item.indexOf('?'));
        } else {
          displayName = item;
        }
        const id: string = filePath.slice(0, idx + 1).join('/');
        let exp: boolean = false;
        if (this.treeObj) {
          exp = this.treeObj.expandedNodes.includes(id);
        }

        node.subChild.push(
          (dir = new FileTreeNode(id, fullName, displayName, [], isFile, exp))
        );
      }

      this.buildNodeRecursive(dir, filePath, idx + 1);
      node.subChild.sort(FileTreeNode.compare);
    }
  }

  public async getFileBody(file: FileTreeNode): Promise<string> {
    try {
      if (file.isFile) {
        return await this.collabService.getDocContents(file.name);
      }
    } catch (e) {
      this.dialog.open(ModalAlertComponent, {
        data: {
          title: 'Diagram couldn\'t be loaded.',
          message: `Diagram could not be loaded, because a file is missing:
            ${getFileNameFromDocID(e)}`
        }
      });
    }
  }
}

import { FileState } from "../../model/github";

export class FileTreeNode {
  public id: string;
  public name: string;
  public displayName: string;
  public subChild: FileTreeNode[];
  public isFile?: boolean;
  public expanded?: boolean;
  public icon: string;
  public nErrors?: number;

  [k: string]: any;

  constructor(id: string, name: string, displayName: string, subChild: FileTreeNode[],
    isFile: boolean, expanded: boolean, nErrors?: number, gitState?: FileState) {
    this.id = id;
    this.name = name;
    this.displayName = displayName;
    this.subChild = subChild;
    this.isFile = isFile;
    this.expanded = expanded;
    this.icon = (isFile ? 'file' : 'dir');
    this.htmlAttributes = {}
    if(isFile)
      this.htmlAttributes['class'] = gitState;
    if(nErrors)
      this.htmlAttributes['data-errors'] = nErrors;
  }

  public static compare(a: FileTreeNode, b: FileTreeNode): number {
    if (!a.isFile && b.isFile) {
      return -1;
    } else if (a.isFile && !b.isFile) {
      return 1;
    } else {
      return a.displayName.localeCompare(b.displayName);
    }
  }
}

export class FiletreeNodeInterface {
  public nodeId: string;
  public nodeText: string;
  public nodePath: string;
  public nodeType?: string;
  public nodeChild: FiletreeNodeInterface[];
  private icon: string;
  public hasAttribute: object;
  private isChecked: boolean;


  constructor(nodeId: string,
    nodeText: string,
    nodePath: string,
    nodeChild: FiletreeNodeInterface[],
    nodeType?: string,
    icon?: string,
    hasAttribute?: object) {
    this.nodeId = nodeId;
    this.nodeText = nodeText;
    this.nodePath = nodePath;
    this.nodeChild = nodeChild;
    this.nodeType = nodeType;
    this.icon = icon;
    this.hasAttribute = hasAttribute;
  }

  /**
   * Adding new child to a tree.
   * @param originalPath - Original path of new child.
   * @param node - Child node.
   * @param fileType - Type of file it can be folder or file. Optional parameter
   * @param hasAttribute - Specific attribute. Optional parameter
   */
  public addNewChild(originalPath: string, node: FiletreeNodeInterface, fileType?: string, hasAttribute?: object) {
    // Setting specific icon using css.
    let icon: string;
    if (fileType === 'dir') {
      icon = undefined;
    } else {
      icon = 'file';
    }
    // If i am adding last node from path.
    if (node.nodePath.indexOf('/') === -1) {
      // @ts-ignore
      this.nodeChild.push(new FiletreeNodeInterface(node.nodeId, node.nodeText, originalPath, node.nodeChild, fileType, icon, node.hasAttribute));
    } else {
      // If the child is part of path.
      for (let i: number = 0; i < this.nodeChild.length; i++) {
        // If part of path to child already exists.
        if (this.nodeChild[i].nodeText === node.nodePath.substring(0, node.nodePath.indexOf('/'))) {
          this.nodeChild[i].addNewChild(originalPath, new FiletreeNodeInterface(node.nodeId, node.nodeText, node.nodePath.substring(node.nodePath.indexOf('/') + 1), [], fileType), fileType, hasAttribute);
          return true;
        }
      }
      // If part of path do not exists and we need to create parent nodes.
      this.nodeChild.push(new FiletreeNodeInterface(node.nodePath.substring(0, node.nodePath.indexOf('/')) + node.nodeId, node.nodePath.substring(0, node.nodePath.indexOf('/')), originalPath.replace(node.nodePath.substring(0, node.nodePath.indexOf('/') + 1), ''), [], 'dir', 'folder', hasAttribute));
      this.addNewChild(originalPath, node, fileType, node.hasAttribute);
      return true;
    }
  }

  /**
   * Checks for duplicity in tree.
   * @param nodePath - Path to node.
   * @param text - Text of node.
   */
  public checkDuplicity(nodePath: string, text: string): boolean {
    if (nodePath.indexOf('/') === -1) {
      for (let i = 0; i < this.nodeChild.length; i++) {
        if (text === this.nodeChild[i].nodeText) {
          return true;
        }
      }
    } else {
      // Goint into sub trees
      for (let z = 0; z < this.nodeChild.length; z++) {
        if (this.nodeChild[z].nodeText === nodePath.substring(0, nodePath.indexOf('/'))) {
          return this.nodeChild[z].checkDuplicity(nodePath.substring(nodePath.indexOf('/') + 1), text);
        }
      }
      return false;
    }
    return false;
  }

  // Finding and renaming node
  public renameNode(nodePath: string, oldText: string, newText: string): boolean {
    if (nodePath.indexOf('/') === -1) {
      for (let i = 0; i < this.nodeChild.length; i++) {
        if (oldText === this.nodeChild[i].nodeText) {
          this.nodeChild[i].nodeText = newText;
        }
      }
    } else {
      for (let z = 0; z < this.nodeChild.length; z++) {
        if (this.nodeChild[z].nodeText === nodePath.substring(0, nodePath.indexOf('/'))) {
          return this.nodeChild[z].renameNode(nodePath.substring(nodePath.indexOf('/') + 1), oldText, newText);
        }
      }
      return false;
    }
    return false;
  }

  // Adding attribute to node
  public addAttribute(nodePath: string, text: string, attribute: object): boolean {
    if (nodePath.indexOf('/') === -1) {
      for (let i = 0; i < this.nodeChild.length; i++) {
        if (text === this.nodeChild[i].nodeText) {
          this.nodeChild[i].hasAttribute = attribute;
        }
      }
    } else {
      for (let z = 0; z < this.nodeChild.length; z++) {
        if (this.nodeChild[z].nodeText === nodePath.substring(0, nodePath.indexOf('/'))) {
          return this.nodeChild[z].addAttribute(nodePath.substring(nodePath.indexOf('/') + 1), text, attribute);
        }
      }
      return false;
    }
    return false;
  }

  // Removed node from tree
  public removeNode(nodePath: string, text: string): any {
    if (nodePath.indexOf('/') === -1) {
      for (let i = 0; i < this.nodeChild.length; i++) {
        if (text === this.nodeChild[i].nodeText) {
          this.nodeChild.splice(i, 1);
        }
      }
    } else {
      for (let z = 0; z < this.nodeChild.length; z++) {
        if (this.nodeChild[z].nodeText === nodePath.substring(0, nodePath.indexOf('/'))) {
          return this.nodeChild[z].removeNode(nodePath.substring(nodePath.indexOf('/') + 1), text);
        }
      }
    }
  }
}


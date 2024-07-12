import { Injectable } from "@angular/core";
import { AuthenticationService, UserService } from "../../service";
import FS from "@isomorphic-git/lightning-fs";
import { FileFS } from "./files.file.interface";
import { DirectoryFS } from "./files.directory.interface";
import { RepositoryService } from "../../service/repository.service";
import {
  add,
  branch,
  checkout,
  clone,
  commit,
  currentBranch,
  deleteBranch,
  fetch,
  init,
  merge,
  pull,
  push,
} from "isomorphic-git";
import http from "isomorphic-git/http/web";

/**
 * Main service for work with files.
 * It's wroking with isomorphic-git and isomorphic-git/lightning-fs.
 * After initialization fs is set to the name of working repository name for file saving
 * to Indexed DP
 */
@Injectable({ providedIn: "root" })
export class FilesService {
  /**
   * Main constructor for file service. constructor creates new FS
   * and PFS with name of current active repository.
   * Either creates new fs or connects to one that already exists.
   * @param authenticationService - Service for getting current user.
   * @param userService - Service for getting user information.
   * @param repositoryService - Service for active repository.
   */
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private repositoryService: RepositoryService
  ) {
    if (this.repositoryService && this.repositoryService.currentRepoUuid)
      this.init();
  }

  public init() {
    try {
      this.fs = new FS(this.repositoryService.currentRepoUuid);
      this.pfs = this.fs.promises;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Getter for all directories in FS.
   */
  get allDirs(): DirectoryFS[] {
    return this._allDirs;
  }

  /**
   * Setter for all directories in FS.
   * @param value - Array of DirectoryFS
   */
  set allDirs(value: DirectoryFS[]) {
    this._allDirs = value;
  }

  /**
   * Getter for all files in  FS.
   */
  get allFiles(): FileFS[] {
    return this._allFiles;
  }

  /**
   * Setter for all files in FS.
   * @param value - Array of FileFS
   */
  set allFiles(value: FileFS[]) {
    this._allFiles = value;
  }

  /**
   * storage - main storage path. Get from name of working repository.
   * fs - Main FileSystem variable. It's used work all actions on Indexed DB.
   * pfs - Main promised file system. Is used to call action with Promise.
   * _allFile - All files in FS.
   * _allDirs - All dirs in FS.
   */
  private readonly storage: string;
  public fs: FS;
  public pfs: any;
  private _allFiles: FileFS[] = [];
  private _allDirs: DirectoryFS[] = [];

  /**
   * Function is used to check correct path to Files in file system. All paths must start with '/'
   * and must contains '/'. Function is used in all other functions to check if path is correct.
   * If not then it is altered and returned.
   * @param path - Path to check.
   */
  private checkCorrectPath(path: string): string {
    if (path.charAt(0) !== "/") {
      return "/" + path;
    } else if (path.charAt(0) === "\\") {
      return path.replace("\\", "/");
    }
    return path;
  }

  /**
   * Functions creates a new directory in FileSystem using lightning file system mkdir function.
   * @param dirName - Full path to new directory. eg. myDirectory/newDirectory
   */
  public async createDir(dirName: string): Promise<any> {
    await this.pfs.mkdir(this.checkCorrectPath(dirName));
  }

  /**
   * Functions creates a new file in FileSystem using lightning file system writeFile function.
   * @param fileName - full path to new file. eg. myDirectory/newFile.sv
   * @param fileValue - Inner value of file. Text.
   */
  public async createFile(fileName: string, fileValue: string): Promise<void> {
    await this.pfs.writeFile(this.checkCorrectPath(fileName), fileValue);
  }

  /**
   * Reads all subfiles/subdirs in directory.
   * @param dirName - Directory of which subfiles we want to get. eg. /myDirectory
   */
  public async readDir(dirName: string): Promise<any> {
    return await this.pfs.readdir(this.checkCorrectPath(dirName));
  }

  /**
   * Get all information about directory. Information contains type of file, size, mode, ino, uid
   * @param path - Directory path.
   */
  public async getStat(path: string): Promise<any> {
    return await this.pfs.stat(path);
  }

  /**
   * Read file and returns text in file. FS files contains array of Uint8 characters,
   * we need to use TextDecoder to get correct text format.
   * @param fileName - Path to file
   */
  public async readFiles(fileName: string): Promise<string> {
    return new TextDecoder("utf-8")
      .decode(await this.pfs.readFile(this.checkCorrectPath(fileName)))
      .toString();
  }

  /**
   * Function is used to reanme already existing directory/ file.
   * @param oldFilePath - Old path + name to file.
   * @param newFilePath - New path + name to file.
   */
  public async rename(oldFilePath: string, newFilePath: string): Promise<any> {
    this.pfs.rename(
      this.checkCorrectPath(oldFilePath),
      this.checkCorrectPath(newFilePath)
    );
  }

  /**
   * Removes directory from FS.
   * @param path - full path to directory
   */
  public async removeDir(path: string): Promise<any> {
    this.pfs.rmdir(this.checkCorrectPath(path));
  }

  /**
   * Removes file from FS.
   * @param path - full path to file.
   */
  public async removeFile(path: string): Promise<any> {
    this.pfs.unlink(this.checkCorrectPath(path));
  }

  /**
   * Function gets all files in FS ale fills allFiles variable of service.
   * @param dirName - Full path of dir of which we want all files.
   */
  public async getAllFiles(dirName: string): Promise<FileFS[]> {
    await this.readDir(dirName).then((allSubFiles) =>
      allSubFiles.forEach(async (subFile) => {
        await this.pfs.stat(dirName + "/" + subFile).then(async (fileInfo) => {
          if (fileInfo.isFile()) {
            const newFS: FileFS = {
              name: subFile,
              parent: dirName,
              path: dirName + "/" + subFile,
              value: await this.readFiles(dirName + "/" + subFile),
            };
            if (!this.checkForFile(newFS.path)) {
              this._allFiles.push(newFS);
            }
          } else {
            this.getAllFiles(dirName + "/" + subFile);
          }
        });
      })
    );
    return this.allFiles;
  }

  /**
   * Function gets all directories from FS and fills allDirs variable of service.
   * @param dirName - Full path of dir fo which we want all subdirs.
   */
  public async getRepository(dirName?: string): Promise<DirectoryFS[]> {
    if (dirName === undefined) {
      dirName = "";
    }
    this.readDir(dirName).then((subDirs) =>
      subDirs.forEach((subDir) => {
        this.pfs.stat(dirName + "/" + subDir).then(async (t) => {
          if (t.isDirectory()) {
            if (!this.checkForDir(dirName + "/" + subDir)) {
              this._allDirs.push({
                name: subDir,
                path: dirName + "/" + subDir,
              });
            }
            this.getRepository(dirName + "/" + subDir);
          }
        });
      })
    );
    return this.allDirs;
  }

  /**
   * Check if file exists in allFiles.
   * @param path - Path of file we want to check.
   */
  public checkForFile(path: string): any {
    for (const oneFile of this.allFiles) {
      if (oneFile.path === path) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if directory exists in allDirs.
   * @param path - Path to directory.
   */
  public checkForDir(path: string): any {
    for (const oneDir of this.allDirs) {
      if (oneDir.path === path) {
        return true;
      }
    }
    return false;
  }

  /**
   * Function uses isomorphic-git library to push directory.
   * @param dir - directory which contains .git directory.
   * @param username - username of author.
   * @param password - password of author.
   */
  public async gitPush(
    dir: string,
    username: string,
    password: string
  ): Promise<any> {
    const pushResult: any = await push({
      fs: this.fs,
      http,
      dir,
      corsProxy: "https://cors.isomorphic-git.org",
      remote: "origin",
      ref: "master",
      force: true,
      onAuth: () => ({ username, password }),
    });
  }

  /**
   * Uses git commit to commit changes to remote repository.
   * @param dir- Directory which contains .git direcotry.
   * @param author - Author of commit. Consist of [name, email]
   * @param message - Message to commit.
   */
  public async gitCommit(
    dir: string,
    author: any,
    message: string
  ): Promise<any> {
    const sha: any = await commit({
      fs: this.fs,
      dir,
      author: {
        name: author,
      },
      message,
    });
  }

  public async gitInit(dir: string): Promise<any> {
    await init({ fs: this.fs, dir });
  }

  /**
   * Add changes do local git repository.
   * @param dir - Directory which contians .git directory.
   * @param filepath - File which we want to add. To add all use '.'
   */
  public async gitAdd(dir: string, filepath: string): Promise<any> {
    await add({
      fs: this.fs,
      dir,
      filepath,
    });
  }

  /**
   * Clone new repository
   * @param dir - where to clone.
   * @param url - What to clone.
   * @param username - UserName id private.
   * @param password - Password if private repo.
   */
  public async gitClone(dir: string, url: string): Promise<any> {
    const token = localStorage.getItem("github_access_token");

    return await clone({
      fs: this.fs,
      http,
      dir,
      corsProxy: "https://cors.isomorphic-git.org",
      url,
      onAuth: () => ({ username: token, password: "x-oauth-basic" }),
      ref: "master",
    });
  }

  /**
   * Git pull. Doest not take care if conflict occures.
   * @param dir - IndexedDB dir
   * @param author - author name
   */
  public async gitPull(dir: string, author: string): Promise<any> {
    return await pull({
      fs: this.fs,
      http,
      dir,
      author: {
        name: author,
      },
      ref: "master",
      singleBranch: true,
    });
  }

  /**
   * Create new branch from master
   * @param dir - indexed db - dir
   * @param ref - new branch name
   */
  public async createBranch(dir: string, ref: string): Promise<any> {
    return await branch({
      fs: this.fs,
      dir,
      ref,
      checkout: true,
    });
  }

  /**
   * Deleting existing branch
   * @param dir - IndexedDB dir
   * @param ref - Branch name
   */
  public async deleteBranch(dir: string, ref: string): Promise<any> {
    return await deleteBranch({
      fs: this.fs,
      dir,
      ref,
    });
  }

  /**
   * Merge current branch into master. Doest not take care if conflict occures.
   * @param dir - IndexDB dir,
   * @param ours - Name of current branch.
   * @param name  - User name.
   */
  public async mergeToMaster(
    dir: string,
    ours: string,
    name: string
  ): Promise<any> {
    return await merge({
      fs: this.fs,
      dir,
      ours,
      author: {
        name,
      },
      theirs: "master",
    });
  }

  /**
   * Checkout to different branch
   * @param dir - IndexedDB dir.
   * @param ref - Name of branch to checkout to.
   */
  public async checkoutBranch(dir: string, ref: string): Promise<any> {
    return await checkout({
      fs: this.fs,
      dir,
      ref,
    });
  }

  /**
   * Get current branch name.
   * @param dir - IndexedDB dir name
   */
  public async currentBranch(dir: string): Promise<any> {
    return await currentBranch({
      fs: this.fs,
      dir,
    });
  }

  /**
   * Git fetch.
   * @param dir - Indexed DB forled
   */
  public async gitFetch(dir: string): Promise<any> {
    return await fetch({
      fs: this.fs,
      http,
      dir,
      corsProxy: "https://cors.isomorphic-git.org",
      ref: "master",
      singleBranch: true,
    });
  }
}

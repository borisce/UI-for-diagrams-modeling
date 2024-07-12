import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Repository } from "src/app/api/models/repository";
import { Page } from "../model/page";
import { RepoModule } from "../model/repo-module";

/**
 * Service for working with repositories.
 */
@Injectable({ providedIn: "root" })
export class RepositoryService {
  public name: any;
  public uri: any;

  constructor(private http: HttpClient) {
    try {
      this.currentRepo = JSON.parse(
        localStorage.getItem("repository")
      ) as Repository;
    } catch (e) {}
  }

  private _currentRepo: Repository;

  /**
   * Gets current repo
   */
  public get currentRepo() {
    return this._currentRepo;
  }

  /**
   * Sets current repo
   */
  public set currentRepo(repo: Repository) {
    this._currentRepo = repo;
    localStorage.setItem("repository", JSON.stringify(this._currentRepo));
  }

  /**
   * Gets current repo as observable
   */
  public get currentRepoAsObservable() {
    return new BehaviorSubject<any>(this._currentRepo);
  }

  /**
   * Gets current repo name
   */
  public get currentRepoName() {
    return this._currentRepo != null ? this._currentRepo.name : null;
  }

  /**
   * Gets current repo uuid
   */
  public get currentRepoUuid() {
    return this._currentRepo != null ? this._currentRepo.uuid : null;
  }

  /**
   * Sets current active repo uuid
   * @param newName - new repo uuid
   */
  public set currentRepoUuid(uuid: string) {
    this.http
      .get(environment.baseUrl + `/repos/${uuid}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this._currentRepo = data as Repository;
          localStorage.setItem("repository", JSON.stringify(this._currentRepo));
        },
        (error) => {}
      );
  }

  /**
   * Gets current repo uuid as observable
   */
  public get currentRepoUuidAsObservable() {
    return new BehaviorSubject<any>(this._currentRepo.uuid).asObservable();
  }

  /**
   * Clears current repo
   */
  public clearCurrentRepo() {
    this._currentRepo = null;
    localStorage.removeItem("repository");
  }

  /**
   * Gets files to commit from locat storage
   */
  public getFilesToCommit(): any {
    localStorage.getItem("filesToCommit");
  }

  /**
   * Set new file to commit to local storage.
   * @param file file path.
   */
  public setFilesToCommit(file: string): any {
    localStorage.setItem(
      "filesToCommit",
      localStorage.getItem("filesToCommit") + ";" + file
    );
  }

  /**
   * Rename file to commit.
   * @param oldFilePath - old Filepath name
   * @param newFilePath - new file path name
   */
  public renameFileToCommit(oldFilePath: string, newFilePath: string): any {
    localStorage.setItem(
      "filesToCommit",
      localStorage.getItem("filesToCommit").replace(oldFilePath, newFilePath)
    );
  }

  /**
   * Get files to add from local storage
   */
  public getFilesToAdd(): any {
    localStorage.getItem("filesToAdd");
  }

  /**
   * Set file to storage path.
   * @param file - gull path to file
   */
  public setFilesToAdd(file: string): any {
    localStorage.setItem(
      "filesToAdd",
      localStorage.getItem("filesToAdd") + ";" + file
    );
  }

  /**
   * Rename file to add.
   * @param oldFilePath - old file path
   * @param newFilePath - new file path
   */
  public renameFileToAdd(oldFilePath: string, newFilePath: string): any {
    localStorage.setItem(
      "filesToAdd",
      localStorage.getItem("filesToAdd").replace(oldFilePath, newFilePath)
    );
  }

  /**
   * Find if finds out if there is file to add
   * @param path - path to file
   */
  public isToAdd(path: string): boolean {
    if (localStorage.getItem("filesToAdd").split(";").indexOf(path) === -1) {
      return false;
    }
    return true;
  }

  /**
   * Get all existing repositories (info for ADMIN).
   */
  public getAllRepos() {
    return this.http.get(environment.baseUrl + "/repos/all");
  }

  public getAllPublicRepos(page: number, size: number) {
    return this.http.get(
      environment.baseUrl + `/repos/allPublic?page=${page}&size=${size}`
    );
  }

  public getSearchPublicRepos(search: string, page: number, size: number) {
    return this.http.get(
      environment.baseUrl +
        `/repos/search/public/${search}?page=${page}&size=${size}`
    );
  }

  /**
   * Create new repository
   * @param repository
   */
  public createNew(repository: any) {
    return this.http.post(environment.baseUrl + "/repos", repository);
  }

  /**
   * Get current repository
   * @param uuid
   */
  public getRepo(uuid: string) {
    return this.http.get(environment.baseUrl + `/repos/${uuid}`);
  }

  /**
   * get All repos from author
   * @param author
   * @param page
   */
  public getRepos(author: any, page?: number, size?: number) {
    return this.http.get(
      environment.baseUrl + `/repos?page=${page || 0}&size=${size || 10}`
    );
  }

  /**
   * Get all repos associated with a user
   * @param page Number of page
   * @param size Page size
   */
  public getAssociatedRepos(
    page?: number,
    size?: number
  ): Observable<Page<Repository>> {
    return this.http.get<Page<Repository>>(
      environment.baseUrl +
        `/repos/userAssociated?page=${page || 0}&size=${size || 10}`
    );
  }

  /**
   * Update repo name
   * @param uuid
   * @param repo
   */
  public updateRepo(uuid: any, repo: Repository): any {
    return this.http.put(environment.baseUrl + `/repos/${uuid}`, repo);
  }

  /**
   * Favorite repo
   * @param uuid
   */
  public favoriteRepo(uuid: any): any {
    return this.http.put(
      environment.baseUrl + `/repos/${uuid}/toggleFavorite`,
      ""
    );
  }

  /**
   * Archived repo
   * @param uuid
   */
  public archivedRepo(uuid: any): any {
    return this.http.put(
      environment.baseUrl + `/repos/${uuid}/toggleArchived`,
      ""
    );
  }

  /**
   * Delete repo from repositories.
   * @param uuid
   */
  public deleteRepo(uuid: any): any {
    return this.http.delete(environment.baseUrl + `/repos/${uuid}`);
  }

  /**
   * Mark repository
   * @param markedRepo
   */
  public markRepoAdmin(markedRepo: any): any {
    return this.http.post(environment.baseUrl + "/admin", markedRepo);
  }

  /**
   * Get all repo activity
   */
  public getRepoActivityAdmin(): any {
    return this.http.get(environment.baseUrl + "/admin/repos");
  }

  /**
   * Get files of repository. Return zip File.
   * @param name
   */
  public getFiles(uuid: string): Observable<any> {
    // @ts-ignore
    return this.http
      .get<any>(environment.baseUrl + `/repos/${uuid}/files`, {
        // @ts-ignore
        observe: "response",
        // @ts-ignore
        responseType: "blob",
      })
      .pipe(
        map((response: any) => {
          return response.body;
        })
      );
  }

  /**
   * Update files in repo. Sending zip file to repository.
   * @param uuid
   * @param content
   */
  public updateFiles(uuid: string, content: any): any {
    return this.http.put(environment.baseUrl + `/repos/${uuid}/files`, content);
  }

  public updateAuthor(repoUuid: string, newAuthorUuuid: string): any {
    return this.http.put(
      environment.baseUrl +
        `/repos/${repoUuid}/change-author/${newAuthorUuuid}`,
      {}
    );
  }

  /**
   * Get the owner of a repository
   */
  public getOwnerRepo(ownerUsername: string) {
    return this.http.get(
      environment.baseUrl + `/repos/admin/owner/${ownerUsername}`
    );
  }

  public getRepositorySimulationResults(
    repoUuid: string,
    page?: number,
    size?: number
  ) {
    return this.http.get(
      `${environment.baseUrl}/repos/${repoUuid}/simulation-results?page=${
        page || 0
      }&size=${size || 10}`
    );
  }

  public getRepositorySynthesisResults(
    repoUuid: string,
    page?: number,
    size?: number
  ) {
    return this.http.get(
      `${environment.baseUrl}/repos/${repoUuid}/synthesis-results?page=${
        page || 0
      }&size=${size || 10}`
    );
  }

  public getRepositorySimulationFile(
    repoUuid: string,
    simulationUuid: string,
    fileUuid: string
  ) {
    return this.http.get(
      `${environment.baseUrl}/repos/${repoUuid}/simulation-results/${simulationUuid}/${fileUuid}`,
      { responseType: "text" }
    );
  }

  public getRepositorySimulationConfiguration() {
    return this.http.get(
      `${environment.baseUrl}/repos/${this.currentRepoUuid}/simulation-configuration`
    );
  }

  public getRepositorySynthesisFile(
    repoUuid: string,
    synthesisUuid: string,
    fileUuid: string
  ) {
    return this.http.get(
      `${environment.baseUrl}/repos/${repoUuid}/synthesis-results/${synthesisUuid}/${fileUuid}`,
      { responseType: "text" }
    );
  }

  public getRepositorySynthesisZip(repoUuid: string, synthesisUuid: string) {
    return this.http.get(
      `${environment.baseUrl}/repos/${repoUuid}/synthesis-results/zip-download/${synthesisUuid}`,
      { responseType: "arraybuffer" }
    );
  }

  public getRepositoryModules(repoUuid: string): Observable<RepoModule[]> {
    return this.http.get<RepoModule[]>(
      `${environment.baseUrl}/repos/${repoUuid}/modules`
    );
  }

  public deleteRepositorySynthesis(repoUuid: string, synthesisUuid: string) {
    return this.http.delete(
      environment.baseUrl +
        `/repos/${repoUuid}/synthesis-results/${synthesisUuid}`
    );
  }
}
